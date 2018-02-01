<template>
<div v-if="steps">
  <div class="uui-timeline" style="margin-top: 40px">
    <ul class="timeline-wrapper">
      <li class="timeline-body">
        <div class="line">
          <div class="item-wrapper">
            <div class="timeline-section icon">
              <span class="uui-icon timeline-icon">G</span>
            </div>
            <div class="timeline-section" v-if="steps.given">
              <draggable :list="steps.given" element="ul" @update="updateSteps($event, steps.given)">
                  <li v-for="step in steps.given" :key="step.rowNumber">
                    <span>{{ step.description }} / {{ step.rowNumber }}</span>
                    <epam-button markup="small">delete</epam-button>
                  </li>
              </draggable>
              <div class="add-step-section">
                <input type="text" class="uui-form-element" /><epam-button @click="addStep(0)">add new step</epam-button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="timeline-body">
        <div class="line">
          <div class="item-wrapper">
            <div class="timeline-section icon">
              <span class="uui-icon timeline-icon">W</span>
            </div>
            <div class="timeline-section">
              <draggable :list="steps.when" element="ul" @update="updateSteps($event, steps.when)">
                <li v-for="step in steps.when" :key="step.rowNumber">
                  <span>{{ step.description }} / {{ step.rowNumber }}</span>
                  <epam-button markup="small">delete</epam-button>
                </li>
              </draggable>
              <div class="add-step-section">
                <input type="text" class="uui-form-element" /><epam-button @click="addStep(1)">add new step</epam-button>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li class="timeline-body">
        <div class="line">
          <div class="item-wrapper">
            <div class="timeline-section icon">
              <span class="uui-icon timeline-icon">T</span>
            </div>
            <div class="timeline-section">
              <draggable :list="steps.then" element="ul" @update="updateSteps($event, steps.then)">
                <li v-for="step in steps.then" :key="step.rowNumber">
                  <span>{{ step.description }} / {{ step.rowNumber }}</span>
                  <epam-button markup="small">delete</epam-button>
                </li>
              </draggable>
              <div class="add-step-section">
                <input type="text" class="uui-form-element" /><epam-button @click="addStep(2)">add new step</epam-button>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>

</div>
</template>

<script>
  import draggable from 'vuedraggable';
  // import AxiosClient from '../utils/httpClient';
  import EpamButton from './ui/EpamButton';

  export default {
    components: {
      EpamButton,
      draggable,
    },
    data() {
      return {
        steps: this.modifyStepsList(JSON.parse(JSON.stringify(this.value))),
      };
    },
    methods: {
      modifyStepsList(value = []) {
        const steps = {
          given: [],
          when: [],
          then: [],
        };

        steps.given = value.filter(step => step.type === 0);
        steps.when = value.filter(step => step.type === 1);
        steps.then = value.filter(step => step.type === 2);

        return steps;
      },
      normalizeStepList() {
        const result = Object.keys(this.steps).reduce((r, k) => {
          this.steps[k].forEach(item => r.push(item));
          return r;
        }, []);
        return result;
      },
      updateSteps(event, set) {
        set.forEach((item, index) => {
          // eslint-disable-next-line no-param-reassign
          item.rowNumber = index + 1;
        });
        this.$emit('input', this.normalizeStepList());
      },
    },
    mounted() {

    },
    props: ['value'],
    name: 'CaseSteps',
    watch: {
      value(n) {
        this.steps = this.modifyStepsList(JSON.parse(JSON.stringify(n)));
      },
    },
  };
</script>


<style lang="less" scoped="true">
  @import url(../assets/vendors/epam-ui/less/uui-timeline.less);
  .timeline-section {
    & > ul {
      width: 400px;
      list-style: none;
      margin: 10px 30px;

      & > li {
        padding: 6px 18px;
        background: #e5e5e5;
        margin: 0 0 5px 0;
      }
    }

    .add-step-section {
      margin-left: 30px;
      & > button {
        margin-left: 10px;
      }
    }

  }



  .sortable-ghost {
    border: 1px dashed green;
  }




</style>
