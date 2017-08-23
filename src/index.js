require('babel-core/register');
require('babel-polyfill');
require('normalize.css');

import Vue from 'vue';
const App = require('./view/app.vue');

if (window) {
  window.BS = {
    Init: function (
        container = 'bscontainer'
    ) {
      return new Promise(function (resolve, reject) {
        new Vue(
            {
              el    : '#' + container,
              render: h => h(App)
            }
        );
        resolve(App.exportAPIs);
        window.feela = App.exportAPIs;
      });
    }
  };
}