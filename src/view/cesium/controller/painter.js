const comm = require('../../_comm');

const Cesium = require('Cesium/Source/Cesium');
let {eventEmitter: em} = comm.core,
    {cesium} = comm;

module.exports = {
    drawLabelWithDegress({lng, lat, height, text}) {
        em.emit('dev', {msg: '绘制标签'});
        let viewer = viewer || cesium.viewer;

        if (viewer) {
            let scene = feela.cesium.inst.viewer.scene,
                labels = scene.primitives.add(new Cesium.LabelCollection());

            labels.modelMatrix = Cesium
                .Transforms
                .eastNorthUpToFixedFrame(
                    Cesium.Cartesian3.fromDegrees(lng, lat)
                );

            labels.add(
                {
                    position: new Cesium.Cartesian3(0, 0, 0 + height),
                    text: text
                }
            );
        }
    },

    addModel({lng, lat, height, url}) {
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(105, 35, 1000));
        let scene = cesium.viewer.scene;
        let model = scene
            .primitive
            .add(
                Cesium
                    .Model
                    .fromGltf('/assets/model/gltf/obj0828.gltf')
            );
    },

    drawCylinder({
                     length = 200000,
                     topRadius = 80000,
                     bottomRadius = 200000
                 }) {
        let cylinder = new Cesium.CylinderGeometry(
            {
                length,
                topRadius,
                bottomRadius,
            }
        );
        let geometry = Cesium.CylinderGeometry.createGeometry(cylinder);

        this._addPrimitives(geometry);
    },

    drawCircle({lng, lat, r}) {
        let {cesium} = comm,
            {viewer} = cesium,
            {scene} = viewer;
        em.emit('cesium/painter/draw/cricle', {lng, lat, r});
        let cricleInstance = new Cesium.GeometryInstance(
            {
                geometry: new Cesium.CircleGeometry(
                    {
                        center: Cesium
                            .Cartesian3
                            .fromDegrees(lng, lat),
                        radius: 100.0,
                        height: r,
                        vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT
                    }
                ),
                attributes: {
                    color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                        new Cesium.Color(0.4, 0.8, 1, 0.8)
                    )
                }
            }
        );
        this._addPrimitives(cricleInstance);
    },
    _addPrimitives(geometry) {
        let {cesium} = comm,
            {viewer} = cesium,
            {scene} = viewer;
        let primitive = new Cesium.Primitive(
            {
                geometryInstances: [geometry],
                appearance: new Cesium.PerInstanceColorAppearance(
                    {
                        translucent: false,
                        closed: true
                    }
                )
            }
        );
        console.log(primitive);
        scene.primitives.add(primitive);
    }
};