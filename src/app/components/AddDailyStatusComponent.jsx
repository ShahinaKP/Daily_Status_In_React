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
      let day = new Date(curr.setDate(last + i));
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

    const hoursArr = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16"];
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
      hrSpend: hoursArr[7],
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
    if (dateIndex !== 6) {
      if (parseInt(this.state.hrSpend) < 8) {
        if (actArr.length) {
          if (actArr[0].date === this.state.date) {
            let totoalHr = parseInt(actArr[0].hrSpend) + parseInt(this.state.hrSpend);
            let totoalMin = parseInt(actArr[0].minSpend) + parseInt(this.state.minSpend);
            if (totoalMin === 60) {
              totoalHr++;
              totoalMin = "00";
            }

            if (totoalHr < 8) {
              let tempHr = "0" + totoalHr;
              let tempMin = totoalMin;

              if (tempMin === "00" ||  tempMin === 0) {
                this.setState({hrSpend: "0" + ( 8 - parseInt (tempHr))});
              }
              else {
                this.setState({hrSpend: "0" + ( 7 - parseInt (tempHr)),
                               minSpend: 60 - parseInt( tempMin)});
              }
            }
            else {
              this.setState({date: this.state.dateOptions[dateIndex + 1],
                             hrSpend: this.state.hoursArr[7],
                             minSpend: this.state.minutesArr[0]});
            }
          }
          else {
            this.changeHrMin();
          }
        }
        else {
          this.changeHrMin();
        }
      }
      else {
        this.setState({date: this.state.dateOptions[dateIndex + 1]});
      }
    }
    else {
      this.setState({hrSpend: this.state.hoursArr[7],
                     minSpend: this.state.minutesArr[0]});
    }
  };

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