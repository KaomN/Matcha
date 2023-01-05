export default function DistanceSortButton(props) {

	if (props.sort === "distanceDsc") {
		return (
			<button
			className={props.sort === "distanceDsc" ? "home_sort_button home_sort_button_active" : "home_sort_button"}
			value="distanceAsc"
			onClick={(e) => {props.setSort(e.target.value)}}>
			Distance ↓</button>
		);
	} else if (props.sort === "distanceAsc") {
		return (
			<button
			className={props.sort === "distanceAsc" ? "home_sort_button home_sort_button_active" : "home_sort_button"}
			onClick={(e) => {e.target.value === "distanceAsc" ? props.setSort("distanceAsc") : props.setSort("distanceDsc")}}>
			Distance ↑</button>
		);
	} else {
		return (
			<button
			className="home_sort_button"
			value="distanceAsc" onClick={(e) => {props.setSort(e.target.value)}}>
			Distance</button>
		);
	}
}