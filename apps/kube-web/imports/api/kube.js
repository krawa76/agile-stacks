// https://docs.meteor.com/api/methods.html

'use strict';

import {Meteor} from 'meteor/meteor';
import KubeController from './KubeController';

export const Kube = {};

const ctl = new KubeController();

//==============================================================================
const k8s = require('k8s');
//const deployment = require('../../../#shared/deployment.js');
//const service = require('../#shared/service.js');

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

const apiExt = k8s.api(apiExtConfig);

if (Meteor.isServer) {
  Meteor.methods({
    'kube.index'() {
      /*
      const fut = new Future();

      apiExt.get('namespaces/default/deployments')
        .then(data => {
          console.log(data);
          fut['return'](data);
        })
        .catch(err => console.log(err));

      return fut.wait();
      */
      return ctl.index();
    }
  });
}
