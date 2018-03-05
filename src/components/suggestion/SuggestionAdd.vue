<template>
<div class="add-wrapper">
   <input type="text" class="uui-form-element" placeholder="Add here..." v-model="entity.content"/>
   <epam-button @click="send" class="lime-green">Add step suggestion</epam-button>
</div>
</template>


<script>
import EpamButton from '../ui/EpamButton';

export default {
  components: {
    EpamButton,
  },
  data() {
    return {
      entity: {
        id: 0,
        content: '',
        type: 1,
      },
    };
  },
  methods: {
    reset() {
      Object.assign(this.entity, {
        id: null,
        content: null,
        type: 1,
      });
    },
    send() {
      this.$store.dispatch('addSuggestionAsync', this.entity)
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
.add-wrapper {
    background-color: @gray_light;
    margin-bottom: 7px;
    padding: 20px;
}
input.uui-form-element {
    min-width: 300px;
    width: 60%;
    margin: auto 20px;
    padding: 3px;
}
</style>