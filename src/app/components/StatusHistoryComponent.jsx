import React from "react";

import "../scss/historyComponent.scss";

class StatusHistoryComponent extends React.Component {
  render() {
    const activities =  this.props.activities.map((activity) =>
      <li key={activity}>{activity}</li>
    );
    return (
      <div className="activityListWrapper">
        <ul>{activities}</ul>
      </div>
    );
  }

}

export default StatusHistoryComponent;