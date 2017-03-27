import React from 'react';
import {render} from 'react-dom';

import AddDailyStatusComponent from './components/AddDailyStatusComponent.jsx';

class App extends React.Component {
  render () {
    return (
    	<div>
    		<p> Daily Status</p>
    		<AddDailyStatusComponent/>
		</div>
	);
  }
}

render(<App/>, document.getElementById('app'));