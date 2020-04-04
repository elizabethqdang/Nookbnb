import React from 'react';
import { withRouter } from 'react-router-dom';
import Datepicker from '../datepicker/datepicker';
import '../../assets/stylesheets/spot_detail.css';
import SleepingArrangementIndex from '../sleeping_arrangement/sleeping_arrangement_index';

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
    const { currentSpot } = this.props;
    let spot = currentSpot['spot'];
    let user = currentSpot['user'];
    let username = user.email.substr(0, user.email.indexOf('@')); 
    let usernameCapitalized = username.charAt(0).toUpperCase() + username.slice(1)

    return (
      <div className="spot-index-item-detail-wrapper"> 
        <div className="thumbnail-photos-wrapper">
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

        <div className="spot-index-item-detail-header">
          <div className="header">
            <div className="name-wrapper">
              <h1>{spot.name}</h1>
            </div>

            <div className="profile-image-wrapper">
              <img src={user.profile_image_url} alt="Profile image" />
            </div>
          </div>

          <div className="price">
            <p><span>${spot.price}</span> per night</p>
          </div>
        </div>

        <div className="spot-index-item-detail-location-wrapper">
          <p>{spot.city}</p>
        </div> 

        <div className="spot-index-item-detail-description">
          <div className="main-description-wrapper">
            <div className="description-wrapper">
              <div className="header-details-wrapper">
                <p>{spot.occupancy} {spot.occupancy > 1 ? 'guests' : 'guest'}</p>
                <p>{spot.bedrooms} {spot.bedrooms > 1 ? 'bedrooms' : 'bedroom'}</p>
                <p>{spot.beds} {spot.beds > 1 ? 'beds' : 'bed'}</p>
                <p>{spot.baths} {spot.baths > 1 ? 'baths' : 'bath'}</p>
              </div>

              <div className="spot-index-item-detail-description-perks">
                <div className="entire-home-perk-wrapper">
                  <div className="image-wrapper">
                    <i className="star-icon"><img src='/images/spot_detail/star_icon.png' /></i>
                  </div>

                  <div className="perk-wrapper">
                    <h3>Entire home</h3>
                    <p>You'll have the house to yourself.</p>
                  </div>
                </div>

                <div className="sparkling-clean-perk-wrapper">
                  <div className="image-wrapper">
                    <i className="cleaner-icon"><img src='/images/spot_detail/bottle_icon.png' /></i>
                  </div>

                  <div className="perk-wrapper">
                    <h3>Sparkling clean</h3>
                    <p>Recent guests said this place was sparkling clean.</p>
                  </div>
                </div>

                <div className="superhost-perk-wrapper"> 
                  <div className="image-wrapper">
                    <i className="badge-icon"><img src='/images/spot_detail/badge_icon.png' /></i>
                  </div>

                  <div className="perk-wrapper">
                    <h3>{usernameCapitalized} is a Superhost</h3>
                    <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
                  </div>
                </div>

                <div className="check-in-perk-wrapper">
                  <div className="image-wrapper">
                    <i className="house-icon"><img src='/images/spot_detail/check_in_icon.png' /></i>
                  </div>

                  <div className="perk-wrapper">
                    <h3>Great check-in experience</h3>
                    <p>Recent guests gave the check-in process a 5-star rating.</p>
                  </div>
                </div>
              </div>

              <div className="spot-index-item-detail-description-body">
                <p>{spot.description}</p>
              </div>

              <div className="spot-index-item-detail-description-sleeping-arrangements">
                <h2>Sleeping arrangements</h2>
                <SleepingArrangementIndex bedrooms={spot.bedrooms} />
              </div> 

              <div className="spot-index-item-detail-description-amenities">
                <h2>Amenities</h2>
                
                <div className="amenities-grid">
                  {spot.amenities && spot.amenities[0].wifi ? 
                    <div className="wifi-wrapper">
                      <div className="image-wrapper">
                        <i className="wifi-icon"><img src='/images/spot_detail/wifi_icon.png' /></i>
                      </div>
                      
                      <div className="label-wrapper">
                        <p>Wifi</p> 
                      </div>
                    </div> : ""
                  }

                  {spot.amenities && spot.amenities[0].kitchen ?
                    <div className="kitchen-wrapper">
                      <div className="image-wrapper">
                        <i className="kitchen-icon"><img src='/images/spot_detail/kitchen_icon.png' /></i>
                      </div>

                      <div className="label-wrapper">
                        <p>Kitchen</p>
                      </div>
                    </div> : ""
                  }

                  {spot.amenities && spot.amenities[0].breakfast ?
                    <div className="breakfast-wrapper">
                      <div className="image-wrapper">
                        <i className="breakfast-icon"><img src='/images/spot_detail/breakfast_icon.png' /></i>
                      </div>

                      <div className="label-wrapper">
                        <p>Breakfast</p>
                      </div>
                    </div> : ""
                  }

                  {spot.amenities && spot.amenities[0].parking ?
                    <div className="parking-wrapper">
                      <div className="image-wrapper">
                        <i className="parking-icon"><img src='/images/spot_detail/parking_icon.png' /></i>
                      </div>

                      <div className="label-wrapper">
                        <p>Free parking on premises</p>
                      </div>
                    </div> : ""
                  }

                  {spot.amenities && spot.amenities[0].pool ?
                    <div className="pool-wrapper">
                      <div className="image-wrapper">
                        <i className="pool-icon"><img src='/images/spot_detail/pool_icon.png' /></i>
                      </div>

                      <div className="label-wrapper">
                        <p>Pool</p>
                      </div>
                    </div> : ""
                  }

                  {spot.amenities && spot.amenities[0].essentials ?
                    <div className="essentials-wrapper">
                      <div className="image-wrapper">
                        <i className="essentials-icon"><img src='/images/spot_detail/essentials_icon.png' /></i>
                      </div>

                      <div className="label-wrapper">
                        <p>Essentials</p>
                      </div>
                    </div> : ""
                  }
                </div>
              </div>
            </div>
          </div> 
        </div>

        <div className="spot-index-detail-booking-form">
          <h2>Select dates</h2>
          <Datepicker />
        </div>
      </div> 
    );
  }
}

export default withRouter(SpotDetail);