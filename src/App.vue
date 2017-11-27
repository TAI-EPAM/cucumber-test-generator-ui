<template>
  <div class="wrapper" id="app">
    <app-header />
    <aside>
      <app-menu></app-menu>
    </aside>
    <div class="uui-main-container">
      <main>
        <router-view/>
      </main>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from './components/ui/AppHeader';
  import AppFooter from './components/ui/AppFooter';
  import AppMenu from './components/ui/AppMenu';

  export default {
    components: {
      AppMenu,
      AppHeader,
      AppFooter,
    },
    name: 'app',
  };
</script>

<style lang="less">
  @import "assets/vendors/epam-ui/less/uui-core";

  * {
    box-sizing: border-box;
  }

</style>
