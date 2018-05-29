<template>
  <li class="sub-menu" :class="{ 'active': isOpen }">
    <a @mouseover="showDots = true" @mouseleave="showDots = false">
      <div class="fa arrow" @click="toggleOpen" :class="{ 'fa-angle-right': !isOpen, 'fa-angle-down': isOpen }" />
      <div class="checkbox-holder">
        <check-box @click="selectSuit(suit.id)" :check="selectedCheck"></check-box>
      </div>
      <span class="item-name">{{ suit.name }} {{ casesCount }}</span>
      <priority-icon v-model="suit.priority" />
      <v-popover offset="0" placement="bottom-start">
        <i class="fa fa-ellipsis-v" v-show="showDots" />
        <template slot="popover">
          <ul class="dropdown-menu">
            <li><a @click="editSuit">Edit Suit</a></li>
            <li><a @click="removeSuit">Delete Suit</a></li>
          </ul>
        </template>
      </v-popover>
      <span class="item-status" :class="suit.displayedStatusName && suit.displayedStatusName.toLowerCase()">{{ suit.displayedStatusName && suit.displayedStatusName.replace(/_/, ' ') }}</span>
    </a>
    <ul class="sub" :class="{ 'active': isOpen }">
      <case-item v-for="item in suit.cases"
                 v-bind="{selectCase, clickCase}"
                 :case-item="item"
                 :selectedObject="selectedObject"
                 :suit-id="suit.id"
                 :activeCaseId="activeCaseId"
                 :key="item.id"></case-item>
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
  import CheckBox from '../../components/ui/Checkbox';

  export default {
    components: {
      CaseAdd,
      Confirmation,
      CaseItem,
      EpamButton,
      PriorityIcon,
      SuitEdit,
      CheckBox,
    },
    computed: {
      ...mapGetters(
        {
          getSuit: 'getActiveSuitById',
        },
      ),
      casesCount() {
        return this.suit.cases && this.suit.cases.length ? `(${this.suit.cases.length})` : '(0)';
      },
      selectedCheck() {
        this.selected = this.selectedObject.suits.has(this.suit.id);
        return this.selected;
      },
    },
    data() {
      return {
        selected: false,
        isOpen: false,
        showDots: false,
        activeSuit: false,
        activeCaseId: -1,
      };
    },
    methods: {
      toggleOpen() {
        this.isOpen = !this.isOpen;
        if (!this.isOpen) {
          this.activeCaseId = -1;
        }
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
      clickCase(caseId) {
        this.activeCaseId = caseId;
      },
    },
    props: ['suit', 'selectedObject', 'selectSuit', 'selectCase'],
    name: 'ProjectMenuSuitItem',
    watch: {
      selected(newValue) {
        if (newValue) {
          this.selectedObject.suits.add(this.suit.id);
        } else {
          this.selectedObject.suits.delete(this.suit.id);
        }
      },
    },
  };
</script>

<style lang="less">
  @import "../../assets/vendors/epam-ui/less/uui-colors";
  @import "../../assets/vendors/epam-ui/less/uui-fonts";


  aside .uui-side-bar ul {


    & > li {
      position: relative;
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
          margin-left: 26px;
          margin-right: 10px;
          font-size: 14px;
          letter-spacing: 0;
          font-family: "Oswald Light";
          text-transform: none;
          color: @gray_light;
        }


        & div.v-popover {
          position: absolute;
          right: 12px;
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

        .item-status {
          font-size: 10px;
          display: inline-block;
          float: right;
          font-family: @Oswald_Regular;
          color: @gray;
          min-width: 20px;
          margin-right: 17px;
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
    position: relative;
    .checkbox-holder {
      display: inline-block;
      position: absolute;
      width: 20px;
      margin-top: 5px;
    }

    .sub {
      display: none;

      &.active {
        display: block!important;
      }
      & li.add-case {
        padding: 10px; text-align: center;
        background-color: #2B2B2B;
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

  //item-status

  li.sub-menu.active span.item-status,
  li.sub-menu.active:hover span.item-status,
  li.sub-menu span.item-status {
    color: #999999;
  }

  li.sub-menu > a,
  li.sub-menu > a:hover,
  li.sub-menu.active:hover .item-name {
    color: #CCCCCC;
    background-color: transparent!important;
  }
  li.sub-menu.active > a,
  li.sub-menu.active > a:hover{
    color: #CCCCCC;
    background-color: #2B2B2B!important;
  }
  .sub-menu.active .item-status.passed {
    color: lime;
  }
  .sub-menu.active .item-status.failed {
    color: @fuchsia;
  }
  .sub-menu.active .item-status.running {
    color: @orange;
  }

</style>
