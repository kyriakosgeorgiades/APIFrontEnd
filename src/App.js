import { Layout } from 'antd';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Nav from './components/nav';
import Home from './components/home';
import Favourites from './components/favourites';
import Account from './components/account';
import Post from './components/post';
import Log from './components/login';
import EditDog from './components/editDog';
import RegistrationForm from './components/register'
import RegistrationDog from './components/registerDog'
import UserContext from './contexts/user';
import moment from 'moment';
import React from 'react';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user : {loggedIn: false, role : 'user', searching: null, filters: 'name', dogID: null, del:false},
			status: null,
			role_user: null,
			count:0			
		}
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
		this.isLoggedIn = this.isLoggedIn.bind(this);
		this.setLocalStorage = this.setLocalStorage.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.handleFilter = this.handleFilter.bind(this);
	}
	
	login(user){
		user.loggedIn = true;
		user.role = user.role
		this.setState({user:user});
		localStorage.setItem('logstatus', 'true');
		localStorage.setItem('role', user.role);
		localStorage.setItem('ID', user.ID);
		
	}
	
	logout(){
		localStorage.removeItem('token');
		localStorage.removeItem('expires');
		localStorage.removeItem('role');
		localStorage.removeItem('ID');
		this.setState({user: {loggedIn:false, role:undefined}});
		localStorage.setItem('logstatus', false);
		
	}
	
	isLoggedIn() {
		return moment().isBefore(this.getExpiration())
	}
	
	isLoggedOut() {
		return !this.isLoggedIn();
	}
	
	setLocalStorage(resObj){
		const expires = moment().add(resObj.expiresIn);
		localStorage.setItem('token', resObj.token);
		localStorage.setItem('expires', JSON.stringify(expires.valueOf()));
	}
	
	getExpiration(){
		const expiration = localStorage.getItem("expires");
		const expiresAt = JSON.stringify(expiration);
		return moment(expiresAt);
	}
	
	handleSearch(value) {
            this.setState(prevState => ({
                user : {
                    loggedIn: prevState.user.loggedIn,
                        roled: prevState.user.role,
												filters:prevState.user.filters,
                            searching: value
									}}))
  }
	handleFilter(value){
		this.setState(prevState => ({
			user : {
				loggedIn:prevState.user.loggedIn,
				roled:prevState.user.role,
				searching:prevState.user.searching,
				filters:value
			}
		}))
	}	
	
	
	render () {
		const context = {
			user: this.state.user,
			login: this.login,
			logout: this.logout,
			setLocalStorage: this.setLocalStorage,
			handleSearch: this.handleSearch,
			handleFilter: this.handleFilter
		};
		
		
		const status = localStorage.getItem('logstatus');
		const work_status = localStorage.getItem('role');
			
	
  return (
    <Layout className="layout">
		<UserContext.Provider value={context}>
     <Router>
      <Header>
        <Nav />
      </Header>
      
      <Content>
				<Switch>
					{(status === 'true' || context.user.loggedIn === true) &&  <Route path="/account" children={<Account />} />}
					{(status === 'false' || context.user.loggedIn === false) && <Route path="/login" children={<Log />} />} 
					<Route path="/register" children={<RegistrationForm />} />
					<Route path="/post/:id" children={<Post />} />
					{((work_status === 'worker' && status === 'true') || (this.state.user.role== 'worker' && this.state.user.loggedIn === true )) && <Route path="/editDog" children={<EditDog />} />}
					{((work_status === 'worker' && status === 'true') || (this.state.user.role== 'worker' && this.state.user.loggedIn === true )) && <Route path="/registerDog" children={<RegistrationDog />} />}
					<Route path="/dog/:id" children={<Post />} />
					<Route path="/favourites" children={<Favourites />} />
					<Route path="/" children={<Home />} />	
				</Switch>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Dog Shelter</Footer>
		</Router>
		</UserContext.Provider>
    </Layout>
  )
}
}
export default App;
