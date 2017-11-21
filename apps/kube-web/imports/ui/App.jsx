'use strict';

import React from 'react';
import {Meteor} from 'meteor/meteor';

//import {Kube} from '../api/kube.js'; -- stubs

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'init'
    };
    this.refreshClick = this.refreshClick.bind(this);

    this.refreshData();
  }

  refreshData() {
    Meteor.call('kube.index', (error, result) => {
      this.setState({test: result.kind});
    });
  }

  refreshClick() {
    this.refreshData();
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Agile Stacks. Kubernetes API demo</h1>
        </header>

        <div>
          <button onClick={this.refreshClick}>Refresh</button>
          <div>test = {this.state.test}</div>
        </div>
      </div>
    );
  }
}
