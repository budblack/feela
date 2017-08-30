const comm = require('../../_comm');

const Cesium             = require('Cesium/Source/Cesium');
let { eventEmitter: em } = comm.core,
      { cesium }         = comm;

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
            position: new Cesium.Cartesian3(0, 0, 0 + height),
            text    : text
          }
      );
    }
  },
  
  addModel({ lng, lat, height, url }){
    let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
        Cesium.Cartesian3.fromDegrees(105, 35, 1000));
    let scene       = cesium.viewer.scene;
    let model       = scene
        .primitive
        .add(
            Cesium
                .Model
                .fromGltf('/assets/model/gltf/obj0828.gltf')
        );
  },
  
  drawRect({ lng, lat, r }){
    let { cesium } = comm,
        { viewer } = cesium;
    em.emit('cesium/painter/draw/cricle', { lng, lat, r });
    
    let cricleInstance = new Cesium.GeometryInstance(
        {
          geometry  : new Cesium.CircleGeometry(
              {
                center      : Cesium
                    .Cartesian3
                    .fromDegrees(lng, lat),
                radius      : 250000.0,
                vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
              }
          ),
          attributes: {
            color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                new Cesium.Color(1.0, 0.0, 0.0, 0.5)
            ),
            id   : 'circle'
          }
        }
    );
    let primitive      = new Cesium.Primitive(
        {
          geometryInstances: [cricleInstance],
          appearance       : new Cesium.PerInstanceColorAppearance(
              {
                translucent: false,
                closed     : true
              }
          )
        }
    );
    console.log(primitive);
    viewer.scene.primitives.add(primitive);
  }
};