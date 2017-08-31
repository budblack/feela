const comm = require('../../_comm');

const Cesium = require('Cesium/Source/Cesium');
let {eventEmitter: em} = comm.core,
    {cesium} = comm;

module.exports = {
    drawLabelWithDegress({lng, lat, height, text}) {
        em.emit('dev', {msg: '绘制标签'});
        let scene = feela.cesium.inst.viewer.scene,
            labels = scene.primitives
                .add(new Cesium.LabelCollection());
        labels.modelMatrix = Cesium
            .Transforms
            .eastNorthUpToFixedFrame(
                Cesium.Cartesian3.fromDegrees(
                    lng,
                    lat,
                    height
                )
            );
        labels.add(
            {
                position: new Cesium.Cartesian3(
                    (
                        0, 0, 0
                    )),
                text: text
            });
    },

    addModel({lng, lat, height, url}) {

        let {cesium} = comm,
            {viewer} = cesium,
            {scene} = viewer;
        let modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(
            Cesium.Cartesian3.fromDegrees(lng, lat, -1020)
        );
        let seta = 3.14 / 3;
        let rotaleMatrix = Cesium.Matrix4
                .fromArray(
                    [
                        Math.cos(seta), -1 * Math.sin(seta), 0, 0,
                        Math.sin(seta), Math.cos(seta), 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, 1
                    ]
                ),
            panMatrix = Cesium.Matrix4
                .fromArray(
                    [
                        1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        300, 100, -200, 1
                    ]
                ),
            resultMatrix = [];
        Cesium.Matrix4.multiply(modelMatrix, rotaleMatrix, resultMatrix);
        Cesium.Matrix4.multiply(resultMatrix, panMatrix, resultMatrix);
        console.log({modelMatrix, rotaleMatrix, resultMatrix});
        // modelMatrix[0] = modelMatrix[0] * Math.cos(seta);
        // modelMatrix[1] = modelMatrix[1] * Math.sin(seta) * -1;
        // modelMatrix[4] = modelMatrix[4] * Math.sin(seta);
        // modelMatrix[5] = modelMatrix[5] * Math.cos(seta);

        var model = scene.primitives.add(Cesium.Model.fromGltf(
            {
                url: '/assets/model/gltf/obj0828.gltf',
                modelMatrix: resultMatrix,
                scale: 1.0,
                rotale: 90
            }
        ));

    },

    drawCylinder({
                     lng, lat, height, r, z
                 }) {
        let cylinder = new Cesium.CylinderGeometry(
            {
                length: z,
                topRadius: r,
                bottomRadius: r,
            }
        );
        let instance = new Cesium.GeometryInstance({
            geometry: cylinder,
            modelMatrix: Cesium.Matrix4
                .multiplyByTranslation(
                    Cesium.Transforms
                        .eastNorthUpToFixedFrame(
                            Cesium.Cartesian3
                                .fromDegrees(lng, lat, height)),
                    new Cesium.Cartesian3(lng, lat, height),
                    new Cesium.Matrix4()
                ),
            id: 'cylinder',
            attributes: {
                color: new Cesium.GeometryInstanceAttribute({
                    componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
                    componentsPerAttribute: 4,
                    normalize: true,
                    value: [102, 124, 255, 0.8]
                })
            }
        });
        this._addPrimitives(instance);
    },

    drawBox({lng, lat, height, x, y, z}) {
        let instance = new Cesium.GeometryInstance({
            geometry: Cesium.BoxGeometry.fromDimensions({
                dimensions: new Cesium.Cartesian3(x, y, z)
            }),
            modelMatrix: Cesium.Matrix4
                .multiplyByTranslation(
                    Cesium.Transforms
                        .eastNorthUpToFixedFrame(
                            Cesium.Cartesian3
                                .fromDegrees(lng, lat)),
                    new Cesium.Cartesian3(lng, lat, height),
                    new Cesium.Matrix4()
                ),
            id: 'box',
            attributes: {
                color: new Cesium.GeometryInstanceAttribute({
                    componentDatatype: Cesium.ComponentDatatype.UNSIGNED_BYTE,
                    componentsPerAttribute: 4,
                    normalize: true,
                    value: [255, 255, 0, 255]
                })
            }
        });
        this._addPrimitives(instance);
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

    createModel({}) {

    },

    _createInstance({geometry}) {
        let instance = new Cesium.GeometryInstance(
            {
                geometry,
                attributes: {
                    color: Cesium.ColorGeometryInstanceAttribute.fromColor(
                        new Cesium.Color(0.4, 0.8, 1, 0.8)
                    )
                },

            }
        );

        return instance;
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