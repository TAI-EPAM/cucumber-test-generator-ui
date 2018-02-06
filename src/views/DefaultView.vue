<template>
  <div class="wrapper" id="app" :class="selectCssClass()" v-if="dataIsLoaded">
    <aside>
      <app-menu v-if="getActiveProject" />
    </aside>
    <div id="content-side">
      <app-header />
      <main class="uui-main-container">
        <div class="app-wrapper">
          <router-view />
          routerName: {{$route.name}}
        </div>
      </main>
      <app-footer></app-footer>
      <vuedal></vuedal>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AppHeader from '../components/ui/AppHeader';
  import AppFooter from '../components/ui/AppFooter';
  import AppMenu from '../components/ui/AppMenu';
  import { Component as Vuedal } from '../components/ui/popoup-vuedals';
  import AxiosClient from '../utils/httpClient';

  export default {
    components: {
      AppHeader,
      AppFooter,
      AppMenu,
      Vuedal,
    },
    data() {
      return {
        dataIsLoaded: false,
      };
    },
    computed: {
      ...mapGetters(['getUI', 'getActiveProject']),
    },
    methods: {
      selectCssClass() {
        return this.getUI.menuIsOpen ? 'menuIsOpen' : '';
      },
      fetchProjects() {
        AxiosClient.get('/cucumber/projects')
          .then((response) => {
            this.$store.commit('setProjects', { data: response.data });
            this.dataIsLoaded = true;
            console.warn(this.getActiveProject);
          })
          .catch((err) => {
            console.warn(err);
          });
      },
    },
    mounted() {
      this.fetchProjects();
    },
    updated() {
    },
    beforeRouteUpdate(to, from, next) {
      console.warn('1111');
      next();
    },
    name: 'DefaultView',
  };
</script>

<style lang="less" scoped>
  aside {
    display: none;
    width: 0;
    height: 100%;
    float: left;
    background: #464547;
  }
  #content-side {
    position: relative;
    height: 100%;
    overflow: auto;
    background-color: #ffffff;
    margin-left: 0;
    margin-right: 0px;
  }

  header {
    left: 0;
    right: 0;
    width: auto;
  }

  .menuIsOpen {
    aside {
      display: block;
      width: 340px;
      height: 100%;
      float: left;
      background: #464547;
    }
    #content-side {
      position: relative;
      height: 100%;
      overflow: auto;
      background-color: #ffffff;
      margin-left: 340px;
      margin-right: 0px;
    }
    header {
      left: 340px;
    }
  }


</style>
