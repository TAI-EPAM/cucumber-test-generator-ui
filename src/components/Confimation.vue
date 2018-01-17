<template>
  <section class="confirmation">
    <div class="uui-form-wrapper">
      Are you sure?
    </div>
    <div class="form-buttons-holder">
      <epam-button @click="cancel" class="large">Cancel</epam-button>
      <epam-button @click="agree" class="lime-green large">Agree</epam-button>
    </div>
  </section>
</template>

<script>
  import EpamButton from './ui/EpamButton';

  export default {
    components: {
      EpamButton,
    },
    data() {
      return {
      };
    },
    methods: {
      agree() {
        this.onSubmit();
      },
      cancel() {
        this.onCancel();
      },
    },
    mounted() {
    },
    update() {
    },
    props: ['onCancel', 'onSubmit'],
    name: 'Confirmation',
  };
</script>

<style>


</style>
