'use strict';

function deployment() {
  return {
    apiVersion: 'extensions/v1beta1',
    kind: 'Deployment',
    metadata: {
      name: 'web'
    },
    spec: {
      replicas: 2,
      template: {
        metadata: {
          labels: {
            run: 'web'
          }
        },
        spec: {
          containers: [{
            name: 'web',
            image: 'krawa/as-web',
            ports: [{
              containerPort: 3000,
              name: 'http',
              protocol: 'TCP'
              }]
            }]
        }
      }
    }
  }
}

module.exports = deployment;
