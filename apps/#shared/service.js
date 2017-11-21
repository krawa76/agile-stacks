'use strict';

function service() {
  return {
    apiVersion: 'v1',
    kind: 'Service',
    metadata: {
      name: 'web',
      labels: {
        run: 'web'
      }
    },
    spec: {
      type: 'LoadBalancer',
      ports: [{
        port: 80,
        targetPort: 3000,
        name: 'http',
        protocol: 'TCP'
      }],
      selector: {
        run: 'web'
      }
    }
  }
}

module.exports = service;
