<template>
  <li class="sub-menu">
    <a>
      <div class="fa arrow" @click="toggleOpen()" :class="{ 'fa-angle-right': !isOpen, 'fa-angle-down': isOpen }" />
      <div class="checkbox-holder">
        <input type="checkbox" v-model="selected" />
      </div>
      <span>{{ suit.name }} | {{ suit.priority }}</span>
    </a>
    <ul class="sub" :class="{ 'active': isOpen }">
      <case-item v-for="item in suit.cases" :case-item="item" :selectedObject="selectedObject" :suit-id="suit.id"></case-item>
      <li>
        <epam-button @click="editSuit()" small>Edit suit modal</epam-button>
        <epam-button @click="addCase()" small>Add case modal</epam-button>
        <epam-button @click="removeSuit()" small>DEL</epam-button>
      </li>
    </ul>
  </li>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from '../../ui/EpamButton';
  import SuitEdit from '../../suit/SuitEdit';
  import CaseAdd from '../../case/CaseAdd';
  import Confirmation from '../../Confimation';
  import CaseItem from './ProjectMenuCaseItem';

  export default {
    components: {
      EpamButton,
      SuitEdit,
      CaseAdd,
      Confirmation,
      CaseItem,
    },
    computed: {
      ...mapGetters(
        {
          getSuit: 'getActiveSuitById',
        },
      ),
    },
    data() {
      return {
        selected: false,
        isOpen: false,
      };
    },
    methods: {
      toggleOpen() {
        this.isOpen = !this.isOpen;
      },
      addCase() {
        const suitId = this.suit.id;
        const projectId = this.$route.params.projectId;
        this.$vuedals.open({
          title: 'Add New Case',
          component: CaseAdd,
          props: {
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
            suitId,
            projectId,
          },
        });
      },
      editSuit() {
        this.$vuedals.open({
          title: 'Edit Suit',
          component: SuitEdit,
          props: {
            value: this.getSuit(this.suit.id),
            projectId: this.$route.params.projectId,
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$vuedals.close();
            },
          },
        });
      },
      removeSuit() {
        const suitId = this.suit.id;
        const projectId = this.$route.params.projectId;

        this.$vuedals.open({
          title: 'Delete Suit',
          component: Confirmation,
          props: {
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit() {
              this.$store.dispatch('deleteSuitAsync', { projectId, suitId })
                .then(() => {
                  if (suitId === +this.$route.params.suitId) {
                    this.$router.push({ path: `/projects/${projectId}` });
                  }
                  this.$vuedals.close();
                });
            },
          },
        });
      },
    },
    props: ['suit', 'selectedObject'],
    name: 'ProjectMenuSuitItem',
    watch: {
      selected(newValue) {
        if (newValue) {
          this.selectedObject.suits.push(this.suit.id);
        } else {
          this.selectedObject.suits.splice(this.selectedObject.suits.indexOf(this.suit.id), 1);
        }
      },
    },
  };
</script>

<style lang="less">
  aside .uui-side-bar ul > li > a .arrow {
    display: inline-block;
    float: none;
    margin-left: 0;
    width: 20px;
    text-align:center;
    font-size: 18px;
  }

  .sub-menu {
    .checkbox-holder {
      display: inline-block;
      position: relative;
      width: 20px;
    }

    .sub {
      display: none;

      &.active {
        display: block!important;
      }
    }
  }
</style>
