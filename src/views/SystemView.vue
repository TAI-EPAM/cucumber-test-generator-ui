<template>
  <div id="content-side">
    <app-header/>
    <main class="uui-main-container">
      <div class="app-wrapper">
        <global-errors></global-errors>
        <div class="content-view">
         <router-view></router-view>
        </div>
      </div>
    </main>
    <app-footer></app-footer>
    <vuedal></vuedal>
  </div>
</template>

<script>
  import AppHeader from '../components/ui/AppHeader';
  import AppFooter from '../components/ui/AppFooter';
  import GlobalErrors from '../components/ui/GlobalErrors';
  import Notification from '../components/Notification';
  import EpamButton from '../components/ui/EpamButton';
  import { Component as Vuedal } from '../components/ui/popoup-vuedals';

  export default {
    components: {
      AppHeader,
      AppFooter,
      GlobalErrors,
      Notification,
      EpamButton,
      Vuedal,
    },
    data() {
      return {
        email: null,
      };
    },
    methods: {
    },
    computed: {},
    name: 'SystemView',
  };
</script>

<style lang="less" scoped>
  @import "../assets/vendors/epam-ui/less/uui-colors.less";
  @import "../assets/vendors/epam-ui/less/uui-fonts";

  #content-side {
    height: 100%;
  }
</style>
