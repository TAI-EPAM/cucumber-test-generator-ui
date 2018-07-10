<template>
  <section class="suggestion">
    <div class="panel">
      <div class="options">
        <a href="" @click.prevent="setType('ANY')">All</a>
        <a href="" @click.prevent="setType('GIVEN')">Given</a>
        <a href="" @click.prevent="setType('WHEN')">When</a>
        <a href="" @click.prevent="setType('THEN')">Then</a>
      </div>
      <div class="filterContainer">
        <a href=""><span class="filter"></span></a>
      </div>
    </div>
    <div class="content">
      <suggestion-add/>
      <div v-if="suggestions && suggestions.length">
        <div v-for="item in filterSuggestion">
          <suggestion-item :suggestion="item"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import StepTypeMap from '@/constants/StepType';
  import SuggestionItem from './SuggestionItem';
  import SuggestionAdd from './SuggestionAdd';

  export default {
    components: {
      SuggestionItem,
      SuggestionAdd,
    },
    name: 'StepSuggestions',
    data() {
      return {
        types: [...StepTypeMap],
        title: 'Edit Suggestions Steps',
        type: '',
        suggestions: [],
      };
    },
    computed: {
      ...mapGetters({ getSuggestions: 'getCurrentSuggestions' }),
      filterSuggestion() {
        return this.getSuggestions;
      },
    },
    mounted() {
      this.$store.dispatch('getSuggestionsByStepTypeAsync', { type: 'ANY', projectId: this.$route.params.projectId })
        .then(() => {
          this.suggestions = this.getSuggestions;
        });
    },
    methods: {
      ...mapActions({
        fetchSuggestions: 'getSuggestionsAsync',
        getSuggestionsByType: 'getSuggestionsByStepTypeAsync',
      }),
      setType(type) {
        this.type = type;
        if (type) {
          this.$store.dispatch('getSuggestionsByStepTypeAsync', { type, projectId: this.$route.params.projectId })
            .then(() => {
            });
        }
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  @import "../../assets/vendors/epam-ui/less/uui-colors";

  .suggestion {
    margin: 0;
    background-color: @gray_bg;
    height: 100%;

    .panel {
      height: 60px;
      margin-bottom: 42px;
      background-color: @white;
      border-bottom: 1px solid @gray_light;
      display: flex;

      span:first-of-type {
        height: 100%;
        width: 1px;
        display: inline-block;
        background-color: @gray;
      }

      .options {
        padding: 23px 0;
        width: 94%;
      }

      .options a {
        color: @gray;
        font-size: 14px;
        line-height: 19px;
        margin: 0 25px;
        font-family: "Oswald Regular";
        text-transform: uppercase;
      }

      .filterContainer {
        padding-top: 20px;
        padding-left: 20px;
        border-left: 1px solid @gray;
        width: 60px;

        .filter {
          background: url("../../assets/images/svg/filter.svg") 0 0 no-repeat;
          width: 19px;
          height: 19px;
          display: inline-block;
        }

      }
    }

    .content {
      background-color: @white;
      width: 94%;
      margin: 0 auto;
      border: 1px solid @gray_light;
      height: 68%;
      padding-left: 41px;
      padding-right: 18px;
    }

  }

</style>
