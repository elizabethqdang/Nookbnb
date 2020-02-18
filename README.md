# Airbnb Clone

## Introduction
Nookbnb is a single page MERN stack application that parodies off the concept and style of Airbnb. Drawing inspiration from the popular 'Animal Crossing' video game series, visitors to the site are able to browse rental listings for properties owned by Tom Nook himself. 

<kbd>
<img src="https://github.com/karleee/airbnb_clone/blob/master/README_images/home_main1.png" alt="Homepage" width="900px"     border="1">
</kbd>

<br>
<br>
<br>

<kbd>
<img src="https://github.com/karleee/airbnb_clone/blob/master/README_images/home_main2.png" alt="Homepage" width="900px" border="1">
</kbd>


## How It Works
To see the most up to date version, please visit [the homepage](https://nookbnb.herokuapp.com/#/).

## Technologies Used
* Routing – Express
* Database – MongoDB
* Libraries – Mongoose, React
* Server Environment – NodeJS


## Feature Spotlight
### Custom Calendar Widget

This calendar widget, which was built from scratch, dynamically renders the correct amount of days for each month and allows users to choose a check-in and checkout date. A dropdown menu to choose how many guests will be staying in the rental is also available to the user. The widget enforces that there can only be a maximum of four guests and adjusts the editing buttons for each category of guests accordingly.

<kbd>
<img src="https://github.com/karleee/airbnb_clone/blob/master/README_images/calendar_widget_main.png" alt="Homepage" width="900px" border="1">
</kbd>

<br>
<br>

**Challenges**
> Building from Scratch

The first challenge was to build out this widget without using any pre-built widgets or components from other libraries or resources. Although I did find fully functioning React Datepickers that I could have borrowed from, I found that styling these components seemed to be more difficult than simply coding up a widget from scratch. Many of these pre-built components also did not offer custom input boxes to store the user's chosen pair of dates; this was an incremental feature that I needed for my calendar widget so it was extremely important to keep that aspect in the final product.

Another key point that we had to keep in mind was the overall organization of all of the different components in our application and separating out irrelevant code into new components. Planning out how to break apart the calendar widget into as few components as possible while still achieving the basic functionality of date picking and dynamic displaying proved to be quite time consuming.

> Split Years

Another interesting challenge was determining how to account for split year portions of the calendar. For example, when the user landed on the calendar page that displayed both December and January, I needed to show the user the correct year for the month that they had chosen. The widget not only needed to keep track of the current year, but it also had to add or subtract the correct amount when the user clicked on the previous and next buttons.

> Guests Amount

The last challenge was to create a customizable guest amount dropdown menu that was integrated into the calendar widget. More specifically, after doing some research, it seems that Airbnb **does not** include infants as a part of the total guests count. Additionally, they are enforcing a maximum amount of guests to the rental and the UI is dynamic enough to change appearances and functionality depending on whether or not the guest limit had been reached.

<br>

**Solutions**
> Building from Scratch: Solution

For the first trial, I attempted to use the built in React datepicker, which uses hooks rather than functional components. Although this achieved the functionality that I wanted, there were some limitations. Styling for the built in widget seemed to be embedded within the widget itself; and rather than using traditional CSS or SCSS, it utilized props to manage custom style needs. Due to the time restraint and lack of familiarity with the code produced by this hook, I decided that it would take less time and increase efficiency if I created a calendar widget from scratch. Not only did this save time on the styling process, but it also increased my understanding and knowledge of how to build a custom calendar component.

> Split Years: Solution

This was a tricky issue, but ultimately, my solution involved storing separate slices of local state in the datepicker component to keep track of the date that the user chose for check-in and the date that they chose for checkout.

And to determine which text field to autofill, a clever solution that I thought of was to use a `clicks` slice of state to determine whether or not the user was choosing their check-in or checkout date. Inside of the click handler for the dates on the calendar, I was able to determine if it was their first or second click and then update the correct slice of state to trigger a re-render of the text box inputs.

``` javascript
  // Handles auto fill in dates for check-in and checkout
  handleDateClick(month, day, yr) {
    let newClicks = this.state.clicks + 1;
    let realMonthNum = month + 1;

    this.setState({ clicks: newClicks });
 
    if (newClicks % 2 !== 0) {
      this.setState({ selectedStartMonth: realMonthNum });
      this.setState({ selectedStartDay: day });
      this.setState({ selectedStartYr: yr });
      this.resetEndDate();
    } else {
      this.setState({ selectedEndMonth: realMonthNum });
      this.setState({ selectedEndDay: day });
      this.setState({ selectedEndYr: yr });
    }
  }
```

------

### Flexible Searching



**Challenges**



**Solutions**

> Solution 1




  
> Solution 2



## Future Updates


| Version Number        | Updates           | 
| :------------- |:------------- |
| Version 1.1      | Booking Form |  
