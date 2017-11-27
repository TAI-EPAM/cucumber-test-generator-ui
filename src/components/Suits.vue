<template>

  <div>
    <v-button markup="orange">1111</v-button>
  </div>

</template>

<script>
  import VButton from './ui/VButton';
  // import AxiosClient from '../utils/httpClient';

  export default {
    components: {
      VButton,
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
      viewCase(data) {
        console.warn(data.caseItem);
        console.warn(data.suit);
      },
    },
    mounted() {
      this.$bus.$on('viewCase', this.viewCase);
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
