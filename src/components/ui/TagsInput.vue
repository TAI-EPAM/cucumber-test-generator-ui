<template>
  <multiselect
    v-model="localTarget"
    :options="tagsArray"
    :multiple="true"
    track-by="id"
    :taggable="true"
    @tag="addTag"
    :custom-label="customLabel"
    placeholder="Select or Add Tags"
    @input="submitChange"
  ></multiselect>
</template>

<script>
  import Multiselect from 'vue-multiselect';

  export default {
    components: {
      Multiselect,
    },
    data() {
      return {
        localTarget: this.value,
        tagsArray: this.$store.getters.getTags,
      };
    },
    props: ['value'],
    methods: {
      addTag(newTag) {
        const tag = {
          name: newTag,
        };
        this.tagsArray.push(tag);
        this.localTarget.push(tag);
      },
      customLabel(option) {
        return option.name;
      },
      submitChange() {
        this.$emit('input', this.localTarget);
      },
    },
    mounted() {

    },
    name: 'TagsInputComponent',
  };
</script>

<style scoped>
</style>
