import { useCallback, useState } from "react";
import StyledSliderComponent from "../HomeComponents/StyledSlider";
import AgeSortButton from "../HomeComponents/Buttons/AgeSortButton";
import RatingSortButton from "../HomeComponents/Buttons/RatingSortButton";
import DistanceSortButton from "../HomeComponents/Buttons/DistanceSortButton";
import InterestSortButton from "../HomeComponents/Buttons/InterestSortButton";
import UserProfile from "./UserProfile";
import Select from "../../components/Select";


export default function SearchFilterSort(props) {
	const [filterAge, setFilterAge] = useState(props.searchAge);
	const [filterRating, setFilterRating] = useState(props.searchRating);
	const [filterDistance, setFilterDistance] = useState({min: 0, max: 50});
	const [filterTags, setFilterTags] = useState([]);
	const [toggleFilter, setToggleFilter] = useState(true);
	const onAgeFilter = useCallback((value) => {
		setFilterAge({min: value[0], max: value[1]});
	}, [])

	const onRatingFilter = useCallback((value) => {
		setFilterRating({min: value[0], max: value[1]});
	}, [])
	
	const onDistanceFilter = useCallback((value) => {
		setFilterDistance({min: value[0], max: value[1]});
	}, [])

	function userSort(sort) {
		if(sort === "ageAsc") {
			return function(a, b) {
				return a.age - b.age;
			}
		} else if(sort === "ageDsc") {
			return function(a, b) {
				return b.age - a.age;
			}
		} else if(sort === "ratingAsc") {
			return function(a, b) {
				return a.rating - b.rating;
			}
		} else if(sort === "ratingDsc") {
			return function(a, b) {
				return b.rating - a.rating;
			}
		} else if(sort === "distanceAsc") {
			return function(a, b) {
				return a.distance - b.distance;
			}
		} else if(sort === "distanceDsc") {
			return function(a, b) {
				return b.distance - a.distance;
			}
		} else if(sort === "interestAsc") {
			return function(a, b) {
				return a.tagsCount - b.tagsCount;
			}
		} else if(sort === "interestDsc") {
			return function(a, b) {
				return b.tagsCount - a.tagsCount;
			}
		}
	}

	function filterAgeFunc(profile) {
		return profile.age >= filterAge.min && profile.age <= filterAge.max;
	}

	function filterRatingFunc(profile) {
		return profile.rating >= filterRating.min && profile.rating <= filterRating.max;
	}

	function filterDistanceFunc(profile) {
		return profile.distance >= filterDistance.min && profile.distance <= filterDistance.max;
	}

	function filterTagsFunc(profile) {
		return filterTags.every((tag) => {
			return profile.interests.includes(tag.label);
		})
	}

	function handleToggleFilter() {
		setToggleFilter(!toggleFilter);
	}

	return (
		<div className="search_sort_filter_container">
			{toggleFilter && <i className="material-icons search_hide_filter" draggable="false" onClick={handleToggleFilter}>expand_more</i>}
			{!toggleFilter && <i className="material-icons search_unhide_filter" draggable="false" onClick={handleToggleFilter}>expand_less</i>}
			{!toggleFilter && <div className="search_filter_toggle_container">
				<div className="filter_line"></div>
				<div className="filter_text">Filter</div>
				<div className="filter_line"></div>
			</div>}
			<div className={toggleFilter ? "search_filter_container" : "search_filter_container_hidden"}>
				<div className="home_sort_button_container">
					<div className="home_sort_button_left_container">
						<div className="home_sort_button_left">
							<AgeSortButton
							setSort={props.setSort}
							sort={props.sort}
							/>
							<RatingSortButton
							setSort={props.setSort}
							sort={props.sort}
							/>
						</div>
					</div>
					<div className="home_sort_button_right_container">
						<div className="home_sort_button_right">
							<DistanceSortButton
							setSort={props.setSort}
							sort={props.sort}
							/>
							<InterestSortButton
							setSort={props.setSort}
							sort={props.sort}
							/>
						</div>
					</div>
				</div>
				<div className="flex-col filter_input_container">
					<div className="flex-row filter_slider pos-relative">
						<span className="age_slider_label unselectable">Age</span>
						<StyledSliderComponent
						min={18}
						onAfterChange={onAgeFilter}
						defaultValue={[18, 100]}
						/>
					</div>
					<div className="flex-row filter_slider pos-relative">
						<span className="rating_slider_label unselectable">Rating</span>
						<StyledSliderComponent
						onAfterChange={onRatingFilter}
						defaultValue={[0, 100]}
						/>
					</div>
					<div className="flex-row filter_slider pos-relative">
						<span className="distance_slider_label unselectable">Distance</span>
						<StyledSliderComponent
						onAfterChange={onDistanceFilter}
						max={50}
						defaultValue={[0, 50]}
						/>
					</div>
					<div className="search_select_container">
							<Select
								multi
								options={props.filterTagsOptions}
								onChange={(values) => {
									setFilterTags(values);
								}}
								max={5}
								className="search_select"
								color="#2f4f4f"
								placeholder="Filter tags"
								dropdownHeight="125px"
								separator={true}
								clearable={true}
								dropdownGap={-1}
							/>
						</div>
				</div>
			</div>
			{!props.hasSearched ? props.profiles.length === 0 ?
			null
			:
			<div className="search_profiles_container">
				<div> No results </div>
			</div>
			:
			<div className="search_profiles_container">
				{props.profile.sort(userSort(props.sort)).filter(filterAgeFunc).filter(filterRatingFunc).filter(filterDistanceFunc).filter(filterTagsFunc).length > 0 ?
					props.profile.sort(userSort(props.sort)).filter(filterAgeFunc).filter(filterRatingFunc).filter(filterDistanceFunc).filter(filterTagsFunc).map(profile => {
					return <div key={profile.userid} className="search_user_profile_container">
								<UserProfile
								profile={profile}
								setProfile={props.setUserProfiles}
								user={props.user}
								/>
							</div>
				})
				:
				<div className="ma">No profiles found</div>
				}
			</div>
			}
		</div>
	);
}