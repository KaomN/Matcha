export default function InterestSortButton(props) {

	if (props.sort === "interestDsc") {
		return (
			<button
			className={props.sort === "interestDsc" ? "home_sort_button home_sort_button_active" : "home_sort_button"}
			value="interestAsc"
			onClick={(e) => {props.setSort(e.target.value)}}>
			Tags ↓</button>

		);
	} else if (props.sort === "interestAsc") {
		return (
			<button
			className={props.sort === "interestAsc" ? "home_sort_button home_sort_button_active" : "home_sort_button"}
			onClick={(e) => {e.target.value === "interestAsc" ? props.setSort("interestAsc") : props.setSort("interestDsc")}}>
			Tags ↑</button>
		);
	} else {
		return (
			<button
			className="home_sort_button"
			value="interestAsc"
			onClick={(e) => {props.setSort(e.target.value)}}>
			Tag</button>
		);
	}
}