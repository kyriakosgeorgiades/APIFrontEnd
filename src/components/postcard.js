import React from 'react';
import { Card } from 'antd';
import Icons from './icons';
import PropTypes from 'prop-types';
import UserContext from '../contexts/user';
import NavImage from './navimage';

const { Meta } = Card;



class PostCard extends React.Component {
constructor(props){
	super(props);
	this.toggleFav = this.toggleFav.bind(this);
}
	static contextType = UserContext;

 toggleFav(isSelected) {
    if (isSelected){
			console.log("TEST TRUE");
		}
	 if (!isSelected){
		 console.log("TEST FALSE");
	 }
  }



	render() {
		const status = localStorage.getItem('logstatus');
		const work_status = localStorage.getItem('role');
		const postID = this.props.ID;
		
		
		return (
			<Card
			style = {{width: 320}}
			cover={<NavImage alt={`Post ${postID}`} src={this.props.imgURL} to={`/dog/${postID}`} />}
			hoverable = {true}
			actions={[
					 ((this.context.user.loggedIn === true && this.context.user.role ==='worker' ) || (status==='true' && work_status === 'worker' ) ) && <Icons id={this.props.ID} type="edit" loadData={this.props.loadData}/>,
          ((this.context.user.loggedIn === true && this.context.user.role ==='worker' ) || (status==='true' && work_status === 'worker' ) ) && <Icons id={this.props.ID} type="delete" loadData={this.props.loadData}/>,
          (this.context.user.loggedIn === true && (this.context.user.role ==='user') || (status==='true' && work_status === 'user' )) && <Icons id={this.props.ID} type="fav" loadData={this.props.loadData} selection={this.props.selection}
					handleToggle={this.toggleFav}/>
        ]}>
				
			<Meta title={this.props.name} description={this.props.description}/>
			</Card>
		);
	}
	
}


export default PostCard;