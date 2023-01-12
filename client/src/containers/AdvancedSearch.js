import { useState, useEffect, useContext, useCallback } from "react";
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from "react-router-dom";
import SearchFilterSort from "./SearchComponents/SearchFilterSort";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { LoadingSpinnerComponent } from "../components/LoadingSpinnerComponent";
import StyledSliderComponent from "./HomeComponents/StyledSlider";
import Maps from "./SearchComponents/Maps";
import { UserContext } from "../context/UserContext";
import Select from "./SearchComponents/src/index";
import "./styles/Search.css";

export default function AdvancedSearch() {
	const socket = useContext(SocketContext);
	const { user } = useContext(UserContext);
	const [userProfiles, setUserProfiles] = useState([]);
	const [searchAge, setSearchAge] = useState({min: 18, max: 100});
	const [searchRating, setSearchRating] = useState({min: 0, max: 100});
	// const [filterAge, setFilterAge] = useState({min: 0, max: 100});
	// const [filterRating, setFilterRating] = useState({min: 0, max: 100});
	// const [filterDistance, setFilterDistance] = useState({min: 0, max: 50});
	// const [filterInterest, setFilterInterest] = useState({min: 1, max: 5});
	const [filterTagsOptions, setFilterTagsOptions] = useState([])
	const [options, setOptions] = useState([]);
	const [selectedTags, setSelectedTags] = useState([])
	const [isLoading, setIsLoading] = useState(true);
	const [isSearching, setIsSearching] = useState(false);
	const [hasSearched, setHasSearched] = useState(false);
	const [toggleSearch, setToggleSearch] = useState(true);
	const [sort, setSort] = useState("distanceAsc");
	const [location, setLocation] = useState({lat: parseFloat(user.latitude), lng: parseFloat(user.longitude)});
	const navigate = useNavigate();

	useEffect(() => {
		let mounted = true;
		if(mounted) {
			(async function() {
				setIsLoading(true);
				const response = await fetch("/search/tags");
				const data = await response.json();
				if(data.status) {
					setOptions(data.tags);
				}
				setIsLoading(false);
			})();
		}
		return () => {mounted = false};
	}, []);

	const onAgeSearch = useCallback((value) => {
		setSearchAge({min: value[0], max: value[1]});
	}, [])

	const onRatingSearch = useCallback((value) => {
		setSearchRating({min: value[0], max: value[1]});
	}, [])


	if (isLoading) {
		return (
			<LoadingSpinner />
		)
	}

	async function handleSearch() {
		setIsSearching(true);
		const response = await fetch("/search/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				age: searchAge,
				rating: searchRating,
				tags: selectedTags,
				location: location
			})
		});
		const data = await response.json();
		if(data.status) {
			setUserProfiles(data.users);
			setIsSearching(true);
			setHasSearched(true);
			if(selectedTags.length > 0) {
				setFilterTagsOptions(selectedTags)
			} else {
				setFilterTagsOptions(options)
			}
		} else {
			setIsSearching(false);
			setHasSearched(false)
		}
		setIsSearching(false);
	}

	function handleToggleSearch() {
		setToggleSearch(!toggleSearch);
	}

	//console.log(toggleSearch)
	return (
		<main className="ma search_main_container">
			<div className="search_container_middle">
				<div className="search_container ma">
					<div className="toggle_search_container">
						<div className="toggle_search_line"></div>
						<i className="material-icons search_icon" title="Search" onClick={handleToggleSearch}>search</i>
						<div className="toggle_search_line"></div>
					</div>
					<div className={toggleSearch ? "search_item_container" : "search_item_container_hidden"}>
						<div className="flex-col filter_input_container">
							<div className="flex-row filter_slider pos-relative">
								<span className="age_slider_label unselectable">Age</span>
								<StyledSliderComponent
								min={18}
								onAfterChange={onAgeSearch}
								defaultValue={[18, 100]}
								/>
							</div>
							<div className="flex-row filter_slider pos-relative">
								<span className="rating_slider_label unselectable">Rating</span>
								<StyledSliderComponent
								onAfterChange={onRatingSearch}
								defaultValue={[0, 100]}
								/>
							</div>
						</div>
						<Maps
							setLocation={setLocation}
							location={location}
							/>
						<div className="search_select_container">
							<Select
								multi
								options={options}
								onChange={(values) => {
									setSelectedTags(values);
								}}
								max={5}
								className="search_select"
								color="#2f4f4f"
								placeholder="Select tags"
								dropdownHeight="150px"
								separator={true}
								clearable={true}
								dropdownGap={-1}
								dropdownPosition="auto"
							/>
						</div>
						{isSearching && <LoadingSpinnerComponent size={30}/> }
						{!isSearching && <button className="search_button" onClick={handleSearch}>Search</button> }
					</div>
				</div>
			</div>
			<div className="search_result_container">
				{hasSearched && <SearchFilterSort
				setUserProfiles={setUserProfiles}
				profile={userProfiles}
				setSort={setSort}
				sort={sort}
				searchAge={searchAge}
				searchRating={searchRating}
				user={user}
				// setFilterAge={setFilterAge}
				// setFilterRating={setFilterRating}
				// setFilterDistance={setFilterDistance}
				setFilterTagsOptions={setFilterTagsOptions}
				// filterAge={filterAge}
				// filterRating={filterRating}
				// filterDistance={filterDistance}
				filterTagsOptions={options}
				hasSearched={hasSearched}
				/>}
			</div>
		</main>
	);
}