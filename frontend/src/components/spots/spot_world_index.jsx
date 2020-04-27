import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const SpotWorldIndex = () => (
  <div className="world-container"> 
    <ul>
      <li>
        <Link to="/search/napa%20city">
          <div className="region image-wrapper">
            <img src='/images/homepage/breezy_hollow.png' />
          </div>

          <div className="region text-wrapper">
            <p>Napa City</p>
          </div>
        </Link>
      </li>

      <li>
        <Link to="/search/south%20lake%20tahoe">
          <div className="region image-wrapper">
            <img src='/images/homepage/lost_lure_creek.png' />
          </div>

          <div className="region text-wrapper">
            <p>South Lake Tahoe</p>
          </div>
        </Link>
      </li>

      <li>
        <Link to="/search/monterey">
          <div className="region image-wrapper">
            <img src='/images/homepage/saltwater_shores.png' />
          </div>

          <div className="region text-wrapper">
            <p>Monterey</p>
          </div>
        </Link>
      </li>

      <li>
        <Link to="/search/honolulu">
          <div className="region image-wrapper">
            <img src='/images/homepage/sunburst_island.png' />
          </div>

          <div className="region text-wrapper">
            <p>Honolulu</p>
          </div>
        </Link>
      </li>
    </ul>
  </div>
);

export default withRouter(SpotWorldIndex);