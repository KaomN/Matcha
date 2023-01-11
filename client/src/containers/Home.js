import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";
import { LoadingSpinnerPromiseComponent } from "../components/LoadingSpinnerPromiseComponent";
import { LoadingSpinner } from "../components/LoadingSpinner";
import UseGetUserProfiles from "./HomeComponents/UseGetUserProfiles";
import UserProfile from "./HomeComponents/UserProfile";
import UserProfileSortFilter from "./HomeComponents/UserProfileSortFilter";
import { SocketContext } from "../context/SocketContext";

export default function Home() {
	const { user } = useContext(UserContext);
	const socket = useContext(SocketContext);
	const [profileLimit, setProfileLimit] = useState({min: 0, max: 5});
	const [userProfiles, setUserProfiles] = useState([]);
	const [sort, setSort] = useState("distanceAsc");
	const [filterAge, setFilterAge] = useState({min: 18, max: 100});
	const [filterRating, setFilterRating] = useState({min: 0, max: 100});
	const [filterDistance, setFilterDistance] = useState({min: 0, max: 50});
	const [filterInterest, setFilterInterest] = useState({min: 1, max: 5});
	const [isLoading, setIsLoading] = useState(true);
	const [hasMore, setHasMore] = useState(true);
	const navigate = useNavigate();

	const {
		loading,
		error,
	} = UseGetUserProfiles(profileLimit, setUserProfiles, setHasMore, userProfiles)

	const observer = useRef()
	// use ref to keep track of the bottom of the page
	const lastUserRef = useCallback(node => {
		// if data is still loading, return
		if (loading) return
		// create a new observer that will check if bottom of the page is visible
		observer.current = new IntersectionObserver(entries => {
			// if bottom of the page is visible, and there is more data to load, set the profile limit
			//setTop(entries[0].boundingClientRect.top)
			if (entries[0].isIntersecting && hasMore) {
				setProfileLimit({min: 0, max: profileLimit.max + 5})
				//divRef.current.scrollTo({top: 0, left: 0})
			}
		})
		// if node exists, observe it
		if (node) observer.current.observe(node)
	}, [loading, hasMore, profileLimit])

	// Check if user has completed profile
	useEffect(() => {
		if(!user.profile) {
			// If not, redirect to profile completion page
			navigate("/completeprofile");
		}
	}, [navigate, user]);

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

	useEffect(() => {
		if(!loading) {
			setIsLoading(false);
		}
	}, [loading, setIsLoading]);
	return (
		<>
		{isLoading ?
		<LoadingSpinner/>
		:
		<main className="ma home_profile_container">
			{userProfiles.length === 0 && !loading ?
			<div className="home_no_profile">No matching profiles found</div>
			:
			<>
			{/* <SearchProfile/> */}
			<UserProfileSortFilter
			setUserProfiles={setUserProfiles}
			userProfiles={userProfiles}
			setSort={setSort}
			sort={sort}
			setFilterAge={setFilterAge}
			setFilterRating={setFilterRating}
			setFilterDistance={setFilterDistance}
			setFilterInterest={setFilterInterest}
			/>
			<div className="home_profiles_container">
			{userProfiles.sort(userSort(sort)).filter(filterAgeFunc).filter(filterRatingFunc).filter(filterDistanceFunc).filter(filterInterestFunc).length > 0 ?
				userProfiles.sort(userSort(sort)).filter(filterAgeFunc).filter(filterRatingFunc).filter(filterDistanceFunc).filter(filterInterestFunc).map(profile => {
					return <div key={profile.userid} className="home_user_profile_container">
								<UserProfile
								profile={profile}
								setUserProfiles={setUserProfiles}
								user={user}
								/>
							</div>
				})
			:
			<div> No results from filter</div>
			}
			{loading && <LoadingSpinnerPromiseComponent/>}
			{hasMore ?
			<div className="home_scroll_ref" ref={lastUserRef}></div>
			:
			null
			}
			<div>{error && 'Error'}</div>
			</div>
			</>
			}

		</main>
		}
		</>
	);
}