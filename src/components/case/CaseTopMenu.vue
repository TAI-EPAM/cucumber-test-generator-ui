<template>
  <section class="caseTopPanel">
    <div class="caseName">Case {{this.localCase.name}}</div>
    <div class="play"></div>
    <div class="history">
      <curtain
        buttonClass="historyButton"
        buttonText="H"
        headerText="History"
        headerMarkup="orange"
        :component="getCertainComponent()"
        v-if="localCase">>
      </curtain>
    </div>
    <div class="pen"></div>
  </section>
</template>

<script>
  import equal from 'array-equal';
  import { mapGetters } from 'vuex';
  import CaseHistory from '@/components/case/CaseHistory';
  import Curtain from '@/components/ui/Curtain';

  export default {
    components: {
      CaseHistory,
      Curtain,
    },
    name: 'case-top-menu',
    data() {
      return {};
    },
    methods: {
      isCreatedCommit(commit) {
        const attributes = ['id', 'name', 'description', 'creationDate', 'updateDate', 'priority', 'status'];
        const oldValues = [];
        const existAttributes = commit.propertyDifferences.map((el) => {
          oldValues.push(el.oldValue);
          return el.propertyName;
        });
        if (oldValues.find(el => el != null) || !equal(attributes, existAttributes)) {
          return false;
        }
        return true;
      },
      getCertainComponent() {
        return {
          component: CaseHistory,
          props: [
            { caseName: this.localCase.name },
            { commits: this.getCommits.filter(el => !this.isCreatedCommit(el)) },
          ],
        };
      },
    },
    computed: {
      ...mapGetters({
        getCommits: 'getCurrentCommits',
      }),
    },
    props: ['localCase'],
  };
</script>

<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  .caseTopPanel {
    height: 68px;
    margin: -30px -30px 42px -30px;
    background-color: @white;
    display: flex;
    box-shadow: 0px 1px 1px @gray_light;
    align-items: center;
    font-family: @Oswald_Regular;

    .caseName {
      flex-grow: 1;
      padding-left: 25px;
      font-size: 30px;
      color: @gray_dark;
      text-transform: capitalize;
    }

    .play, .history, .pen {
      width: 66px;
      height: 100%;
      border-left: 1px solid @gray_light;
      text-align: center;
      padding-top: 15px;
    }
  }
</style>

<style lang="less">
  button.uui-button.historyButton {
    background-color: transparent;
    border: none;
    font-size: 22px;
  }
  button.uui-button.historyButton:hover {
    background-color: transparent;
  }
</style>
