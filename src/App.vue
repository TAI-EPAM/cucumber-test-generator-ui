<template>
  <div id="app">
    <app-header></app-header>
    <div class="app-content">
      <app-menu></app-menu>
      <router-view/>
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

<style lang="scss">
	@import 'assets/css/variables.scss';
	@import 'assets/css/app.scss';
</style>
