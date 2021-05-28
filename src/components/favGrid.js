import React, { useState, useEffect, useContext, useRef } from 'react';
import { Col, Row } from 'antd';
import PostCard from './postcard';
import {status,json} from '../utilities/requestHandlers';
import UserContext from '../contexts/user';

/**
 * Renders a <FavouriteGrid /> component to display all of the current user favourites dogs.
 * @params props
 */

function FavouriteGrid(props) {
	const param_value = useContext(UserContext);
	const [posts , setPosts] = useState([]);
	const [favs, setFavs] = useState([]);
	const [deleted, setDel] = useState(null);
	let isInitialMount = useRef(true);

	
	useEffect(() => {
		loadData();
	}		
	,[])
	
	/** Fetching all of the favourite dogs */
	function loadData(){
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
			setPosts(data)
		})
		.catch(err => console.log("Error fetching dogs", err))
		
		fetch('https://famous-pyramid-3000.codio-box.uk/api/v1/dogs',{
			method: "GET",
			headers:{
				"Content-Type":"application/json"
			}
		})
		.then(status)
		.then(json)
		.then(data=> {
			setFavs(data)
		})
		.catch(err => console.log("Error fetching articles", err));
		
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
			
			<div style={{padding:"10px"}} key={post.ID}>
			 <Col span={6}>
				<PostCard {...post} loadData={loadData} selection={post.status}/> 

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



export default FavouriteGrid;