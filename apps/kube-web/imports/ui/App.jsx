'use strict';

import React from 'react';
import {Meteor} from 'meteor/meteor';

//import {Kube} from '../api/kube.js'; -- stubs
import Deployments from './Deployments';
import ReplicaSets from './ReplicaSets';
import Pods from './Pods';
import Services from './Services';

const KUBE_REFRESH_TIMEOUT = 3000;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      replicas: 1,
      kube: null,
    };
    this.refreshClick = this.refreshClick.bind(this);
    this.createClick = this.createClick.bind(this);
    this.deleteClick = this.deleteClick.bind(this);
    this.scaleClick = this.scaleClick.bind(this);
    this.replicasChange = this.replicasChange.bind(this);

    this.refreshKube();
  }

  refreshKube() {
    Meteor.call('kube.index', (error, result) => {
      console.log(result);
      this.setState({kube: result});
    });
  }

  createKube() {
    Meteor.call('kube.create', (error, result) => {
      setTimeout(() => {this.refreshKube()}, KUBE_REFRESH_TIMEOUT);
    })
  }

  deleteKube() {
    Meteor.call('kube.delete', (error, result) => {
      setTimeout(() => {this.refreshKube()}, KUBE_REFRESH_TIMEOUT);
    })
  }

  scaleKube() {
    Meteor.call('kube.scale', this.state.replicas, (error, result) => {
      setTimeout(() => {this.refreshKube()}, KUBE_REFRESH_TIMEOUT);
    });
  }

  refreshClick() {this.refreshKube()}
  createClick()  {this.createKube()}
  deleteClick()  {this.deleteKube()}
  scaleClick()   {this.scaleKube()}

  replicasChange(event) {
    this.setState({replicas: event.target.value});
  }

  render() {
    let externalIP = null;
    try {
      externalIP = this.state.kube.services.items[0].status.loadBalancer.ingress[0].ip;
    }
    catch(e) {}

    const appURL = `http://${externalIP}`;

    return (
      <div className="container">
        <header>
          <h1>Agile Stacks. Kubernetes API demo</h1>
        </header>

        {this.state.kube &&
          <div>
            <button className="btn btn-outline-primary" onClick={this.refreshClick}>Refresh</button>
            {this.state.kube.deployments.items.length == 0 &&
              <button className="btn btn-primary" onClick={this.createClick}>Create deployment</button>
            }
            {this.state.kube.deployments.items.length > 0 &&
              <button className="btn btn-danger" onClick={this.deleteClick}>Delete deployment</button>
            }
            {this.state.kube.deployments.items.length > 0 &&
              <div className="form-inline" style={{float: 'right'}}>
                <label className="mr-sm-2">Replicas</label>
                <select className="custom-select mb-2 mr-sm-2 mb-sm-0" value={this.state.replicas} onChange={this.replicasChange}>
                  {[1, 2, 3, 4, 5].map((value, index) =>
                    <option key={index} value={value}>{value}</option>
                  )}
                </select>

                <button className="btn btn-primary" onClick={this.scaleClick}>Scale</button>
              </div>
            }

            {this.state.kube.deployments.items.length > 0 &&
              <div className="web-app">
                <a href={appURL} target="_blank">
                Show web application {externalIP ? '' : '(IP pending)'}
                </a>
              </div>
            }

            <hr/>

            <div>
              <Deployments data={this.state.kube.deployments}/>
              <ReplicaSets data={this.state.kube.replicaSets}/>
              <Pods data={this.state.kube.pods}/>
              <Services data={this.state.kube.services}/>
            </div>
          </div>
        }
      </div>
    );
  }
}
