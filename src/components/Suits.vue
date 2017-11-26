<template>
  <div class="suits holder">
    <div class="wrapper">
      <div class="left-side">
        <suits-menu :items="suits" :menuClick="menuClick" />
        <div class="buttons-holder">
          <v-button @click="loadSuitComponent('add')">Add suit</v-button>
        </div>
      </div>
      <div class="center-side">
        <cases-list v-if="activeSuit" :suit="activeSuit"></cases-list>
      </div>
      <div class="right-side">
        <component :is="rightComponent" v-bind="rightComponentOptions" />
      </div>
    </div>
  </div>
</template>

<script>
  // import AxiosClient from '../utils/httpClient';

  export default {
    components: {
    },
    data() {
      return {
        title: 'Suits',
        suits: [],
        activeSuit: null,
        rightComponent: null,
        rightComponentOptions: null,
      };
    },
    methods: {
    },
    mounted() {
    },
    name: 'Suits',
};
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    display: flex;
  }
  .left-side {
    flex: 0 0 20%;
  }
  .center-side {
    flex: 1;
    margin: 0 20px;
  }
  .right-side {
    flex: 0 0 30%;
  }

  .suits {
    h2 {
      margin: 0 0 0 20px;
    }
    .buttons-holder {
      margin: 20px 20px 0 0;
    }
  }




</style>
