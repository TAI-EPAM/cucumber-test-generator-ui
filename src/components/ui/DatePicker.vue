<template>
    <vue-datepicker-local v-model="time" :local="pickerLocale" clearable></vue-datepicker-local>
</template>

<script>
  import VueDatepickerLocal from 'vue-datepicker-local';

  export default {
    components: {
      VueDatepickerLocal,
    },
    data() {
      return {
        time: new Date(),
        pickerLocale: {
          dow: 0,
          hourTip: 'Select Hour',
          minuteTip: 'Select Minute',
          secondTip: 'Select Second',
          yearSuffix: '',
          monthsHead: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
          months: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
          weeks: 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_'),
          cancelTip: 'cancel',
          submitTip: 'confirm',
        },
      };
    },
    methods: {
    },
    name: 'DatePicker',
    props: ['value'],
    watch: {
      time(n) {
        this.$emit('input', n);
      },
    },
  };
</script>

<style scoped>
  @import "../../assets/css/vue-datepicker-local.css";
</style>


