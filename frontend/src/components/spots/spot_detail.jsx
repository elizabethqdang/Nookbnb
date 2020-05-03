import React from 'react';
import { withRouter } from 'react-router-dom';

import Datepicker from '../datepicker/datepicker';
import SleepingArrangementIndex from '../sleeping_arrangement/sleeping_arrangement_index';
import Footer from '../footer/footer';

import '../../assets/stylesheets/spots/spot_detail.css';

class SpotDetail extends React.Component {
  // Constructor for SpotDetail component
  constructor(props) {
    super(props);
    window.scrollTo(0, 0);
    this.state = { 
      user: { email: '' },
      name: '',
      city: '',
      state: '',
      country: '',
      occupancy: 0,
      bedrooms: 0,
      beds: 0,
      baths: 0,
      description: '',
      amenities: []
    } 
  }

  // Runs once component is mounted
  componentWillMount() {
    this.props.fetchSpot(this.props.spotId);
  }

  // Runs when component receives new props that update the state
  componentWillReceiveProps(newState) {
    this.setState({ currentSpot: newState.spot });
  }

  // Rendering component
  render() {
    const {currentSpot} = this.props;
    let spot = currentSpot['spot'];
    let user = currentSpot['user'];
    let username = user.email.substr(0, user.email.indexOf('@')); 
    let usernameCapitalized = username.charAt(0).toUpperCase() + username.slice(1)

    return (
      <div className="spot-detail main-content-wrapper">   
        <div className="spot-detail photo-thumbs-wrapper">
          <div className="spot-detail main-image-wrapper" onClick={() => this.props.openSpotModal('spot', 0)}>
            <img src={`${spot.thumbnail_image_urls ? spot.thumbnail_image_urls[0] : ''}`} alt="Main spot photo" />
            <div className="overlay-wrapper"></div>
          </div>
          
          <div className="spot-detail side-image-wrapper">
            {spot.thumbnail_image_urls ? spot.thumbnail_image_urls.slice(1, spot.thumbnail_image_urls.length).map((url, indx) => 
              <div className="image-wrapper" onClick={() => this.props.openSpotModal('spot', indx + 1)}>
                <img src={url} alt="Thumbnail photo" />
                <div className="overlay-wrapper"></div>
              </div>) : ''}
          </div>

          <div className="view-images-wrapper"> 
            <button onClick={() => this.props.openSpotModal('spot', 0)}>View Photos</button>
          </div>
        </div>

        <div className="spot-detail main-content-container">
          <div className="spot-detail header-wrapper">
            <div className="spot-detail location-wrapper">
              <div className="spot-index geo-wrapper">
                <h1>{spot.name}</h1>
                <p>{spot.city}</p>
              </div>

              <img src={user.profile_image_url} alt="Profile image" /> 
            </div>

            <div className="spot-detail user-price-wrapper">
              <p><span>${spot.price}</span> per night</p>
            </div> 
          </div>

          <div className="spot-detail body-wrapper">
            <div className="spot-detail gen-info-wrapper">
              <p>{spot.occupancy} {spot.occupancy > 1 ? 'guests' : 'guest'}</p>
              <p>{spot.bedrooms} {spot.bedrooms > 1 ? 'bedrooms' : 'bedroom'}</p>
              <p>{spot.beds} {spot.beds > 1 ? 'beds' : 'bed'}</p>
              <p>{spot.baths} {spot.baths > 1 ? 'baths' : 'bath'}</p>
            </div>

            <div className="spot-detail perks-wrapper">
              <div className="spot-detail perk-wrapper">
                <img src='/images/spot_detail/star_icon.png' />

                <div className="spot-detail text-wrapper">
                  <h3>Entire home</h3>
                  <p>You'll have the house to yourself.</p>
                </div>
              </div>

              <div className="spot-detail perk-wrapper">
                <img src='/images/spot_detail/bottle_icon.png' />

                <div className="spot-detail text-wrapper">
                  <h3>Sparkling clean</h3>
                  <p>Recent guests said this place was sparkling clean.</p>
                </div>
              </div>

              <div className="spot-detail perk-wrapper"> 
                <img src='/images/spot_detail/badge_icon.png' />

                <div className="spot-detail text-wrapper">
                  <h3>{usernameCapitalized} is a Superhost</h3>
                  <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                </div>
              </div>

              <div className="spot-detail perk-wrapper">
                <img src='/images/spot_detail/house_icon.png' />

                <div className="spot-detail text-wrapper">
                  <h3>Great check-in experience</h3>
                  <p>Recent guests gave the check-in process a 5-star rating.</p>
                </div>
              </div>
            </div>

            <div className="spot-detail description-wrapper">
              <p>{spot.description}</p>
            </div>

            <div className="spot-detail sleeping-wrapper">
              <h2>Sleeping arrangements</h2>
              <SleepingArrangementIndex bedrooms={spot.bedrooms} />
            </div> 

            <div className="spot-detail amenities-wrapper">
              <h2>Amenities</h2>
              
              <ul>
                {spot.amenities && spot.amenities[0].wifi ? 
                  <li>
                    <img src='/images/spot_detail/wifi_icon.png' />
                    <p>Wifi</p> 
                  </li> : ""
                }

                {spot.amenities && spot.amenities[0].kitchen ?
                  <li>
                    <img src='/images/spot_detail/kitchen_icon.png' />
                    <p>Kitchen</p>
                  </li> : ""
                }

                {spot.amenities && spot.amenities[0].breakfast ?
                  <li>
                    <img src='/images/spot_detail/breakfast_icon.png' />
                    <p>Breakfast</p>
                  </li> : ""
                }

                {spot.amenities && spot.amenities[0].parking ?
                  <li>
                    <img src='/images/spot_detail/parking_icon.png' />
                    <p>Free parking on premises</p>
                  </li> : ""
                }

                {spot.amenities && spot.amenities[0].pool ?
                  <li>
                    <img src='/images/spot_detail/pool_icon.png' />
                    <p>Pool</p>
                  </li> : ""
                }

                {spot.amenities && spot.amenities[0].essentials ?
                  <li>
                    <img src='/images/spot_detail/essentials_icon.png' />
                    <p>Essentials</p>
                  </li> : ""
                }
              </ul>
            </div>
          </div> 

          <div className="spot-detail booking-wrapper">
            <h2>Select dates</h2>
            <Datepicker />
          </div>
        </div>

        <Footer />
      </div> 
    );
  }
}

export default withRouter(SpotDetail);