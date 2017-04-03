import React from "react";

import "../scss/addComponent.scss";

class AddDailyStatusComponent extends React.Component {
  constructor(props) {
    super(props);

    // Populate the last 7 days dates
    let datesArr = [];
    for ( let i = 0; i < 7; i++) {
      var date = new Date();
      var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
      datesArr.unshift(last.getDate() + "/" + (last.getMonth() + 1) + "/" + last.getFullYear());
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

    const hoursArr = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
    const minutesArr = ["00", "15", "30", "45"];

    this.state = {
      dateOptions: datesArr,
      projects: projectsArr,
      activityTypes: activityTypeArr,
      hoursArr: hoursArr,
      minutesArr: minutesArr,
      date: datesArr[6],
      project: projectsArr[0],
      actType: activityTypeArr[0],
      hrSpend: hoursArr[8],
      minSpend: minutesArr[0],
      description: ""

    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onAddActivity = this.onAddActivity.bind(this);
  };

  onChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onAddActivity() {
    let myActivity =  { "date": this.state.date,
                          "project": this.state.project,
                          "actType": this.state.actType,
                          "hrSpend": this.state.hrSpend,
                          "minSpend": this.state.minSpend,
                          "description": this.state.description
                        };
    this.props.onCreateActivity(myActivity);
    this.setState({"description": ""});
    this.setDateTime();
  };

  // set Date and Time after adding status
  setDateTime() {
    let actArr = this.props.activities;
    let dateIndex = this.state.dateOptions.indexOf(this.state.date);
    let actDate = this.state.date;
      if (parseInt(this.state.hrSpend) < 8) {
        if (actArr.length) {
          // Check whether the same date added
          let sameDateArr = actArr.filter(function( obj ) {
            return obj.date === actDate;
          });
          let totalHr = 0;
          for (let value of sameDateArr) {
            totalHr += parseInt(value.hrSpend) + parseInt(value.minSpend) / 100;
          }
          totalHr += parseInt(this.state.hrSpend) + parseInt(this.state.minSpend) / 100;
          let totalTimeSpend = this.getTotalTime(totalHr);

          if (totalTimeSpend < 8) {
            let totalTimeArr = String(totalTimeSpend).split(".");
            if (totalTimeArr[1] === "00" ) {
              this.setState({hrSpend: "0" + ( 8 - parseInt (totalTimeArr[0])),
                             minSpend: "00"});
            }
            else {
              this.setState({hrSpend: "0" + ( 7 - parseInt (totalTimeArr[0])),
                             minSpend: 60 - parseInt( totalTimeArr[1])});
            }
          }
          else {
            if (dateIndex !== 6) {
              this.setState({date: this.state.dateOptions[dateIndex + 1],
                           hrSpend: this.state.hoursArr[8],
                           minSpend: this.state.minutesArr[0]});
            }
            else {
              this.setState({hrSpend: this.state.hoursArr[8],
                           minSpend: this.state.minutesArr[0]});
            }
          }
        }
        else {
          this.changeHrMin();
        }
      }
      else { // Reset the time and Change to next date
          this.setState({date: this.state.dateOptions[dateIndex + 1],
                         hrSpend: this.state.hoursArr[8],
                         minSpend: this.state.minutesArr[0]});
      }
  };

  // Set the total number to hr min value
  getTotalTime(time) {
    let timeArr = String(time).split(".");
    if (timeArr.length === 1)
      timeArr.push("00");
    if (timeArr[1].length === 1)
      timeArr[1] = timeArr[1] + "0";
    if (parseInt(timeArr[1]) > 59) {
      var min = parseInt(timeArr[1]);
      var hr = Math.floor(min / 60);
      var hrTemp = Math.floor(parseInt(timeArr[0]));
      var remMin = min % 60;
      let totalTime = Number((hr + hrTemp) + "." + remMin).toFixed(2);
      return totalTime;
    }
    else {
      return time.toFixed(2);
    }
  };

  // Reset the hr min dropdown based on the value
  changeHrMin() {
    if (this.state.minSpend === "00" ) {
      this.setState({hrSpend: "0" + ( 8 - parseInt (this.state.hrSpend))});
    }
    else {
      this.setState({hrSpend: "0" + ( 7 - parseInt (this.state.hrSpend)),
                     minSpend: 60 - parseInt( this.state.minSpend)});
    }
  };

  render() {
    let getOptions = (arraySet) => {
      let options = arraySet.map((item) =>
        <option key={item}>{item}</option>
      );
      return options;
    };

    return (
      <div>
      <h1> Daily Status</h1>
      <div className="addActivityWrapper">
        <p>Bursts</p>
          <div className="colWrapper">
            <div className="col2">
              <label>Date</label>
              <select value={this.state.date} name="date" onChange={this.onChangeHandler}>{getOptions(this.state.dateOptions)}</select>
            </div>

            <div className="col4">
              <label>Project</label>
              <select value={this.state.project} name="project" onChange={this.onChangeHandler}>{getOptions(this.state.projects)}</select>
            </div>

            <div className="col2">
              <label>Activity Type</label>
              <select value={this.state.actType} name="actType" onChange={this.onChangeHandler}>{getOptions(this.state.activityTypes)}</select>
            </div>

            <div className="col2 time">
              <label>Time Spent (hours:minutes)</label>
              <select value={this.state.hrSpend} name="hrSpend" onChange={this.onChangeHandler}>{getOptions(this.state.hoursArr)}</select>
              <select value={this.state.minSpend} name="minSpend" onChange={this.onChangeHandler}>{getOptions(this.state.minutesArr)}</select>
            </div>
          </div>

          <div className="colWrapper">
            <div className="col5">
              <label>Activity Description</label>
              <textarea rows="5" value={this.state.description} name="description" onChange={this.onChangeHandler} maxLength="180" placeholder="Use T# or t# in your description to indicate Redmine ticket/task. For example : T#1234">
              </textarea>
            </div>
            <div className="col5">
              <p>Enter the actual number of hours against each of your project(s). If you're working on multiple projects, submit separate entry for each project. 
                If you're not assigned to a project, select the option "N/A" from Project drop down.
                You should book the time against a project if you are contributing your effort, whether you are allocated or not. If you have been working on the project regularly, ask the PM to formally allocate you.</p>
              <p>Please make sure you're not booking time for organizational (non project) activities like pre-sales, trainings, your non project related self learning activity to any project.</p>
            </div>
          </div>
          <div className="saveBtnDiv">
            <button onClick={this.onAddActivity} disabled={!this.state.description}>Save</button>
          </div>
      </div>
      </div>
    );
  }

}

export default AddDailyStatusComponent;