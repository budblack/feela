<template>
    <div class="feela">
        <keep-alive>
            <transition name="fade" mode="out-in">
                <component :is="currentView"></component>
            </transition>
        </keep-alive>
    </div>
</template>
<style lang="less">
    .feela {
        height: 100%;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>
<script lang="js">
	const ModuleCesium = require('./cesium/index.vue');

    let vm = {
      currentView: 'cesium'
    };

    module.exports            = {
      data(){
        return vm;
      },
      components: {
        'cesium': ModuleCesium
      },
      mounted   : function () {
        /**
         * 依次初始化各个顶层模块
         * 各个模块 require 一次
         */
        require('./_comm');
        require('./_event');

      },
      beforeRouteEnter (to, from, next) {
        next();
      }
    };
    module.exports.exportAPIs = {
      cesium: ModuleCesium.exportAPI
    };
</script>
