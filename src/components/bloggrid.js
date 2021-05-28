import React, { useState, useEffect, useContext, useRef } from 'react';
import { Col, Row } from 'antd';
import PostCard from './postcard';
import {status,json} from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

/**
 * Renders a <BlogGrid /> component to display all of the dogs.
 * @params props
 */

function BlogGrid(props) {
	const param_value = useContext(UserContext);
	const [posts , setPosts] = useState([]);
	const [favs, setFavs] = useState([]);
	const [val, setVals] = useState(param_value.user.searching);
	const [deleted, setDel] = useState(null);
	let isInitialMount = useRef(true);

	
	/**  On mount fetch the data for the dogs */
	useEffect(() => {
		loadData();
	}		
	,[])
	
	
	/** On update if the search result POST is empty just reload the data again. Else search based on filter */
	useEffect(() => {
		if (param_value.user.searching === ''){
			loadData();
		} else {
		if (isInitialMount.current){
			isInitialMount.current=false;
		} else{
		loadSearch();
		}
	}
	isInitialMount = false;
	}, [param_value.user.searching])

	
	/** Fetching all the dogs matching the search criteria */
	function loadSearch(){
			fetch(`https://famous-pyramid-3000.codio-box.uk/api/v1/dogs/search?${encodeURIComponent(param_value.user.filters)}=${encodeURIComponent(param_value.user.searching)}`,{
			method: "GET",
			headers:{
				"Content-Type":"application/json"
			}
		})
		.then(status)
		.then(json)
		.then(data=> {
			console.log(data)
			setPosts(data)
			
		})
		.catch(err => console.log("Error fetching articles", err));
	}
	
	
	/** Loading all of the dogs but also the favourite dogs of the current user */
	function loadData(){
			fetch('https://famous-pyramid-3000.codio-box.uk/api/v1/dogs',{
			method: "GET",
			headers:{
				"Content-Type":"application/json"
			}
		})
		.then(status)
		.then(json)
		.then(data=> {
			console.log(data)
			setPosts(data)
		})
		.catch(err => console.log("Error fetching articles", err));
		
		const token = localStorage.getItem("token");
		fetch('https://famous-pyramid-3000.codio-box.uk/api/v1/favs',{
			method: "GET",
			headers:{
				"Authorization": token,
				"Content-Type":"application/json"
			}
		})
		.then(status)
		.then(json)
		.then(data=> {
			setFavs(data)
		})
		.catch(err => console.log("Error fetching favourites", err),
					setFavs([]));
	}
		
		if(posts === []){
			return <h3>Loading posts...</h3>
		}
		
		
		const cardList = posts.map(post=>{
			const id = post.ID
			favs.map(fav=>{
				if (fav.ID === post.ID){
					post.status = 1;
				} 
			})
			return(
			<div style={{padding:"10px"}} key={post.ID} >
			 <Col span={6}>
				<PostCard {...post} loadData={loadData} selection={post.status} /> 

			</Col>
			</div>
			)
		});
		return(
		<Row type="flex" justify="space-around">
		{cardList}
		</Row>
		);
	}



export default BlogGrid;