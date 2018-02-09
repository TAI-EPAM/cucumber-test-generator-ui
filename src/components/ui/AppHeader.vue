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
      <div class="uui-header-right">
        <project-selector v-if="isAuth" />
        <curtain
          buttonClass="blue"
          buttonText="edit step suggestions"
          headerText="edit step suggestions"
          :component="certainComponent">
        </curtain>
        <div class="user-info">
          <a @click="logout" v-if="isAuth">Logout</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import VButton from './EpamButton';
  import ProjectSelector from './ProjectSelector';
  import Curtain from './Curtain';
  import StepSuggestions from '../StepSuggestions';

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
          props: [],
        },
      };
    },

    computed: {
      ...mapGetters({ isAuth: 'isAuth', getSuggestions: 'getCurrentSuggestions' }),
    },

    mounted() {
      this.fetchSuggestions()
        .then(() => {
          this.certainComponent.props = { suggestions: this.getSuggestions };
         // console.log(this.certainComponent);
        });
    },
    methods: {
      ...mapActions({ fetchSuggestions: 'getSuggestionsAsync' }),
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
