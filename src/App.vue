<template>
    <component v-bind:is="viewSelector()"/>
</template>

<script>
  import { mapGetters } from 'vuex';
  import AppLogin from './components/ui/AppLogin';
  import DefaultView from './views/DefaultView';
  import RegistrationView from './views/RegistrationView';
  import PasswordForgotView from './views/PasswordForgotView';

  export default {
    components: {
      AppLogin,
      DefaultView,
      RegistrationView,
      PasswordForgotView,
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
        const passwordForgot = this.$route.path.includes('/passwordForgot');
        if (registration) {
          return 'RegistrationView';
        }
        if (passwordForgot) {
          return 'PasswordForgotView';
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
