<template>
  <section class="caseTopPanel">
    <div class="caseName">Case {{this.localCase.name}}</div>
    <div class="nextCase">
      <a href="#" class="nextCaseButton" @click.prevent="saveAndCreateNewCase"></a>
    </div>
    <div class="history">
      <curtain
        buttonClass="historyButton"
        buttonText="H"
        headerText="History"
        headerMarkup="orange"
        :component="getCertainComponent()"
        v-if="localCase">
      </curtain>
    </div>
    <div class="editCase">
      <a href="#" class="editCaseButton" @click.prevent="editCase">
        <i class="fas fa-pencil-alt"></i>
      </a>
    </div>
  </section>
</template>

<script>
  import equal from 'array-equal';
  import { mapGetters } from 'vuex';
  import CaseHistory from '@/components/case/CaseHistory';
  import Curtain from '@/components/ui/Curtain';
  import CaseEdit from '@/components/case/CaseEdit';
  import CaseAdd from '@/components/case/CaseAdd';

  export default {
    components: {
      CaseHistory,
      Curtain,
      CaseEdit,
      CaseAdd,
    },
    name: 'case-top-menu',
    data() {
      return {};
    },
    methods: {
      editCase() {
        this.$vuedals.open({
          title: 'Edit Case',
          component: CaseEdit,
          props: {
            value: this.localCase,
            projectId: this.$route.params.projectId,
            suitId: this.$route.params.suitId,
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
          },
        });
      },
      saveAndCreateNewCase() {
      },
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

    .nextCase, .history, .editCase {
      width: 66px;
      height: 100%;
      border-left: 1px solid @gray_light;
      text-align: center;
      position: relative;
    }

    .linkBeforeMixin(@content) {
      font-family: FontAwesome;
      display: inline-block;
      vertical-align: middle;
      color: @gray;
      font-size: 20px;
      position: absolute;
      top: 25px;
      left: 25px;
      content: @content;
    }

    .linkBeforeHoverMixin(@bg) {
      height: 100%;
      width: 100%;
      display: inline-block;
      background-color: @bg;
    }

    .editCaseButton:before {
      .linkBeforeMixin("\f044");
    }

    .nextCaseButton:before {
      .linkBeforeMixin("\f04e");
    }

    .nextCaseButton:hover {
      .linkBeforeHoverMixin(@green_lime);
    }

    .editCaseButton:hover {
      .linkBeforeHoverMixin(@fuchsia);
    }

    .editCaseButton:hover:before {
      color: @fuchsia;
    }

    .nextCaseButton:hover:before {
      color: @green_lime;
    }

  }
</style>

<style lang="less">
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";

  button.uui-button.historyButton {
    background-color: transparent;
    border: none;
    font-size: 22px;
    margin-top: 13px;
    position: relative;
  }
  button.uui-button.historyButton:hover {
    background-color: @orange;
    color: @orange;
    width: 100%;
    height: 68px;
    margin: 0;
  }

  .linkAfterMixin(@content) {
    position: absolute;
    color: @white;
    font-size: 12px;
    font-family: @Source_Sans_Pro_Bold;
    line-height: 14px;
    left: 7px;
    right: 7px;
    top: 14px;
    text-transform: lowercase;
    content: @content;
  }

  button.uui-button.historyButton:hover:after {
    .linkAfterMixin('history of this case');
  }

  .nextCaseButton:hover:after {
    .linkAfterMixin('save case and open next');
  }

  .editCaseButton:hover:after {
    .linkAfterMixin('edit this case');
  }

</style>
