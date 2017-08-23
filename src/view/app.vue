<template>
    <div
            id="bscontainer"
            class="gray-bg"
    >
        <keep-alive>
            <transition name="fade" mode="out-in">
                <component :is="currentView"></component>
            </transition>
        </keep-alive>
    </div>
</template>
<style lang="less">
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }

    .fade-enter, .fade-leave-to {
        opacity: 0
    }
</style>
<script>
	const ModuleCesium = require('./cesium/index.vue')

    let vm = {
      currentView: 'cesium'
    };

    module.exports = {
      data(){
        return vm;
      },
      components: {
        'cesium': ModuleCesium
      },
      mounted   : function () {

      },
      beforeRouteEnter (to, from, next) {
        next();
      }
    }
    module.exports.exportAPIs = {
      cesium: ModuleCesium.exportAPI
    }
</script>
