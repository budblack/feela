<template>
    <div>
        <div id="cesiumContainer">
        </div>
    </div>
</template>
<style lang="less" module>
    body {
        margin: 0;
    }

    canvas {
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
	window.CESIUM_BASE_URL = './Cesium/';

    require('Cesium/Source/Widgets/widgets.css')
    
    const Cesium = require('Cesium/Source/Cesium'),
        config = require('../../config')

    export default {
      data(){
        return {}
      },
      methods  : {
        initCesiumModule: function () {
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

          let viewer = new Cesium.Viewer(
              cesium_viewer_container,
              cesium_viewer_option
          );
          viewer.camera.flyTo(
              {
                destination: Cesium.Cartesian3.fromDegrees(105.25, 26.5, 5000.0),
                orientation: {
                  heading: Cesium.Math.toRadians(175.0),
                  pitch  : Cesium.Math.toRadians(-35.0),
                  roll   : 0.0
                }
              }
          );
          viewer._cesiumWidget._creditContainer.style.display = 'none';
        }
      },
      mounted  : function () {
        try {
          this.initCesiumModule();
        }
        catch (e) {}
      },
      beforeRouteEnter (to, from, next) {
        next();
      },
      exportAPI: require('./controller')
    }


</script>
