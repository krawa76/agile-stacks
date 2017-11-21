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

module.exports = {deployment, service}
