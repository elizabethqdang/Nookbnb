import React from 'react';
import { withRouter } from 'react-router-dom';
import SpotWorldIndex from './spot_world_index';
import SpotIndexItem from './spot_index_item';

class SpotIndex extends React.Component {
  // Constructor for SpotIndex
  constructor(props) {
    super(props);
    this.state = {
      spots: []
    }
  }

  // Runs once component is mounted
  componentWillMount() {
    this.props.fetchSpots();
  }

  // Runs when component receives new props that update the state
  componentWillReceiveProps(newState) {
    this.setState({ spots: newState.spots });
  }

  // Rendering component
  render() {
    const { spots } = this.props;

    return (
      <div className="spot-index-wrapper">
        <div className="spot-index-world-wrapper">
          <h2>Travel the world with Airbnb</h2>
          <SpotWorldIndex spots={spots} />
        </div> 

        <div className="spot-index-top-wrapper">
          <h2>Top-rated places to stay</h2>
          
          <ul>
            {spots.map(spot => <SpotIndexItem key={spot._id} spot={spot} />)}
          </ul>
        </div> 
      </div>
    );
  }
}

export default withRouter(SpotIndex);