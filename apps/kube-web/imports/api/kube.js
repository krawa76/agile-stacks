// https://docs.meteor.com/api/methods.html

'use strict';

import {Meteor} from 'meteor/meteor';

export const Kube = {};

if (Meteor.isServer) {
  Meteor.methods({
    test(text) {
      console.log(`test method: ${text}`);
      return 'result';
    }
  });
}
