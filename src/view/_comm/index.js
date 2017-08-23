import 'events';

const EventEmitter = require('events').EventEmitter,
      layer        = require('layui-layer'),
      toastr       = require('toastr'),
      toastrcss    = require('toastr/build/toastr.min.css'),
      hamsters     = require('hamsters.js');

const eventEmitter = new EventEmitter(),
      startOptions = {
        maxThreads : 3,
        cache      : true,
        debug      : true,
        persistence: true
      };

hamsters.init(startOptions);

module.exports = {
  UI  : {
    layer,
    toastr
  },
  core: {
    hamsters,
    eventEmitter
  }
};