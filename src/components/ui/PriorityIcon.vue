<template>
  <i class="fa" :class="getClass()"></i>


</template>

<script>
  const PriorityMap = new Map();
  PriorityMap.set(1, 'fa-angle-double-up raspberry');
  PriorityMap.set(2, 'fa-arrow-up orange');
  PriorityMap.set(3, 'fa-arrow-down blue');
  PriorityMap.set(4, 'fa-angle-double-down green');

  export default {
    name: 'PrioriteIcon',
    methods: {
      getClass() {
        return PriorityMap.get(this.value);
      },
    },
    props: ['value'],
  };
</script>

<style lang="less" scoped>
  .fa {
    font-size: 16px;
    &.raspberry {
      color: #e4445f;
    }
    &.green {
      color: #a3c644;
    }
    &.blue {
      color: #39c2d7;
    }
    &.orange {
      color: #ff9b19
    }
    &.fa-arrow-up, &.fa-arrow-down {
      font-size: 12px;
      font-weight: normal;
    }
  }

</style>
