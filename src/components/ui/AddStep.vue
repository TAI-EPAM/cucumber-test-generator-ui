<template>
  <div>
    <input type="text" class="input-steps uui-form-element "/>
    <epam-button @click="deleteNewStep" class="step-delete">
      <i class="fa fa-xl fa-remove icon" aria-hidden="true"></i>
    </epam-button>
    <epam-button @click="addStep" class="step-add">
      <i class="fa fa-check icon" aria-hidden="true"></i>
    </epam-button>
  </div>
</template>

<script>

  export default {
    components: {
      // EpamButton,
    },
    data() {
      return {
        index: null,
        saveSteps: null,
      };
    },
    methods: {
      // deleteNewStep(){},
    },
    mounted() {

    },
    props: [],
    name: 'addStep',
    computed: {
    },
  };
</script>
