import UserContext from '../contexts/user';
import React, {  useContext, useState, useEffect } from 'react';
import { EditOutlined , DeleteOutlined, StarOutlined, StarFilled } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import {status} from '../utilities/requestHandlers';


/**
 * Methdo to set the icon status
 * @param {string} theme - If the icon will be presented as pressed or not.
 * @param {string} iconType - The type of the icon.
 * return {object} Icon - The icon and its theme.
 */
function GetIcon (theme, iconType) {
	let Icon;
	if ( iconType === 'edit'){
		Icon = EditOutlined;
	}
	if ( iconType === 'delete'){
		Icon = DeleteOutlined;
	}
	if ( iconType === 'fav'){
		if (theme === 'outlined'){
				Icon = StarOutlined;
		}
		if ( theme === 'filled'){
				Icon = StarFilled;
		}
	}
 return Icon;
}

/**
 * Renders a <Icons /> component for the icons functionallity.
 * @params props
 */
class Icons extends React.Component{
	static contextType = UserContext;
	constructor(props){
		super(props);
		this.state = {
			deleted:false,
			selected: props.selection
		};
		
		this.onClick = this.onClick.bind(this);
	}
	
	onClick(){
		const token = localStorage.getItem("token");
		if ( this.props.type === 'edit'){
			this.context.user.dogID = this.props.id;
		}
		/** When the button of delete is pressed fetch to DELETE the dog. Checking through JWT token and permissions.
		 * The button is set to filled */
		if ( this.props.type === 'delete'){
			const token = localStorage.getItem("token");
			fetch(`https://famous-pyramid-3000.codio-box.uk/api/v1/dogs/${this.props.id}`, {
				method: "DELETE",
				headers:{
				"Authorization": token,
				}
			})
			.then(status)
			.then( ()=>{
				alert("Dog Removed!");
				this.context.user.dogID = null;
				this.context.user.del = true;
				this.props.loadData();
			})
		.catch(errorResponse => {
			console.error(errorResponse)
			alert(`Error: ${errorResponse.status}: You can only remove dogs for your work shelter`);
		})
		}
		/** When the button of favourite is pressed and it outlined add it to user favourite list with fetch */
		if ( this.props.type === 'fav' && this.props.selection === 0){
			fetch(`https://famous-pyramid-3000.codio-box.uk/api/v1/favs/${this.props.id}`, {
			method: "POST",
			headers:{
				"Authorization": token,
			}
		})
		.then(status)
		.then( ()=>{
			alert("Dog Added to Favourite List!");
			this.props.loadData();
		})
		.catch(errorResponse => {
			console.error(errorResponse)
			alert(`Error: ${errorResponse.status}: Dog add error`);
		})
			
			this.setState({selected: !this.state.selected});
		}
	/** When the favourite button is filled and clicked will Delete the selected dog and outlined the button */	
	if ( this.props.type === 'fav' && this.props.selection === 1){
		fetch(`https://famous-pyramid-3000.codio-box.uk/api/v1/favs/${this.props.id}`, {
			method: "DELETE",
			headers:{
				"Authorization": token,
			}
		})
		.then(status)
		.then( ()=>{
			alert("Dog removed from Favourite List!");
			this.props.loadData();
		})
		.catch(errorResponse => {
			console.error(errorResponse)
			alert(`Error: ${errorResponse.status}: Dog removal error`);
		})
		this.setState({selected: !this.state.selected});
		
	}
}
	
	componentDidUpdate(prevProps, prevState){
    if (prevState.selected !== this.state.selected) {
      this.props.handleToggle(this.state.selected);
			
    }
  }
	
	render(){
		
		const iconType = this.props.type;
		
		const theme = this.props.selection ? 'filled' : 'outlined';
		const Icon = GetIcon(theme,iconType);
		
		return(
			<span>
			<Link to = {this.props.type === 'edit' && "/editDog"}>
			<Icon onClick={this.onClick} 
				style={{color:'steelblue'}}/>
			</Link>
			</span>
		);
	}
}

export default Icons;
		