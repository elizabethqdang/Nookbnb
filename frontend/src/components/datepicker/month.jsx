import React from 'react';

class Month extends React.Component {
  // Constructor for Month
  constructor(props) {
    super(props);
    this.state = {
      days: []
    }
  }
  
  // Runs once component has mounted
  componentDidMount() {
    const { month } = this.props;
    this.populateDays(month);
  }

  // Runs when component receives new props
  componentWillReceiveProps(newState) {
    this.populateDays(newState.month);
  }

  // Popoulates months with correct amount of days
  populateDays(month) {
    let totalDays;
    let newDays = [];
    let splitDays = [];

    if (month === 'February') {
      totalDays = 28;
    } else if (month === 'April' || month === 'June' || month === 'September' || month === 'November') {
      totalDays = 30;
    } else {
      totalDays = 31;
    }

    for (let i = 0; i < totalDays; i++) {
      let newDay = i + 1;
      newDays.push(newDay.toString());
    }

    this.setState({days: newDays});
  }

  // getSelectedYr(monthNum, currentYr, direction) {
  //   if (direction === 'forward' && monthNum === 0) {
    
  //   }
  // }

  // Renders the Month component
  render() {
    const { currentDate, monthNum, type, direction } = this.props;
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
    let selectedMonth = months[monthNum];
    let selectedYr;


    return (
      <div className={`${type}-month`}>
        <div id={`${type}-month-header`}>{selectedMonth}</div>

        <div className="days">
          <div className="weekday-header">
            <div className="weekday">Su</div>
            <div className="weekday">Mo</div>
            <div className="weekday">Tu</div>
            <div className="weekday">We</div>
            <div className="weekday">Th</div>
            <div className="weekday">Fr</div>
            <div className="weekday">Sa</div>
          </div>
          
          <div className="number-days">
            {this.state.days.map(day => <div className="number" onClick={() => this.props.handleClick(day, monthNum)}>{day}</div>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Month;