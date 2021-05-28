import { Menu } from 'antd';
import { Link } from "react-router-dom";
import useLocalStorage from 'react-use-localstorage';
import UserContext from '../contexts/user';
import React, {  useContext, useState, useEffect } from 'react';



/**
 * Renders a <Nav /> component for the navigation menu.
 * @params props
 */
function Nav(props) {
		const logout = useContext(UserContext);
		const LOG_STATUS = 'logstatus';
		const ROLE_STATUS = 'role';
		const [status, setStatus] = useLocalStorage(LOG_STATUS,'false');
    const [status_role, setRole] = useLocalStorage(ROLE_STATUS, 'none');

    
    
    useEffect(() => {
      setStatus(localStorage.getItem(LOG_STATUS));
      setRole(localStorage.getItem(ROLE_STATUS));
    }, [])    
    

	
	
	
	
  return (
    <>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
				{status === 'true' && <Menu.Item key="2"><Link to="/account">Account</Link></Menu.Item>}
				{(status === 'false') && <Menu.Item key="3"><Link to="/login">LogIn</Link></Menu.Item>}
				{(status === 'false') && <Menu.Item key="4"><Link to="/register">Register</Link></Menu.Item>}
				{(status === 'true' && status_role === 'worker') && <Menu.Item key="5"><Link to="/registerDog">Add Dog</Link></Menu.Item>}
				{(status === 'true' && status_role === 'user') && <Menu.Item key="6"><Link to="/favourites">Favourites</Link></Menu.Item>}
				{status === 'true' && <Menu.Item key="7" onClick={logout.logout}><Link to="/">Logout</Link></Menu.Item>}
      </Menu>
    </>
  );
}

export default Nav;