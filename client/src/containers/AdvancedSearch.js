import { useState, useEffect, useContext, useCallback } from "react";
import { SocketContext } from '../context/SocketContext';
import { useNavigate } from "react-router-dom";
import UserProfileSortFilter from "./HomeComponents/UserProfileSortFilter";
import { LoadingSpinnerComponent } from "../components/LoadingSpinnerComponent";
import AgeSortButton from "./HomeComponents/Buttons/AgeSortButton";
import RatingSortButton from "./HomeComponents/Buttons/RatingSortButton";
import StyledSliderComponent from "./HomeComponents/StyledSlider";
import "./styles/Search.css";


export default function AdvancedSearch() {
	const socket = useContext(SocketContext);
	const [user, setUser] = useState("loading");
	const [userProfiles, setUserProfiles] = useState([]);
	const [filterAge, setFilterAge] = useState({min: 18, max: 100});
	const [filterRating, setFilterRating] = useState({min: 0, max: 100});
	const [filterDistance, setFilterDistance] = useState({min: 0, max: 50});
	const [filterInterest, setFilterInterest] = useState({min: 1, max: 5});
	const [isLoading, setIsLoading] = useState(false);
	const [hasSearched, setHasSearched] = useState(true);
	const [sort, setSort] = useState("distanceAsc");
	const navigate = useNavigate();

	useEffect(() => {
		socket.emit("update_last_active", { queryId: user.userid});
	}, []);

	const onAgeFilter = useCallback((value) => {
		setFilterAge({min: value[0], max: value[1]});
	}, [])

	const onRatingFilter = useCallback((value) => {
		setFilterRating({min: value[0], max: value[1]});
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
				return a.commonInterests - b.commonInterests;
			}
		} else if(sort === "interestDsc") {
			return function(a, b) {
				return b.commonInterests - a.commonInterests;
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

	function filterInterestFunc(profile) {
		return profile.commonInterests >= filterInterest.min && profile.commonInterests <= filterInterest.max;
	}

	return (
		<main className="ma home_profile_container">

			<div className="search_container">
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
				</div>
			</div>

			{hasSearched && <UserProfileSortFilter
				setUserProfiles={setUserProfiles}
				userProfiles={userProfiles}
				setSort={setSort}
				sort={sort}
				setFilterAge={setFilterAge}
				setFilterRating={setFilterRating}
				setFilterDistance={setFilterDistance}
				setFilterInterest={setFilterInterest}
			/>}
			{userProfiles.length === 0 && !isLoading ?
			<div className="home_no_profile">No matching profiles found</div>
			:
			<>
			{/* <SearchProfile/> */}
			
			{/* Sort the userProfiles array by the userSort function */}
			<div className="home_profiles_container">
			{/* {userProfiles.sort(userSort(sort)).filter(filterAgeFunc).filter(filterRatingFunc).filter(filterDistanceFunc).filter(filterInterestFunc).length > 0 ?
				userProfiles.sort(userSort(sort)).filter(filterAgeFunc).filter(filterRatingFunc).filter(filterDistanceFunc).filter(filterInterestFunc).map(profile => {
					return <div key={profile.userid} className="home_user_profile_container">
								<UserProfile
								profile={profile}
								setUserProfiles={setUserProfiles}
								/>
							</div>
				})
			: */}
			<div> No results from filter</div>
			{/* {loading && <LoadingSpinnerPromiseComponent/>} */}
			{/* <div>{error && 'Error'}</div> */}
			</div>
			</>
			}
		</main>
	);
}