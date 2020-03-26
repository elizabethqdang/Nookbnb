import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../assets/stylesheets/navbar.css'
import Dropdown from './dropdown';
import SearchBar from './search_bar';

class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchInput: ""
		};

		this.logoutUser = this.logoutUser.bind(this);
		this.getLinks = this.getLinks.bind(this);
		this.handleSignup = this.handleSignup.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.navigateToSearch = this.navigateToSearch.bind(this);
	}

	logoutUser(e) {
		e.preventDefault();
		this.props.logout();
	}

	handleSignup(e) {
		e.preventDefault();
		this.props.openModal('signup');
	}

	handleLogin(e) {
		e.preventDefault();
		this.props.openModal('login');
	}

	// ** BUG FOUND ** 
	// This is causing the search page to always render upon app load up
	handleSearchSubmit(e) {
		this.navigateToSearch();
	}

	// For testing, changed the route from '/search' to '/'
	navigateToSearch() {
		this.props.history.push("/");
	}

	update(property) {
		return e =>
			this.setState({
				[property]: e.target.value
			});
	}

	// Selectively render links dependent on whether the user is logged in
	getLinks() {
		const { logout, currentUser } = this.props;
		if (this.props.loggedIn) {
			return (
				<div className="navbar">
					<div className="logo">
						<Link to="/">
							<img src="/images/navbar/nooks_cranny_logo.png" />
						</Link>
					</div>

					<div className="search-bar">
						<SearchBar />
					</div>

					<div className="nav-main">
						<ul className="nav-main-list">
							<li>
								<div>
									<Link to={"/"} className="nav-link">
										Become a host
									</Link>
								</div>
							</li>
							<li>
								<div>
									<Link to={"/wishlists"} className="nav-link">
										Saved
									</Link>
								</div>
							</li>
							<li>
								<div>
									<Link to={"/trips"} className="nav-link">
										Trips
									</Link>
								</div>
							</li>
							<li>
								<div>
									<Link to={"/"} className="nav-link">
										Messages
									</Link>
								</div>
							</li>
							<li>
								<div>
									<Link to={"/"} className="nav-link">
										Help
									</Link>
								</div>
							</li>
							<li>
								<div className="nav-link">
									<Dropdown
										currentUser={currentUser}
										logout={logout}
									/>
								</div>
							</li>
						</ul>
					</div>
				</div>
			);
		} else {
			return (
				<div className="navbar">
					<div className="logo">
						<Link to="/">
						  <img src='/images/navbar/nooks_cranny_logo.png' />
						</Link>
					</div>

					<div className="search-bar">
					  <SearchBar />
					</div>

					<div className="nav-main">
						<ul className="nav-main-list">
							<li>
								<div className="signup-link">
									<button onClick={this.handleSignup} className="nav-link">
										Sign up
									</button>
								</div>
							</li>
							<li>
								<div className="login-link">
									<button onClick={this.handleLogin} className="nav-link">
										Log in
									</button>
								</div>
							</li>
						</ul>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				{this.getLinks()}
				{/* <FiltersBar /> */}
			</div>
		);
	}
}

export default withRouter(NavBar);
