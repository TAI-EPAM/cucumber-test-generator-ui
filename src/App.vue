<template>
    <component v-bind:is="viewSelector()"/>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AppLogin from './components/ui/AppLogin';
  import DefaultView from './views/DefaultView';
  import RegistrationView from './views/RegistrationView';

  export default {
    components: {
      AppLogin,
      DefaultView,
      RegistrationView,
    },
    data() {
      return {
        menuItems: [],
        currentView: 'AppLogin',
      };
    },
    methods: {
      viewSelector() {
        const registration = this.$route.path.includes('/registration');
        if (registration) {
          return 'RegistrationView';
        }
        return this.isAuth ? 'DefaultView' : 'AppLogin';
      },
    },
    computed: {
      ...mapGetters(['isAuth', 'isLoaded']),
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
