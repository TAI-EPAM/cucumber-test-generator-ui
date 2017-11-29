<template>
  <div class="wrapper" id="app">
    <app-header />
    <aside>
      <app-menu v-if="dataIsLoaded" :items="menuItems"></app-menu>
    </aside>
    <main class="uui-main-container">
      <div class="app-wrapper">
        <router-view/>
      </div>
    </main>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import AxiosClient from '@/utils/httpClient';
  import AppHeader from './components/ui/AppHeader';
  import AppFooter from './components/ui/AppFooter';
  import AppMenu from './components/ui/AppMenu';

  export default {
    components: {
      AppMenu,
      AppHeader,
      AppFooter,
    },
    data() {
      return {
        dataIsLoaded: false,
        menuItems: [],
      };
    },
    methods: {
      fetchData() {
        AxiosClient.get('/cucumber/suits/')
          .then((response) => {
            this.$store.setSuits(response.data);
            this.menuItems = this.$store.getSuits();
            this.dataIsLoaded = true;
          })
          .catch(() => {
          });
      },
    },
    mounted() {
      this.fetchData();
    },
    name: 'app',
  };
</script>

<style lang="less">
  @import "assets/css/app";
</style>
