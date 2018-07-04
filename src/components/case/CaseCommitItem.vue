<template>
  <section>
    <div v-if="commit">
        <div @click="changeView" class="commit-title">
                        <span class="fa fa-lg caret-gray" v-bind:class="isShownArrow"></span>
                        {{ commit.updatedDate }}
                        <b>{{ commit.author}}</b>
                        <span v-html="commitTitle"></span>
        </div>
        <table v-bind:class="isOpen?'':'treegrid-hide'" class="uui-table treegrid">
            <tbody>
                <tr >
                  <td class="row-title">Old Value</td>
                  <td class="row-title">New Value</td>
                </tr>
                <tr v-for="item in commit.propertyDifferences.filter(el => el.propertyName!=='steps')">
                  <td>{{ item.oldValue || '-'}}</td>
                  <td>{{ item.newValue || '-'}}</td>
                </tr>
                <tr v-for="item in commit.propertyDifferences.filter(el => el.propertyName==='steps')">
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
        isOpen: true,
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
    computed: {
      commitTitle() {
        if (this.changedStatusOnly) {
          return ` change status of <b>'${this.caseName}'</b> to ${this.commit.propertyDifferences[0].newValue}`;
        }
        return ` made changes in <b>'${this.caseName}'</b> case:`;
      },
      changedStatusOnly() {
        return this.commit.propertyDifferences.length === 1 && this.commit.propertyDifferences[0].propertyName === 'status';
      },
      isShownArrow() {
        return {
          'fa-caret-down': this.isOpen && !this.changedStatusOnly,
          'fa-caret-right': !this.isOpen && !this.changedStatusOnly,
          '': this.changedStatusOnly,
        };
      },
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
.treegrid-hide
{
    display: none;
}
table.uui-table.treegrid > tbody > tr > td
{
    width: 50%;
}
div.commit-title,
table.uui-table.treegrid > tbody > tr > td
{
    padding: 7px 30px;
    font-size: 15px;
}
</style>
