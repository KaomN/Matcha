import { useContext, useEffect, useState, useCallback, useRef } from "react";
import { UserContext } from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import "./styles/Home.css";
import { LoadingSpinner } from "../components/LoadingSpinner";
import UserProfile from "./HomeComponents/UserProfile";
import UserProfileSortFilter from "./HomeComponents/UserProfileSortFilter";

export default function Home() {
	const { user } = useContext(UserContext);
	const [userProfiles, setUserProfiles] = useState([]);
	const [sort, setSort] = useState("distanceAsc");
	const [filterAge, setFilterAge] = useState({min: 18, max: 100});
	const [filterRating, setFilterRating] = useState({min: 0, max: 100});
	const [filterDistance, setFilterDistance] = useState({min: 0, max: 50});
	const [filterInterest, setFilterInterest] = useState({min: 1, max: 5});
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let mounted = true;
		if(mounted) {
			(async () => {
				setIsLoading(true);
				const response = await fetch('http://localhost:3001/home/getusers/', {
					credentials: "include",
					method: "GET",
				});
				const data = await response.json();
				if(data.status) {
					setUserProfiles(data.users);
				} 
				setIsLoading(false);
			})()
		}
		return () => mounted = false;
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
		<>
		{isLoading ?
		<LoadingSpinner/>
		:
		<main className="ma home_profile_container">
			{userProfiles.length === 0 ?
			<div className="home_no_profile">No matching profiles found</div>
			:
			<>
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
				</div>
			</>
			}

		</main>
		}
		</>
	);
}