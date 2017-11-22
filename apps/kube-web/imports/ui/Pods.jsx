'use strict';

import React from 'react';

export default class Pods extends React.Component {
  render() {
    return (
      <div>
        <h3>Pods</h3>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">name</th>
              <th scope="col">created at</th>
              <th scope="col">status</th>
              <th scope="col">pod ip</th>
              <th scope="col">labels</th>
            </tr>
          </thead>
          <tbody>
            {this.props.data.items.map((item, index) =>
              <tr key={index}>
                <td>{item.metadata.name}</td>
                <td>{item.metadata.creationTimestamp}</td>
                <td>{item.status.phase}</td>
                <td>{item.status.podIP}</td>
                <td>{JSON.stringify(item.metadata.labels)}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
