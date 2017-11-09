<template>
  <div class="suits holder">
    <div class="wrapper">
      <div class="left-side">
        <suits-menu :items="suits" :menuClick="menuClick" />
        <div class="buttons-holder">
          <v-button @click="addSuitLink">Add suit</v-button>
        </div>
      </div>
      <div class="center-side">
        <cases-list v-if="activeSuit" :suit="activeSuit"></cases-list>
      </div>
      <div class="right-side">
        <component :is="rightComponent" v-bind="rightComponentOptions" />
        <!--
        <suit :suit="activeSuit" :mode="suitMode" />
        <case :mode="caseMode" :suitId="activeSuit.id" v-if="activeSuit" />
        -->
      </div>
    </div>
  </div>
</template>

<script>
  import AxiosClient from '../utils/httpClient';
  import SuitsMenu from './suit/SuitsMenu';
  import Suit from './suit/Suit';
  import SuitAdd from './suit/SuitAdd';
  import SuitEdit from './suit/SuitEdit';
  import VButton from './ui/VButton';
  import CasesList from './case/CasesList';
  // import Case from './case/Case';

  export default {
    components: {
      CasesList,
      SuitsMenu,
      VButton,
    },
    data() {
      return {
        title: 'Suits',
        suits: [],
        activeSuit: null,
        suitMode: 'view',
        caseMode: 'none',
        rightComponent: null,
        rightComponentOptions: null,
      };
    },
    methods: {
      addSuit() {
        this.rightComponent = SuitAdd;
        this.rightComponentOptions = {};
      },
      loadEditSuit() {
        this.rightComponent = SuitEdit;
        this.rightComponentOptions = {
          suit: this.activeSuit,
        };
      },
      loadSuit(index = 0) {
        this.activeSuit = this.suits[index];
        this.rightComponent = Suit;
        this.rightComponentOptions = {
          suit: this.activeSuit,
        };
      },
      menuClick(index) {
        this.loadSuit(index);
      },
      addSuitLink() {
        this.addSuit();
      },
    },
    mounted() {
      AxiosClient.get('/cucumber/suits/')
        .then((response) => {
          this.suits = response.data;
          this.loadSuit();
        })
        .catch(() => {
        });

      //  View events through event bus

      // Suit events
      this.$bus.$on('suit-add', (suit) => {
        this.suits.push(suit);
        this.loadSuit(this.suits.length - 1);
      });
      this.$bus.$on('suit-cancel', () => {
        this.rightComponent = Suit;
        this.rightComponentOptions = {
          suit: this.activeSuit,
        };
      });
      this.$bus.$on('suit-delete', (suitId) => {
        const removedIndex = this.suits.indexOf(this.suits.filter(suit => suit.id === suitId)[0]);
        if (removedIndex !== -1) {
          this.suits.splice(removedIndex, 1);
          this.loadSuit();
        }
      });
      this.$bus.$on('suit-edit', () => {
        this.loadEditSuit();
      });
      this.$bus.$on('suit-save', () => {
        this.rightComponent = Suit;
        this.rightComponentOptions = {
          suit: this.activeSuit,
        };
      });


      this.$bus.$on('case-add', (caseId) => {
        AxiosClient.get(`/cucumber/suits/${this.activeSuit.id}/cases/${caseId}`)
          .then((response) => {
            this.activeSuit.cases.push(response.data);
            this.caseMode = 'none';
          })
          .catch(() => {
          });
      });
      this.$bus.$on('mode-change', (arrParams) => {
        if (this[arrParams[0]]) {
          this[arrParams[0]] = arrParams[1];
        }
      });
    },
    name: 'Suits',
};
</script>

<style lang="scss" scoped>
  .wrapper {
    width: 100%;
    display: flex;
  }
  .left-side {
    flex: 0 0 20%;
  }
  .center-side {
    flex: 1;
    margin: 0 20px;
  }
  .right-side {
    flex: 0 0 30%;
  }

  .suits {
    h2 {
      margin: 0 0 0 20px;
    }
    .buttons-holder {
      margin: 20px 20px 0 0;
    }
  }




</style>
