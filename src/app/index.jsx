import React from "react";
import {render} from "react-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import AddDailyStatusComponent from "./components/AddDailyStatusComponent.jsx";
import StatusHistoryComponent from "./components/StatusHistoryComponent.jsx";


import "./scss/addComponent.scss";

class App extends React.Component {
   constructor() {
     super();
     this.state = {
       activities: []
      };
   }

   activityLisiting(activity) {
     this.setState({activities: this.state.activities.concat([activity])});
   };


   render () {
     return (
		<div>
			<Header />
			<AddDailyStatusComponent onCreateActivity={this.activityLisiting.bind(this)}/>
			<StatusHistoryComponent activities={this.state.activities}/>
      <Footer />
		</div>
		);
  }
}

render(<App/>, document.getElementById("app"));