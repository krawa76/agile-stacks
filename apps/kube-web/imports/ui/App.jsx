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
    this.createClick = this.createClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.scaleClick = this.scaleClick.bind(this);

    this.refreshKube();
  }

  refreshKube() {
    Meteor.call('kube.index', (error, result) => {
      this.setState({test: result.kind});
    });
  }

  createKube() {
    Meteor.call('kube.create', (error, result) => {})
  }

  deleteKube() {
    Meteor.call('kube.delete', (error, result) => {})
  }

  scaleKube() {
    Meteor.call('kube.scale', 1, (error, result) => {});
  }

  refreshClick() {this.refreshKube()}
  createClick()  {this.createKube()}
  deleteClick()  {this.deleteKube()}
  scaleClick()   {this.scaleKube()}

  render() {
    return (
      <div className="container">
        <header>
          <h1>Agile Stacks. Kubernetes API demo</h1>
        </header>

        <div>
          <button onClick={this.refreshClick}>Refresh</button>
          <div>test = {this.state.test}</div>
          <button onClick={this.createClick}>Create</button>
          <button onClick={this.deleteClick}>Delete</button>
          <button onClick={this.scaleClick}>Scale</button>
        </div>
      </div>
    );
  }
}
