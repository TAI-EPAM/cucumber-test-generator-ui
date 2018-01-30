<template>
  <section>
    <div v-if="commit">
            <div @click="changeView" class="commit-title" data-grid-level="1">
                        <span class="fa fa-lg caret-gray" v-bind:class="isOpen?'fa-caret-down':'fa-caret-right'"></span>
                        {{ commit.updatedDate }}
                        <b>{{ commit.author}}</b> made changes in '{{ caseName }}' case
            </div>
            <table class="uui-table treegrid">
              <tbody>
                <tr v-if="isOpen">
                      <td class="row-title">Old Value</td>
                      <td class="row-title">New Value</td>                   
                </tr>
                <tr v-for="item in commit.propertyDifferences.filter(el => el.propertyName!=='steps')" v-if="isOpen" class="treegrid-child " data-grid-level="2">
                    <td>{{ item.oldValue || '-'}}</td>
                    <td>{{ item.newValue || '-'}}</td>                   
                </tr>
                <tr v-for="item in commit.propertyDifferences.filter(el => el.propertyName==='steps')" v-if="isOpen" class="treegrid-child " data-grid-level="2">
                    <td>{{ item.oldValue.description || '-'}}</td>
                    <td>{{ item.newValue.description || '-'}}</td>                   
                </tr>
           </tbody>
    </table>
    </div>
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
.commit-title
{
    padding: 10px 20px;
    background-color: @gray_bg_dark;
}
.caret-gray
{
    color: @gray;
}
span.fa
{
    margin-right: 5px;
}
</style>
