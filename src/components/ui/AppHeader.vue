<template>
  <header>
    <div class="uui-header">
      <nav>
        <div class="uui-responsive-header">
          <div class="responsive-header">
            <a href="#" class="responsive-brand-logo">
              <span class="title">BDD Generator</span>
            </a>
          </div>
        </div>
        <div class="uui-toggle-box">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <a href="#" class="brand-logo">
          BDD Generator
        </a>
      </nav>
      <v-button markup="blue">edit step suggestions</v-button>
      <div class="user-info">
        <a @click="logout" v-if="isAuth">Logout</a>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex';
  import VButton from './EpamButton';
  
  
  export default {
    components: {
      VButton,
    },

    computed: {
      ...mapGetters(['isAuth']),
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

</style>
