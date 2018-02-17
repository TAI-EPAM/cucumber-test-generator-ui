<template>
  <li class="sub-menu">
    <a>
      <div class="fa arrow" @click="toggleOpen" :class="{ 'fa-angle-right': !isOpen, 'fa-angle-down': isOpen }" />
      <div class="checkbox-holder">
        <input type="checkbox" v-model="selected" />
      </div>
      <span class="item-name">{{ suit.name }} </span>
      <priority-icon v-model="suit.priority" />
      <v-popover offset="0" placement="bottom-start">
        <i class="fa fa-ellipsis-v" />
        <template slot="popover">
          <ul class="dropdown-menu">
            <li><a @click="editSuit">Edit Suit</a></li>
            <li><a @click="removeSuit">Delete Suit</a></li>
          </ul>
        </template>
      </v-popover>
    </a>
    <ul class="sub" :class="{ 'active': isOpen }">
      <case-item v-for="item in suit.cases" :case-item="item" :selectedObject="selectedObject" :suit-id="suit.id" :key="suit.id"></case-item>
      <li class="add-case">
        <epam-button @click="addCase" markup="transparent" small>+ Add new Case</epam-button>
      </li>
    </ul>
  </li>
</template>

<script>
  import { mapGetters } from 'vuex';
  import EpamButton from '../ui/EpamButton';
  import SuitEdit from '../suit/SuitEdit';
  import CaseAdd from '../case/CaseAdd';
  import Confirmation from '../Confimation';
  import CaseItem from './ProjectMenuCaseItem';
  import PriorityIcon from '../ui/PriorityIcon';

  export default {
    components: {
      CaseAdd,
      Confirmation,
      CaseItem,
      EpamButton,
      PriorityIcon,
      SuitEdit,
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
  @import "../../assets/vendors/epam-ui/less/uui-colors";


  aside .uui-side-bar ul {

    & > li {

      & > a {

        padding: 0 10px;

        & .arrow {
          display: inline-block;
          float: none;
          margin-left: 0;
          width: 20px;
          text-align:center;
          font-size: 14px;
        }

        & > span.item-name {
          margin-right: 10px;
          font-size: 14px;
          letter-spacing: 0;
          font-family: "Oswald Light";
          text-transform: none;
        }


        & div.v-popover {
          display: inline-block;
          float: right;
          text-align: center;
          margin-right: -18px;
          font-size: 14px;
          line-height: 40px;
          cursor: pointer;

          & > span > i {
            font-size: 14px;
          }
        }
      }
    }
  }

  .dropdown-menu {
    list-style: none;
    min-width: 200px;
    & li {
      width: 100%;
      & a {
        display: inline-block;
        width: 100%;
        padding: 5px 5px 5px 20px;
        line-height: 24px;
        cursor: pointer;
        color: black;
        &:hover {
          text-decoration: none;
          background: #e5e5e5;
        }
      }
    }
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
      & li.add-case {
        padding: 10px; text-align: center;
        & button {
          border: none;
          color: @green_lime;
          &:hover, &:active {
            color: @green_dark;
          }
        }
      }

    }
  }


</style>
