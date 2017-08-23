const comm = require('../../_comm');

let { eventEmitter: em } = comm.core;

module.exports = {
  
  drawLabel(){
    em.emit('dev', { msg: '绘制标签' });
    
    console.log('绘制标签');
  }
};