const comm = require('../../_comm');

const Cesium             = require('Cesium/Source/Cesium');
let { eventEmitter: em } = comm.core,
      { cesium }         = comm,
      viewer             = null,
      labels             = null;

module.exports = {
  drawLabelWithDegress({ lng, lat, height, text }){
    em.emit('dev', { msg: '绘制标签' });
    let viewer = viewer || cesium.viewer;
    
    if (viewer) {
      let scene  = feela.cesium.inst.viewer.scene,
          labels = scene.primitives.add(new Cesium.LabelCollection());
      
      labels.modelMatrix = Cesium
          .Transforms
          .eastNorthUpToFixedFrame(
              Cesium.Cartesian3.fromDegrees(lng, lat)
          );
      
      labels.add(
          {
            position: new Cesium.Cartesian3(0, 0, 6400000 + height),
            text    : text
          }
      );
    }
  }
};