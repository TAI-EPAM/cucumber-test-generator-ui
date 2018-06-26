<template>
  <div>
    <div class="add-wrapper" v-if="!searchSteps">
      <input type="text" class="uui-form-element large" placeholder="Step suggestion" v-model="entity.content"/>
      <epam-button @click="send" class="lime-green large">Add step suggestion</epam-button>
    </div>
    <div class="add-wrapper" v-if="searchSteps">
      <input type="text" class="uui-form-element large" placeholder="Step suggestion" v-model="searchContent"/>
      <epam-button @click="send" class="blue large">Search steps</epam-button>
    </div>
  </div>
</template>


<script>
  import EpamButton from '../ui/EpamButton';
  /* eslint-disable */

  export default {
    components: {
      EpamButton,
    },
    data() {
      return {
        entity: {
          content: '',
          type : 'GIVEN',
        },
        searchContent: '',
        searchSteps: false,
      };
    },
    methods: {
      reset() {
        Object.assign(this.entity, {
          id: null,
          content: null,
          type: 'GIVEN',
        });
      },
      send() {
        this.$store.dispatch('addSuggestionAsync', { data: this.entity, projectId: this.$route.params.projectId})
          .then(() => {
            this.reset();
          });
      },
    },
    name: 'SuggestionAdd',
  };
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-core.less";
  @import "../../assets/vendors/epam-ui/less/uui-form-elements";

  .add-wrapper {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    padding-top: 41px;
  }

  input.uui-form-element {
    min-width: 300px;
    width: 70%;
    margin-right: 16px;
  }

</style>
