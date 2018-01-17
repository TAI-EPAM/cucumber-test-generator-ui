<template>
  <section class="panel">
  <h2>{{ localCase.description }}</h2>
    <div v-if="isDirty">
      Модель испачкана
    </div>
    <div class="case-props">
      <ul>
        <li>Status: <span>NOT DONE</span></li>
        <li>Priority: <span>{{localCase.priority}}</span></li>
      </ul>
      <ul>
        <li>Creation Date: {{localCase.creationDate}}</li>
        <li>Last update Date: {{localCase.updateDate}}</li>
      </ul>
    </div>

    <!-- Steps-->
    <case-steps v-model="localCase.steps"></case-steps>

    <epam-button markup="large transparent" @click="editCase">edit case</epam-button>
    <epam-button markup="large" class="lime-green" @click="saveCase">Save Tests</epam-button>

    <div class="debug">
      {{ localCase.description }}
      <p>dirty: {{ isDirty }}</p>
    </div>

  </section>
</template>

<script>
  import AxiosClient from '../utils/httpClient';
  import EpamButton from './ui/EpamButton';
  import CaseSteps from './CaseSteps';
  import CaseEdit from './case/CaseEdit';

  export default {
    components: {
      EpamButton,
      CaseSteps,
      CaseEdit,
    },
    computed: {
      isDirty() {
        if (JSON.stringify(this.value) === JSON.stringify(this.localCase)) {
          this.dirty = false;
        }
        return this.dirty;
      },
    },
    data() {
      return {
        localCase: JSON.parse(JSON.stringify(this.value)),
        dirty: false,
      };
    },
    methods: {
      saveCase() {
        this.$store.updateCase(this.$route.params.suitId, this.$route.params.caseId, this.localCase);
        AxiosClient.put(`/cucumber/suits/${this.$route.params.suitId}/cases/${this.$route.params.caseId}`, this.localCase)
          .then((resp) => {
            console.warn(resp);
          })
          .catch(() => {
          });
      },
      editCase() {
        this.$vuedals.open({
          title: 'Edit Case',
          component: CaseEdit,
          props: {
            value: this.localCase,
            suitId: this.$route.params.suitId,
            onCancel() {
              this.$vuedals.close();
            },
            onSubmit(updateData) {
              this.$store.updateCase(this.suitId, this.entity.id, updateData);
              this.$vuedals.close();
            },
          },
        });
      },
    },
    mounted() {
    },
    update() {

    },
    props: ['value'],
    name: 'Case',
    watch: {
      value(n) {
        this.localCase = JSON.parse(JSON.stringify(n));
      },
      localCase: {
        handler() {
          this.dirty = true;
        },
        deep: true,
      },
    },
  };
</script>

<style lang="less" scoped>
  .case-props {
    display: flex;
    & ul {
      flex: 0.3;
      list-style: none;

      & li {
        display: inline-block;
      }
    }
  }

</style>
