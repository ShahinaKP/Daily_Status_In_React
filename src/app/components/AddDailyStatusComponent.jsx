import React from "react";

import "../scss/addComponent.scss";

class AddDailyStatusComponent extends React.Component {
  constructor(props) {
    super(props);

    // Populate the last 7 days dates
    let datesArr = [];
    let curr = new Date; // get current date
    let first = curr.getDate(); // First day is the day of the month - the day of the week
    let last = first - 6; // last day is the first day + 6

    for ( let i = 0; i < 7; i++) {
      let day = new Date(curr.setDate(first - i));
      datesArr.push(day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear());
    }

    // Populate the projects
    let projectsJson = require("../assets/json/projects.json"),
        projectsArr = [];

    for ( let i = 0; i < projectsJson.length; i++) {
       projectsArr.push(projectsJson[i]);
    }

    // Populate the activity types
    let activityTypeJson = require("../assets/json/activityTypes.json"),
        activityTypeArr = [];

    for ( let i = 0; i < activityTypeJson.length; i++) {
       activityTypeArr.push(activityTypeJson[i]);
    }

    this.state = {
      activity : "Activity Added",
      dateOptions: datesArr,
      projects: projectsArr,
      activityTypes: activityTypeArr
    };
  }

  onAddActivity() {
        let myActivity =  this.state.activity;
        this.props.onCreateActivity(myActivity);
  };

  onInputChange(event) {
    this.setState({activity: event.target.value});
  };

  render() {
    let getOptions = (arraySet) => {
      let options = arraySet.map((item) =>
        <option key={item}>{item}</option>
      );
      return options;
    };
    const hours = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
      
    const minutes = ["00", "05", "30", "45"];

    return (
      <div>
      <h1> Daily Status</h1>
      <div className="addActivityWrapper">
        <p>Bursts</p>
          <div className="colWrapper">
            <div className="col2">
              <label>Date</label>
              <select>{getOptions(this.state.dateOptions)}</select>
            </div>

            <div className="col4">
              <label>Project</label>
              <select>{getOptions(this.state.projects)}</select>
            </div>

            <div className="col2">
              <label>Activity Type</label>
              <select>{getOptions(this.state.activityTypes)}</select>
            </div>

            <div className="col2 time">
              <label>Time Spent (hours:minutes)</label>
              <select>{getOptions(hours)}</select>
              <select>{getOptions(minutes)}</select>
            </div>
          </div>
          <div className="saveBtnDiv">
            <button onClick={this.onAddActivity.bind(this)}>Add Daily Status</button>
          </div>
      </div>
      </div>
    );
  }

}

export default AddDailyStatusComponent;