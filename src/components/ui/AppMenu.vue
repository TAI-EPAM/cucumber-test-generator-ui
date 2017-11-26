<template>
    <div>

      <ul>
        <li v-for="item in suits">
          <span href="">{{ item.name }} // {{item.id}}</span>
          <ul v-if="item.cases">
            <li v-for="cases in item.cases">
              {{  }}
            </li>
          </ul>
          <v-button>Add Test Case</v-button>
        </li>
      </ul>

    </div>
</template>

<script>
  import AxiosClient from '@/utils/httpClient';
  import VButton from './VButton';

  export default {
    components: {
      VButton,
    },
    name: 'app-menu',
    data() {
      return {
        suits: [],
      };
    },
    methods: {
      init() {
        AxiosClient.get('/cucumber/suits/')
          .then((response) => {
            this.suits = response.data;
          })
          .catch(() => {
          });
      },
    },
    mounted() {
      this.init();
    },
  };
</script>

<style scoped>
</style>
