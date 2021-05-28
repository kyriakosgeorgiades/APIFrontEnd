import React, { useState, useEffect, useContext, useRef } from 'react';
import {status,json} from '../utilities/requestHandlers';
import UserContext from '../contexts/user';
import { withRouter } from 'react-router';

/**
 * Renders a <Account /> component to display user account details
 * @params props
 */



function Account(props) {
	const [profile, setProfile] = useState({});
	
	/** On mount fetch the user details based on ID*/
	useEffect(() => {
	const token = localStorage.getItem("token");
	const id = localStorage.getItem("ID");
	fetch(`https://famous-pyramid-3000.codio-box.uk/api/v1/users/${id}`, {
			method: "GET",
			headers:{
				"Authorization": token,
				"Content-Type":"application/json"
			}
		})
		.then(status)
		.then(json)
		.then(data => {
			console.log(data);
			setProfile(data);
		})
		.catch(errorResponse => {
			console.error(errorResponse)
			alert(`Error: ${errorResponse.status}: Wrong username or password`);
		})
},[])
	
	return(
		<>
			<h1>Account</h1>
			<li>First Name: {profile.firstName}</li>
			<li>Last Name: {profile.lastName}</li>
			<li>Username: {profile.username}</li>
			<li>Email: {profile.email}</li>
			<li>About: {profile.about}</li>
			<li>Avatar: {profile.avatarURL}</li>
		</>
	);
}

export default Account;