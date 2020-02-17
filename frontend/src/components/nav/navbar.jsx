import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../../assets/stylesheets/navbar.css"
import Dropdown from "./dropdown";
import SearchBar from "./search_bar";

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
		this.navbarSearch = this.navbarSearch.bind(this);
		this.handleSearchSubmit = this.handleSearchSubmit(this);
		this.navigateToSearch = this.navigateToSearch.bind(this);
	}

	logoutUser(e) {
		e.preventDefault();
		this.props.logout();
	}

	// ED: added signup modal
	handleSignup(e) {
		e.preventDefault();
		this.props.openModal("signupFirst");
		this.props.history.push("/");
	}

	// ED: added login modal
	handleLogin(e) {
		e.preventDefault();
		this.props.openModal("login");
		this.props.history.push("/");
	}

	handleSearchSubmit(e) {
		this.navigateToSearch();
	}

	navigateToSearch() {
		this.props.history.push("/search");
	}

	update(property) {
		return e =>
			this.setState({
				[property]: e.target.value
			});
	}

	navbarSearch() {
		if (this.props.loggedIn) {
			return (
				<div>
					<i className="fas fa-glass"></i>
					<form onSubmit={this.props.handleSearchSubmit}>
						{/* <div className="search-bar-input">
							<input
								type="text"
								placeholder="Search"
								value={this.state.searchInput}
								onChange={this.update("searchInput")}
							/>
						</div> */}
						<div>
							<input type="submit" />
						</div>
					</form>
				</div>
			);
		}
	}

	// Selectively render links dependent on whether the user is logged in
	getLinks() {
		const { logout, currentUser } = this.props;
		if (this.props.loggedIn) {
			return (
				<div className="navbar">
					<div className="logo">
						<Link to="/">
							<img src='/images/navbar/nooks_cranny_logo.png' />
						</Link>
					</div>

					{/* <div className="nav-mid">
						<div className="search-bar">{this.navbarSearch()}</div>
					</div> */}

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
									<Dropdown className="" currentUser={currentUser} logout={logout} />
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

					{/* <div className="search-bar">
						{this.props.location.pathname !== "/" || this.props.currentUser ? (
							<SearchBar />
						) : null}
					</div> */}

					<div className="search-bar">
					  <SearchBar />
					</div>

					<div className="nav-main">
						<ul className="nav-main-list">
							<li>
								<div>
									<button
										type="button"
										className="nav-link"
									><Link to={"/"}>
										Host a home</Link>
									</button>
								</div>
							</li>
							<li>
								<div>
									<button
										type="button"
										className="nav-link"
									><Link to={"/"}>
										Become a host</Link>
									</button>
								</div>
							</li>
							<li>
								<div className="help-link">
									<Link to={"/"}><button type="button" className="nav-link">
										Help
									</button></Link>
								</div>
							</li>
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
			</div>
		);
	}
}

export default withRouter(NavBar);
