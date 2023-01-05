export default function AgeSortButton(props) {

	if (props.sort === "ageDsc") {
		return (
			<button
			className={props.sort === "ageDsc" ? "home_sort_button home_sort_button_active" : "home_sort_button"}
			value="ageAsc"
			onClick={(e) => {props.setSort(e.target.value)}}>
			Age ↓</button>

		);
	} else if (props.sort === "ageAsc") {
		return (
			<button
			className={props.sort === "ageAsc" ? "home_sort_button home_sort_button_active" : "home_sort_button"}
			onClick={(e) => {e.target.value === "ageAsc" ? props.setSort("ageAsc") : props.setSort("ageDsc")}}>
			Age ↑</button>
		);
	} else {
		return (
			<button
			className="home_sort_button"
			value="ageAsc"
			onClick={(e) => {props.setSort(e.target.value)}}>
			Age</button>
		);
	}
}