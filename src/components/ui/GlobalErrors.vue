<template>
  <div class="global-errors">
    <div v-for="(item,index) in items" class="uui-alert-messages fuchsia" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close" @click="closeError(index)">
        <span aria-hidden="true"><span></span><span></span></span>
      </button>
      <i class="fa fa-exclamation-triangle"></i>
      <strong>{{item.response.status}} - {{item.response.statusText}}</strong> <a class="link" @click="viewFullError(index)">See full error stack</a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'GlobalErrors',
    components: {
    },
    computed: {
      ...mapGetters({ items: 'getGlobalErrors' }),
    },
    data() {
      return {};
    },
    methods: {
      closeError(index) {
        this.$store.commit('removeGlobalError', index);
      },
      viewFullError(index) {
        const data = this.items[index];
        this.$vuedals.open({
          title: 'Error Description',
          component: {
            props: ['data'],
            template: '<div style="overflow-y: scroll; overflow-x: auto;">{{data}}</div>',
          },
          props: {
            data,
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
          },
        });
      },
    },
  };
</script>

<style lang="less" scoped>
@import "../../assets/vendors/epam-ui/less/uui-alerts.less";
@import "../../assets/vendors/epam-ui/less/uui-icons.less";
@import "../../assets/vendors/epam-ui/less/uui-colors.less";
.global-errors {
  overflow: hidden;
  background: @fuchsia;

  & .error-item {
    margin: 0 30px;
    line-height: 40px;
    color: @white;
  }

  & .close {
    background: transparent;
    border: none;
    float: right;
    cursor: pointer;
  }
  & a.link {
    color: @white;
    cursor: pointer;
    &:hover {
      color: @white;
    }
  }
}
</style>
