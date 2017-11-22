// https://docs.meteor.com/api/methods.html

'use strict';

import {Meteor} from 'meteor/meteor';
import KubeController from './KubeController';

export const Kube = {};

const ctl = new KubeController();

if (Meteor.isServer) {
  Meteor.methods({
    'kube.index'() {return ctl.index()},
    'kube.create'() {ctl.create()},
    'kube.delete'() {ctl.delete()},
    'kube.scale'(replicas) {ctl.scale(replicas)}
  });
}
