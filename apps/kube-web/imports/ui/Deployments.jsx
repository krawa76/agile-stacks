//todo date format: (new Date('2017-11-22T02:42:33Z')).format('d-m-Y h:m:s')

'use strict';

import React from 'react';

export default class Deployments extends React.Component {
  render() {
    return (
      <div>
        <h3>Deployments</h3>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">name</th>
              <th scope="col">created at</th>
              <th scope="col">replicas (ready/declared)</th>
              <th scope="col">labels</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.items.map((item, index) =>
              <tr key={index}>
                <td>{item.metadata.name}</td>
                <td>{item.metadata.creationTimestamp}</td>
                <td>{item.status.readyReplicas}/{item.status.replicas}</td>
                <td>{JSON.stringify(item.metadata.labels)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
