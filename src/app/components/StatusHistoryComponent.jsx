import React from "react";

class StatusHistoryComponent extends React.Component {
  render() {
    const activities =  this.props.activities.map((activity) =>
		<li key={activity}>{activity}</li>
  	  );
  	
    return (
      <div>
        <ul>{activities}</ul>
      </div>
    );
  }

}

export default StatusHistoryComponent;