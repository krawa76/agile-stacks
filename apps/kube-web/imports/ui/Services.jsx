'use strict';

import React from 'react';

export default class Services extends React.Component {
  render() {
    return (
      <div>
        <h3>Services</h3>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">name</th>
              <th scope="col">created at</th>
              <th scope="col">type</th>
              <th scope="col">cluster ip</th>
              <th scope="col">external ip</th>
              <th scope="col">labels</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.items.map((item, index) =>
              <tr key={index}>
                <td>{item.metadata.name}</td>
                <td>{item.metadata.creationTimestamp}</td>
                <td>{item.spec.type}</td>
                <td>{item.spec.clusterIP}</td>
                <td>{item.status.loadBalancer.ingress ? item.status.loadBalancer.ingress[0].ip : '(pending)'}</td>
                <td>{JSON.stringify(item.metadata.labels)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
