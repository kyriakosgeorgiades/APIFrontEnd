import { PageHeader, Input } from 'antd';
import FavouriteGrid from './favGrid';
import React, {  useContext, useState } from 'react';
import UserContext from '../contexts/user';


const { Search } = Input;

/**
 * Renders a <Favourites /> component to be the parent of all the render dogs.
 * @params props
 */

function Favourites(props) {
	const [press, setPress] = useState(false);
	const option = useContext(UserContext);
	
	
  return (
    <>
      <div className="site-layout-content">
        <div style={{ padding: '2% 20%' }}>
          
          <PageHeader className="site-page-header"
            title="Dog Shelter"/>
        </div>  

       { <FavouriteGrid />}
      </div>
    </>  
  );
}

export default Favourites;
