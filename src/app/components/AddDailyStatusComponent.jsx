import React from "react";

class AddDailyStatusComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity : "Sample"
    };
  }

  onAddActivity() {
      if (this.state.activity !== "") {
        let myActivity =  this.state.activity;
        console.log("ddddd", myActivity);
        this.props.onCreateActivity(myActivity);
        this.refs.actInput.value = "";
        this.setState({activity: ""});
      }
  };

  onInputChange(event) {
    this.setState({activity: event.target.value});
  };

  render() {
    return (
      <div>
        <input placeholder="Add an activity"  onChange={this.onInputChange.bind(this)} ref="actInput" type="text"/>
        <button onClick={this.onAddActivity.bind(this)}>Add Daily Status</button>
      </div>
    );
  }

}

export default AddDailyStatusComponent;