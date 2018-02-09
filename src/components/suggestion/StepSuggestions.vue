<template>
  <div v-if="suggestions && suggestions.length">
    <div v-for="item in suggestions.slice(0, 7)">
      <suggestion-item  :suggestion="item"/>
    </div>
  </div>
</template>

<script>
import SuggestionItem from './SuggestionItem';

export default {
  components: {
    SuggestionItem,
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
</style>
