'use strict';

const k8s = require('k8s');
const kubeData = require('../data.js');

const apiConfig = {
  'endpoint': Meteor.settings.ENDPOINT,
  'version': '/api/v1',
  'strictSSL': false,
  'auth': {
    'username': Meteor.settings.USERNAME,
    'password': Meteor.settings.PASSWORD,
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
function _scale(replicas) {
  if (replicas > maxReplicas) throw `Exceeds replicas max number (${maxReplicas})`;

  console.log(`scaling to ${replicas}`);

  const d = new kubeData.deployment();
  d.spec.replicas = replicas;
  return apiExt.put(`namespaces/default/deployments/${label}`, d)
    .then(data => console.log('scaled successfully'))
    .catch(err => console.log);
}

class KubeController {
  async index() {
    try {
      return await apiExt.get('namespaces/default/deployments');
    }
    catch(e) {console.log(e)}
  }

  async create() {
    try {
      // create deployment
      await apiExt.post('namespaces/default/deployments', new kubeData.deployment());
      // create service
      await api.post('namespaces/default/services', new kubeData.service());
    }
    catch(e) {console.log(e)}
  }

  async delete() {
    try {
      // scale down (delete pods)
      await _scale(0);
      // delete deployment
      await apiExt.delete(`namespaces/default/deployments/?labelSelector=run%3D${label}`);
      // delete replicas
      await apiExt.delete(`namespaces/default/replicasets/?labelSelector=run%3D${label}`);
      // delete service
      await api.delete(`namespaces/default/services/${label}`);
    }
    catch(e) {console.log(e)}
  }

  async scale(replicas) {
    try {
      await _scale(replicas);
    }
    catch(e) {console.log(e)}
  }
}

export default KubeController;
