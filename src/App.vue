<template>
    <component v-bind:is="viewSelector()"/>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AppLogin from './components/ui/AppLogin';
  import DefaultView from './views/DefaultView';

  export default {
    components: {
      AppLogin,
      DefaultView,
    },
    data() {
      return {
        dataIsLoaded: false,
        menuItems: [],
        currentView: 'AppLogin',
      };
    },
    methods: {
      viewSelector() {
        return this.isAuth ? 'DefaultView' : 'AppLogin';
      },
    },
    computed: {
      ...mapGetters(['isAuth', 'getToken']),
    },
    mounted() {
    },
    update() {
    },
    beforeUpdate() {
    },
    name: 'app',
  };
</script>

<style lang="less">
  @import "assets/css/app";
</style>
