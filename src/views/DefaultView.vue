<template>
  <div class="wrapper" id="app" :class="selectCssClass()" v-if="dataIsLoaded">
    <aside>
      <project-menu v-if="(getActiveProject)&&(!this.$store.state.startTestRun)"></project-menu>
      <test-run-menu v-if="this.$store.state.startTestRun"></test-run-menu>
    </aside>
    <div id="content-side">
      <app-header />
      <main class="uui-main-container">
        <div class="app-wrapper">
          <global-errors></global-errors>
          <div class="content-view" >
            <router-view />
          </div>
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
  import { Component as Vuedal } from '../components/ui/popoup-vuedals';
  import ProjectMenu from '../components/project-menu/ProjectMenu';
  import GlobalErrors from '../components/ui/GlobalErrors';
  import TestRun from '../components/ui/TestRun';
  import TestRunMenu from "../components/test run components/TestRunMenu";

  export default {
    components: {
      TestRunMenu,
      TestRun,
      GlobalErrors,
      AppHeader,
      AppFooter,
      Vuedal,
      ProjectMenu,
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
        this.$store.dispatch('getProjectsAsync')
          .then(() => {
            this.dataIsLoaded = true;
          });
        this.dataIsLoaded = true;
      },
    },
    mounted() {
      this.fetchProjects();
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
    background: #373838;
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
    & aside {
      display: block;
      width: 340px;
      height: 100%;
      float: left;
    }
    & #content-side {
      position: relative;
      height: 100%;
      overflow: auto;
      background-color: #ffffff;
      margin-left: 340px;
      margin-right: 0px;
    }
    & header {
      left: 340px;
    }
  }
</style>
