import React from 'react';

class AddDailyStatusComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {addCount : 0};
    this.onAdd = this.onAdd.bind(this);
  }

  onAdd () {
    let newAddCount = this.state.addCount + 1;
    this.setState({addCount: newAddCount});
  }

  render() {
    return (
      <div>        
        <div><button onClick={this.onAdd}>Add Daily Status</button></div>
        Add : <span>{this.state.addCount}</span>
      </div>
    );
  }

}

export default AddDailyStatusComponent;