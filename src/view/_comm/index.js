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
  ui    : {
    layer,
    toastr
  },
  core  : {
    hamsters,
    eventEmitter: {
      emit: (event, data) => {
        console.log({ msg: '发射事件', event, data });
        toastr.info(`发射事件 [${event}]:${JSON.stringify(data || {})}`);
        eventEmitter.emit(event, data);
      },
      on  : (event, callback) => {
        console.log({ msg: '监听事件', event: callback.toString() });
        toastr.info(`监听事件 [${event}]`);
        eventEmitter.on(event, callback);
      }
    }
  },
  cesium: {
    viewer: null
  }
};