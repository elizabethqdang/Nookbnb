import React from 'react';
import SleepingArrangementIndexItem from './sleeping_arrangement_index_item';

class SleepingArrangementIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { bedrooms } = this.props;
    let numBedrooms = [];

    for(let i = 0; i < bedrooms; i++) {
      let num = i + 1;
      numBedrooms.push(num);
    }

    return (
      <ul>
        {numBedrooms.map(num => <SleepingArrangementIndexItem key={num} num={num} />)}
      </ul>
    );
  }
}

export default SleepingArrangementIndex;