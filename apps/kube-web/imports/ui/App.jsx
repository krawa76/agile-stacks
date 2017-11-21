'use strict';

import React from 'react';
import {Meteor} from 'meteor/meteor';

//import {Kube} from '../api/kube.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.testButton = this.testButton.bind(this);
  }

  testButton() {
    Meteor.call('test', 'asdfasdf', (error, result) => {
      console.log(result);
    });
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Agile Stacks. Kubernetes API demo</h1>
        </header>

        <div>
          <button onClick={this.testButton}>Test</button>
        </div>
      </div>
    );
  }
}
