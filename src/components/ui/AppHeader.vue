<template>
  <header>
    <div class="uui-header">
      <nav>
        <div class="uui-responsive-header">
          <div class="responsive-header">
            <router-link to="/" class="responsive-brand-logo">
              <span class="title">BDD Generator</span>
            </router-link>
          </div>
        </div>
        <!--div class="uui-toggle-box">
          <span></span>
          <span></span>
          <span></span>
        </div-->
        <router-link to="/" class="brand-logo">
          BDD Generator
        </router-link>
      </nav>
      <div class="uui-header-right" v-if="isAuth">
        <project-selector />
        <curtain
          buttonClass="blue"
          buttonText="edit step suggestions"
          headerText="suggestions"
          :component="certainComponent">
        </curtain>
        <div class="user-info">
          <a @click="logout">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex';
  import StepSuggestions from '@/components/suggestion/StepSuggestions';
  import VButton from './EpamButton';
  import ProjectSelector from './ProjectSelector';
  import Curtain from './Curtain';

  export default {
    components: {
      VButton,
      ProjectSelector,
      Curtain,
      StepSuggestions,
    },

    data() {
      return {
        certainComponent: {
          component: StepSuggestions,
        },
      };
    },

    computed: {
      ...mapGetters({ isAuth: 'isAuth' }),
    },

    mounted() {
    },
    methods: {
      logout() {
        this.$store.commit('logout');
        this.$router.push(
          {
            path: '/',
          });
      },
    },
    name: 'app-header',
  };
</script>

<style lang="less" scoped>

  header {
    .uui-header {
      background: white;
      border-bottom: 1px solid #cccccc;
      color: #333333;

      .brand-logo {
        color: #333333;
      }

    }
  }

  header button {
    float: right;
    margin: 12px 12px 0 0;
  }
  header .user-info {
    width: 200px;
    float: right;
    height: 60px;
    & a {
      color: white;
      display: inline-block;
      margin: 20px 0 0 0;
      cursor: pointer;
    }
  }
  header .uui-header-right {
    float: right;
  }

  header nav {
    width: 200px;
  }
</style>

<style lang="less">

  header .curtain-component {
    float: right;
    margin-top: 12px;
  }

</style>
