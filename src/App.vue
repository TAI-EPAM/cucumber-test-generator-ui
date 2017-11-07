<template>
  <div id="app">
    <app-header></app-header>
    <div class="app-content">
      <router-view/>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AppHeader from './components/ui/AppHeader';
  import AppFooter from './components/ui/AppFooter';

  export default {
    components: {
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
