<template>
        <div id="cesiumContainer" :class="$style.cesiumContainer"></div>
</template>
<style lang="less" module>
    .cesiumContainer {
        border: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    .cesiumContainer > canvas {
        border: none;
        cursor: pointer;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
        /*background: #f1f1f1;*/
    }
</style>
<script>
  require('Cesium/Source/Widgets/widgets.css');
  const Cesium = require('Cesium/Source/Cesium'),
      comm = require('../_comm'),
      config = require('../../config'),
      { core, ui } = comm,
      { eventEmitter: em } = core;

  if (window.CESIUM_BASE_URL == undefined) {
    window.CESIUM_BASE_URL = './Cesium/';
  }
  window.Cesium = Cesium;

  let inst = {
    viewer: null,
  };

  export default {
    data(){
      return {}
    },
    methods  : {
      /**
       *
       * @param {{}} viewer Cesium 视图对象
       */
      initHandles     : async function (viewer) {
        /******************************************************************
         * 屏幕区域事件 Handle
         ******************************************************************/
        /**
         * @type {*} 屏幕事件句柄
         */
        const screenSpaceEventHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        /**
         * setInputAction. Set a function to be executed on an input event.
         * But I dont know what the 'INPUT EVENT' means to.
         *
         * By the way, I only going to transfer events to app inside event bus without any meaninful process.
         */
        screenSpaceEventHandler.setInputAction(function (movement) {
          let windowPosition       = viewer.camera.getPickRay(movement.position),
              cartesianCoordinates = viewer.scene.globe.pick(windowPosition, viewer.scene),
              cartoCoordinates     = {};
          if (cartesianCoordinates) {
            cartoCoordinates = Cesium.Cartographic.fromCartesian(cartesianCoordinates)

            let lng    = Cesium.Math.toDegrees(cartoCoordinates.longitude),
                lat    = Cesium.Math.toDegrees(cartoCoordinates.latitude),
                height = Cesium.Math.toDegrees(cartoCoordinates.height);

            movement.wgs = { lng, lat, height };

            em.emit('cesium/screen/input', movement);
          }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
      },
      initCesiumModule: async function () {
        let cesium_viewer_container = 'cesiumContainer',
            cesium_viewer_option    = {
              animation         : false, //动画控制，默认true
              fullscreenButton  : true,//全屏按钮,默认显示true
              geocoder          : false,//地名查找,默认true
              timeline          : false,//时间线,默认true
              vrButton          : true,//双屏模式,默认不显示false
              homeButton        : true,//主页按钮，默认true
              infoBox           : false,//点击要素之后显示的信息,默认true
              selectionIndicator: true,//选中元素显示,默认true
              baseLayerPicker   : false,
              imageryProvider   : new Cesium.BingMapsImageryProvider(
                  {
                    url     : 'https://dev.virtualearth.net',
                    key     : 'Ary1KHQ-df1nT8n6-YCSuBuJ0Vb8QphijrDRuNuaKQBnUGlyj52DE3deZATn9w8h',
                    mapStyle: Cesium.BingMapsStyle.AERIAL
                  }
              ),
              //                imageryProvider   : new Cesium.WebMapServiceImageryProvider(
              //                    {
              //                      url    : 'http://www.scgis.net.cn/imap/iMapServer/defaultRest/services/newtianditudom/WMS',
              //                      layers : '聚合天地图DOM瓦片地图服务',
              //                      version: '1.3.0'
              //                    }
              //                ),
              //                imageryProvider   : new Cesium.WebMapTileServiceImageryProvider(
              //                    {
              //                      url             : 'http://t0.tianditu.com/img_w/wmts?',
              //                      layer           : "img",
              //                      style           : 'default',
              //                      format          : 'titles',
              //                      titleMatrixSetID: 'w',
              //                      credit          : new Cesium.Credit('天地图全球影像服务'),
              //                      maximumLevel    : 18
              //                    }
              //                ),
              terrainProvider   : new Cesium.CesiumTerrainProvider(config.assets.terrain.CesiumTerrain7Niu)
            };

        let viewer  = new Cesium.Viewer(
            cesium_viewer_container,
            cesium_viewer_option
        );
        inst.viewer = viewer;
        comm.cesium = inst;

        viewer._cesiumWidget._creditContainer.style.display = 'none';
        return viewer;
      },
    },
    mounted  : async function () {
      try {
        let viewer = await this.initCesiumModule();
        await this.initHandles(viewer)
      }
      catch (e) {}
      finally {
        em.emit('cesium/core/init');
      }
    },
    beforeRouteEnter (to, from, next) {
      next();
    },
    exportAPI: {
      controller: require('./controller'),
      inst      : inst
    }
  }
</script>
