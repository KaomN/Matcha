export default function RatingSortButton(props) {

	if (props.sort === "ratingDsc") {
		return (
			<button
			className={props.sort === "ratingDsc" ? "home_sort_button home_sort_button_active" : "home_sort_button"}
			value="ratingAsc"
			onClick={(e) => {props.setSort(e.target.value)}}>
			Rating ↓</button>
		);
	} else if (props.sort === "ratingAsc") {
		return (
			<button
			className={props.sort === "ratingAsc" ? "home_sort_button home_sort_button_active" : "home_sort_button"}
			onClick={(e) => {e.target.value === "ratingAsc" ? props.setSort("ratingAsc") : props.setSort("ratingDsc")}}>
			Rating ↑</button>
		);
	} else {
		return (
			<button
			className="home_sort_button"
			value="ratingAsc" onClick={(e) => {props.setSort(e.target.value)}}>
				Rating</button>
		);
	}
}
