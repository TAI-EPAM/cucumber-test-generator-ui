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

      </div>
      <div class="right-side">
        <suit v-if="activeSuit" :suit="activeSuit" />
      </div>
    </div>
  </div>
</template>

<script>
  import AxiosClient from '../utils/httpClient';
  import SuitsMenu from './suit/SuitsMenu';
  import Suit from './Suit';
  import VButton from './ui/VButton';

  export default {
    name: 'Suits',
    data() {
      return {
        title: 'Suits',
        suits: [],
        activeSuit: null,
      };
    },
    methods: {
      loadSuit(index = 0) {
        this.activeSuit = this.suits[index];
      },
      menuClick(num, suit) {
        this.activeSuit = suit;
      },
      addSuitLink() {
        this.$router.push({ name: 'suit-add' });
      },
    },
    components: {
      VButton,
      SuitsMenu,
      Suit,
    },
    mounted() {
      AxiosClient.get('/cucumber/suits/')
        .then((response) => {
          this.suits = response.data;
          this.loadSuit();
        })
        .catch((e) => {
          console.warn(e);
        });

      //  View events through event bus
      this.$bus.$on('suit-delete', (suitId) => {
        const removedIndex = this.suits.indexOf(this.suits.filter(suit => suit.id === suitId)[0]);
        if (removedIndex !== -1) {
          this.suits.splice(removedIndex, 1);
          this.activeSuit = null;
        }
      });
      this.$bus.$on('suit-save', (suit) => {
        const editedSuitIndex =
          this.suits.indexOf(this.suits.filter(_suit => _suit.id === suit.id)[0]);
        if (editedSuitIndex !== -1) {
          Object.assign(this.suits[editedSuitIndex], suit);
        }
      });
    },
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
    padding: 10px;
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
