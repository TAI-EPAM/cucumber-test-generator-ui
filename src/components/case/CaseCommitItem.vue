<template>
  <section>
    <table v-if="commit" class="uui-table treegrid">
        <tbody>
            <tr @click="changeView" class="treegrid-parent" data-grid-level="1">
                    <td>
                        <span v-if="!isOpen" class="treegrid-caret fa fa-angle-right"></span>
                        <span v-if="isOpen" class="treegrid-caret fa fa-angle-down"></span>
                        {{ commit.updatedDate }}
                        <b>{{ commit.author}}</b> made changes in '{{ caseName }}' case
                   </td>
            </tr>
              <tr v-if="isOpen" class="treegrid-child" data-grid-level="2">
                    <td class="row-title">Old Value</td>
                    <td class="row-title">New Value</td>                   
              </tr>
                    <tr v-for="item in commit.propertyDifferences" v-if="isOpen && item.propertyName !=='steps'" class="treegrid-child " data-grid-level="2">
                      <td>{{ item.oldValue || '-'}}</td>
                      <td>{{ item.newValue || '-'}}</td>                   
                    </tr>
        </tbody>
    </table>
  </section>
</template>


<script>

  export default {
    components: {
    },
    data() {
      return {
        isOpen: false,
      };
    },
    methods: {
      changeView() {
        this.isOpen = !this.isOpen;
      },
    },
    mounted() {
    },
    updated() {
    },
    watch: {
    },
    name: 'case-commit-item',
    props: ['caseName', 'commit'],
  };
</script>

<style lang="less" scoped>
@import "../../assets/vendors/epam-ui/less/uui-tables.less";
@import "../../assets/vendors/epam-ui/less/uui-core.less";
td.row-title
{
    font-weight: bold;
    color: @orange;
}
</style>
