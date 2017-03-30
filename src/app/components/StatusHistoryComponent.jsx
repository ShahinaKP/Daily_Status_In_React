import React from "react";

import "../scss/historyComponent.scss";

class StatusHistoryComponent extends React.Component {
  render() {
    const listItems = this.props.activities.map((item) =>
        <li>
            <div className="col2">
                <span>end-of-day</span>
                <span>{item.date}</span>
            </div>

            <div className="col6">
               <span>
                    <strong>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</strong>
                </span>
            </div>

            <div className="col2 right">
                <span>{item.timeSpend} hour(s)</span>
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