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
class KubeController {
  async index() {
    //console.log(new kubeData.deployment());
    return await apiExt.get('namespaces/default/deployments');
  }
}

export default KubeController;
