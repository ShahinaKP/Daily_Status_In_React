import React from "react";

import "../scss/addComponent.scss";

class AddDailyStatusComponent extends React.Component {
  constructor(props) {
    super(props);

    this.selHr = "01";
    this.selMin = "00";

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
    let statusInputJson = require("../assets/json/statusInput.json"),
        projectsArr = [],
        activityTypeArr = [];

    let projectsLength = statusInputJson.projects.length;
    for ( let i = 0; i < projectsLength; i++) {
       projectsArr.push(statusInputJson.projects[i]);
    }

    // Populate the activity types 
    let activityTypesLength = statusInputJson.activityTypes.length;
    for ( let i = 0; i < activityTypesLength; i++) {
       activityTypeArr.push(statusInputJson.activityTypes[i]);
    }

    this.state = {
      dateOptions: datesArr,
      projects: projectsArr,
      activityTypes: activityTypeArr,
      selDate: datesArr[0],
      selProj: projectsArr[0],
      selActType: activityTypeArr[0],
      selTimeSpend: "01:00"
    };
  }

  onChangeHandler(item, event) {
    let timeSpend;
    switch (item) {
      case "date":
        this.setState({selDate: event.target.value});
        break;

      case "project":
        this.setState({selProj: event.target.value});
        break;

      case "actType":
        this.setState({selActType: event.target.value});
        break;

      case "hrSpend":
        this.selHr =  event.target.value;
        timeSpend = this.selHr + ":" + this.selMin;
        this.setState({selTimeSpend: timeSpend});
        break;

      case "minSpend":
        this.selMin =  event.target.value;
        timeSpend = this.selHr + ":" + this.selMin;
        this.setState({selTimeSpend: timeSpend});
        break;
    }
  };

  onAddActivity() {
    let myActivity =  { "date": this.state.selDate,
                        "project": this.state.selProj,
                        "actType": this.state.selActType,
                        "timeSpend": this.state.selTimeSpend};
    this.props.onCreateActivity(myActivity);
  };

  render() {
    let getOptions = (arraySet) => {
      let options = arraySet.map((item) =>
        <option key={item}>{item}</option>
      );
      return options;
    };
    const hours = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const minutes = ["00", "05", "30", "45"];

    return (
      <div>
      <h1> Daily Status</h1>
      <div className="addActivityWrapper">
        <p>Bursts</p>
          <div className="colWrapper">
            <div className="col2">
              <label>Date</label>
              <select value={this.state.selDate} onChange={this.onChangeHandler.bind(this, "date")}>{getOptions(this.state.dateOptions)}</select>
            </div>

            <div className="col4">
              <label>Project</label>
              <select value={this.state.selProj} onChange={this.onChangeHandler.bind(this, "project")}>{getOptions(this.state.projects)}</select>
            </div>

            <div className="col2">
              <label>Activity Type</label>
              <select value={this.state.selActType} onChange={this.onChangeHandler.bind(this, "actType")}>{getOptions(this.state.activityTypes)}</select>
            </div>

            <div className="col2 time">
              <label>Time Spent (hours:minutes)</label>
              <select value={this.selHr} onChange={this.onChangeHandler.bind(this, "hrSpend")}>{getOptions(hours)}</select>
              <select value={this.selMin} onChange={this.onChangeHandler.bind(this, "minSpend")}>{getOptions(minutes)}</select>
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