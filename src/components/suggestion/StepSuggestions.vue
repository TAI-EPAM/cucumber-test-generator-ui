<template>
<section>
  <div class="suggestions-content">
     <suggestion-add/>
     <div v-if="suggestions && suggestions.length">
        <div v-for="item in suggestions.slice(suggestions.length-7, suggestions.length)">
           <suggestion-item  :suggestion="item"/>
         </div>
     </div>
  </div>
</section>
</div>
</template>

<script>
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
      title: 'Edit Suggestions Steps',
    };
  },
  props: ['suggestions'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.suggestions-content {
  margin: 20px;
}
</style>
