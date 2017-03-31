import React from "react";

import "../scss/historyComponent.scss";

class StatusHistoryComponent extends React.Component {
  render() {
    const listItems = this.props.activities.map((item, i) =>
        <li key={i}>
            <div className="col2">
                <span>end-of-day</span>
                <span>{item.date}</span>
            </div>

            <div className="col6">
               <span>
                    <strong>{item.description}</strong>
                </span>
            </div>

            <div className="col2 right">
                <span>{item.hrSpend}:{item.minSpend} hour(s)</span>
                <span>{item.actType}</span>
                <span>{item.project}</span>
            </div>
        </li>
    );

    return (
      <div className="activityListWrapper">
        <ul>
          {listItems}
        </ul>
      </div>
    );

  }

}

export default StatusHistoryComponent;