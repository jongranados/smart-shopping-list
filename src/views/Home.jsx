import { Navigate } from 'react-router-dom';
import './Home.css';
import { generateToken } from '@the-collab-lab/shopping-list-utils';
import * as React from 'react';
import { validateToken } from '../api/firebase';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

export function Home({ setListToken }) {
	const [userTokenInput, setUserTokenInput] = React.useState('');
	const [tokenExists, setTokenExists] = React.useState(false);

	function handleClick() {
		const token = generateToken();
		setListToken(token);
		setTokenExists(true);
	}

	async function handleSumbit(e) {
		e.preventDefault();
		const isValid = await validateToken(userTokenInput);
		if (isValid) {
			setListToken(userTokenInput);
			setTokenExists(true);
		} else {
			Toastify({
				text: 'Sorry, this list does not exist.',
				position: 'center',
				gravity: 'top',
				duration: 3000,
			}).showToast();
		}
	}

	return (
		<div className="Home">
			<button type="button" onClick={handleClick}>
				Create new list
			</button>
			<p> - or - </p>
			<form onSubmit={handleSumbit}>
				<label htmlFor="tokenInput">
					enter three word token to view existing list:
				</label>
				<div>
					<input
						type="text"
						id="tokenInput"
						onChange={(event) => setUserTokenInput(event.target.value)}
						required
					/>

					<button type="submit">Submit</button>
				</div>
			</form>

			{tokenExists && <Navigate to="/list" replace={true}></Navigate>}
		</div>
	);
}
