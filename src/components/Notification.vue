<template>
  <section class="notification">
    <div class="uui-form-wrapper">
      {{ this.message }}
    </div>
    <div class="form-buttons-holder">
      <epam-button @click="close" class="lime-green large">Ok</epam-button>
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
        close() {
          this.onCancel();
        },
      },
      props: ['onCancel', 'message'],
      name: 'notification',
    };
</script>

<style lang="less" scoped>
  .notification {
    width: 600px;
    margin: 0 auto;
  }
</style>
