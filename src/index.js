require('babel-core/register');
require('babel-polyfill');
require('normalize.css');
// require('auto-load');

const App = require('./view/app.vue'),
      Vue = require('vue');

// autoload(__dirname + '/view');

if (window) {
  window.feela = {
    init: function (
        container = 'feela'
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