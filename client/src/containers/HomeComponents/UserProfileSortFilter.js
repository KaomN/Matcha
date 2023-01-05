import { useCallback } from "react";
import StyledSliderComponent from "./StyledSlider";
import AgeSortButton from "./Buttons/AgeSortButton";
import RatingSortButton from "./Buttons/RatingSortButton";
import DistanceSortButton from "./Buttons/DistanceSortButton";
import InterestSortButton from "./Buttons/InterestSortButton";

export default function UserProfileSortFilter(props) {

	const onAgeFilter = useCallback((value) => {
		props.setFilterAge({min: value[0], max: value[1]});
	}, [props])

	const onRatingFilter = useCallback((value) => {
		props.setFilterRating({min: value[0], max: value[1]});
	}, [props])
	
	const onDistanceFilter = useCallback((value) => {
		props.setFilterDistance({min: value[0], max: value[1]});
	}, [props])

	const onInterestFilter = useCallback((value) => {
		props.setFilterInterest({min: value[0], max: value[1]});
	}, [props])

	return (
		<div className="home_sort_filter_container">
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
				<div className="flex-row filter_slider pos-relative">
					<span className="tag_slider_label unselectable">Tags</span>
					<StyledSliderComponent
					onAfterChange={onInterestFilter}
					min={1}
					max={5}
					defaultValue={[1, 5]}
					/>
				</div>
			</div>
		</div>
	);
}