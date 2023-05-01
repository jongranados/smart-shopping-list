import { useState } from 'react';
import { ListItem } from '../components';
import { Link } from 'react-router-dom';

export function List({ data }) {
	const [searchTerm, setSearchTerm] = useState('');

	/* TO DO: Make separate resuable input component with a filter feature*/

	const filteredList = data.filter((item) => {
		if (searchTerm === '') {
			return item;
		} else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
			return item;
		}
	});

	const renderedList = filteredList.map((item) => (
		<ListItem name={item.name} key={item.id} />
	));

	const clearSearchField = (e) => {
		e.preventDefault();
		setSearchTerm('');
	};

	const renderedListLength = renderedList.length;

	return (
		<>
			{renderedListLength === 0 && (
				<>
					<h2> Your list currently has no items. </h2>
					<h3>Click on the add first item button to start your list.</h3>
					<Link to="/add-item">
						<button> add first item</button>
					</Link>
				</>
			)}
			{renderedListLength > 0 && (
				<>
					<form onSubmit={clearSearchField}>
						<label htmlFor="search-filter">
							Search for an item in your list:
						</label>
						<input
							type="text"
							id="search-filter"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<button type="submit"> Search </button>
					</form>
					<h3> Here are the items in your list:</h3>
				</>
			)}

			<ul>{renderedList}</ul>
		</>
	);
}
