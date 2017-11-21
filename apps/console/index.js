'use strict';

const k8s = require('k8s');
const deployment = require('../#shared/deployment.js');
const service = require('../#shared/service.js');

const apiConfig = {
  'endpoint': process.env.ENDPOINT,
  'version': '/api/v1',
  'strictSSL': false,
  'auth': {
    'username': process.env.USERNAME,
    'password': process.env.PASSWORD,
  }
};

const label       = 'web';
const maxReplicas = 5;

//==============================================================================
const apiExtConfig = JSON.parse(JSON.stringify(apiConfig));
apiExtConfig.version = '/apis/extensions/v1beta1';

const api    = k8s.api(apiConfig);
const apiExt = k8s.api(apiExtConfig);

//==============================================================================
function scale(replicas) {
  if (replicas > maxReplicas) throw `Exceeds replicas max number (${maxReplicas})`;

  console.log(`scaling to ${replicas}`);

  const d = new deployment;
  d.spec.replicas = replicas;
  return apiExt.put(`namespaces/default/deployments/${label}`, d)
    .then(data => console.log('scaled successfully'))
    .catch(err => console.log)
}
//==============================================================================
if (process.argv[2] == 'index')
{
  apiExt.get('namespaces/default/deployments')
    .then(data => console.log(data))
    .catch(err => console.log(err));

  apiExt.get('namespaces/default/replicasets')
    .then(data => console.log(data))
    .catch(err => console.log(err));

  api.get('namespaces/default/pods')
    .then(data => console.log(data))
    .catch(err => console.log(err));

  api.get(`namespaces/default/services?labelSelector=run%3D${label}`)
    .then(data => {
      console.log(data);

      const items = data.items;

      items.forEach(i => {
        console.log(i);
        console.log(`public ip = ${i.status.loadBalancer.ingress[0].ip}`);
      });
    })
    .catch(err => console.log(err));
}

//==============================================================================
if (process.argv[2] == 'create') {
  console.log('create deployment');

  apiExt.post('namespaces/default/deployments', deployment())
  .then(data => {
    console.log('deployment created successfully');
    console.log(data);
  })
  .catch(err => console.log(err));

  console.log('create service');

  api.post('namespaces/default/services', service())
  .then(data => {
    console.log('service created successfully');
    console.log(data);
  })
  .catch(err => console.log(err));
}

//==============================================================================
if (process.argv[2] == 'delete') {
  console.log('scaling down (removing pods)');
  scale(0)
    .then(data => {
      console.log('delete deployment');

      apiExt.delete(`namespaces/default/deployments/?labelSelector=run%3D${label}`)
      .then(data => console.log('deployment deleted successfully'))
      .catch(err => console.log(err));

      console.log('delete replicas');

      apiExt.delete(`namespaces/default/replicasets/?labelSelector=run%3D${label}`)
      .then(data => console.log('replicas deleted successfully'))
      .catch(err => console.log(err));

      console.log('delete service');

      api.delete(`namespaces/default/services/${label}`)
      .then(data => console.log('service deleted successfully'))
      .catch(err => console.log(err));
    });
}

//==============================================================================
if (process.argv[2] == 'scale') {
  scale(process.argv[3]);
}
