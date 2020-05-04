import React from 'react';

import Map from '../map/map';
import SearchIndex from './search_index';
import Footer from '../footer/footer';

import '../../assets/stylesheets/search/search.css';

class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = { find_loc: this.props.find_loc };
	}

	// Runs once component has mounted
	// Ensures search results appear on a manual page refresh by the user
	componentDidMount() {
		this.props.fetchSpots();
	}	

	// Triggers a re-render when component receives new props
	componentWillReceiveProps(newProps) {
    this.setState({ find_loc: newProps.match.params.find_loc });
	}

	// Gets spots matching search input
	getSpots(spots) {
		// Library of state abbreviations
		const states = {
			"AL": "alabama",
			"AK": "alaska",
			"AS": "american samoa",
			"AZ": "arizona",
			"AR": "arkansas",
			"CA": "california",
			"CO": "colorado",
			"CT": "connecticut",
			"DE": "delaware",
			"DC": "district of columbia",
			"FL": "florida",
			"GA": "georgia",
			"GU": "guam",
			"HI": "hawaii",
			"ID": "idaho",
			"IL": "illinois",
			"IN": "indiana",
			"IA": "iowa",
			"KS": "kansas",
			"KY": "kentucky",
			"LA": "louisiana",
			"ME": "maine",
			"MD": "maryland",
			"MA": "massachusetts",
			"MI": "michigan",
			"MN": "minnesota",
			"MS": "mississippi",
			"MO": "missouri",
			"MT": "montana",
			"NE": "nebraska",
			"NV": "nevada",
			"NH": "new hampshire",
			"NJ": "new jersey",
			"NM": "new mexico",
			"NY": "new york",
			"NC": "north carolina",
			"ND": "north dakota",
			"OH": "ohio",
			"OK": "oklahoma",
			"OR": "oregon",
			"PA": "pennsylvania",
			"PR": "puerto rico",
			"RI": "rhode island",
			"SC": "south carolina",
			"SD": "south dakota",
			"TN": "tennessee",
			"TX": "texas",
			"UT": "utah",
			"VT": "vermont",
			"VI": "virgin Islands",
			"VA": "virginia",
			"WA": "washington",
			"WV": "west Virginia",
			"WI": "wisconsin",
			"WY": "wyoming"
		}

		// Getting lowercased location string from search input
		const location = this.state.find_loc;
		let locationArr;
		let lowercasedLocation = [];
		let foundSpots = [];

		if (location) {
			locationArr = location.split(' ');
			locationArr.forEach(word => lowercasedLocation.push(word.toLowerCase()));
			lowercasedLocation = lowercasedLocation.join(' ');
		}

		// Searching for spots matching location
		spots.forEach(spot => {
			const city = spot.city.toLowerCase();
			const stateAbbr = spot.state.toLowerCase();
			const stateFull = states[spot.state];

			if (city === lowercasedLocation || stateAbbr === lowercasedLocation || stateFull === lowercasedLocation) {
				foundSpots.push(spot);
			}
		});

		return foundSpots;
	}

	// Renders Search component
	render() {
		const {spots} = this.props;
		const foundSpots = this.getSpots(spots);

		return (
			<div className="search main-content-container">
				<div className="search results-container">
				  <SearchIndex spots={foundSpots} find_loc={this.state.find_loc} fetchSpots={this.props.fetchSpots} />
					<Map spots={foundSpots} find_loc={this.state.find_loc} />  
				</div>

				<Footer />
			</div>
		);
	}
}

export default Search;