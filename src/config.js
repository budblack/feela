module.exports = {
  
  assets: {
    terrain: {
      CesiumTerrain7Niu: {
        url                 : 'http://agi.proxy.tool.budblack.me/stk-terrain/world',                                   // 这是一个地形数据服务, 被墙, 需要反代
        requestVertexNormals: true,
        requestWaterMask    : true
      }
    }
  }
};