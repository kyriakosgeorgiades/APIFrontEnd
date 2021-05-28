import { PageHeader, Input } from 'antd';
import BlogGrid from './bloggrid';
import {status,json} from '../utilities/requestHandlers';
import React, {  useContext, useState } from 'react';
import UserContext from '../contexts/user';
import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';


const { Search } = Input;

/**
 * Renders a <Home /> component to be the home page of the application.
 * @params props
 */
function Home(props) {
	const [press, setPress] = useState(false);
	const option = useContext(UserContext);
	
	/** On click function for the filtering
	 * Based on each filter different value is assigned
	 * As it has only 1 filter at the time to search for*/
	const onClick = ({ key }) => {
	let value;
	console.log(key);
	if ( key === '0'){
		value = 'Age';
	}
	if ( key === '1'){
		value = 'Breed';
	}
	if ( key === '2'){
		value = 'Sex';
	}
	if ( key === '3'){
		value = 'Location';
	}
	if ( key === '4'){
		setPress(false);
		option.handleFilter('name');
		message.info(`Filter is cleared. Search is by name default`);
	}
  
	if ( key!== '4'){	
		message.info(`Filtering by ${value}`);
		option.handleFilter(value);
	}
};
	
	const menu = (
  <Menu>
    {['Age', 'Breed', 'Sex', 'Location', 'Clear Filter'].map((value, i) => <Menu.Item  key={i}  onClick={!press && onClick } >{value}  </Menu.Item>)}
  </Menu>
);
	
	const isSearching = useContext(UserContext);
	
	const onSearch = value => {
		isSearching.handleSearch(value)
	}
	const search_ON = isSearching.user.searching;
	
  return (
    <>
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          <Search placeholder="Search your new friend! Default search by Name"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}/>
					<Dropdown overlay={menu}>
						 <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Filter By <DownOutlined />
				</a>
				</Dropdown>
          <PageHeader className="site-page-header"
            title="Dog Shelter"
            subTitle="Pick your new friend today"/>
        </div>  

       { <BlogGrid />}
      </div>
    </>  
  );
}

export default Home;
