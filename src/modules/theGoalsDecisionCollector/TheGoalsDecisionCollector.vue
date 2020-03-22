<template>
  <div class="tw-the-goals-decision-collector">
    <tw-row>
      <tw-col>
        <tw-gutter vertical class="tw-u_text--right">
          <tw-button
            @click="onToggleCloseWhenChecked"
            template="info"
            size="sm">Close when check: {{ closeWhenChecked }}</tw-button>
          <tw-button
            @click="onToggleAllCollapses"
            size="sm">{{ toggleButtonName }}</tw-button>
        </tw-gutter>
      </tw-col>
    </tw-row>
    <tw-collapse
      v-for="goal in goals"
      :key="goal.name"
      :title="goal.value"
      :is-opened="openCollapse"
      :checkbox-disabled="disabled"
      checkbox-label="Done"
      :close-when-checked="closeWhenChecked"
      @checkbox-click="onCheckboxClick($event, goal)">
      <tw-form-field label="Conclusions">
        <tw-form-textarea
          :disabled="disabled || !!goal.finishedAt"
          :name="goal.name"
          v-model="goal.decisions"/>
      </tw-form-field>
    </tw-collapse>
  </div>
</template>

<script>
import { getCurrentTime } from '../../services/timeService/timeService';

export default {
  name: 'TwTheGoalsDecisionCollector',
  mounted() {
    this.initModelProperties();
  },
  data() {
    return {
      openCollapse: false,
      closeWhenChecked: true,
    };
  },
  props: {
    goals: {
      type: Array,
      required: true,
    },
    disabled: Boolean,
  },
  computed: {
    toggleButtonName() {
      return this.openCollapse ? 'Close all' : 'Open all';
    },
  },
  methods: {
    onCheckboxClick({ value }, goal) {
      goal.finishedAt = value ? getCurrentTime() : '';
    },
    initModelProperties() {
      this.goals.forEach(goal => {
        this.$set(goal, 'finishedAt', '');
        this.$set(goal, 'decisions', '');
      });
    },
    onToggleAllCollapses() {
      this.openCollapse = !this.openCollapse;
    },
    onToggleCloseWhenChecked() {
      this.closeWhenChecked = !this.closeWhenChecked;
    },
  },
};
</script>

<style lang="scss">
.tw-the-goals-decision-collector {
  .tw-collapse+.tw-collapse {
    margin-top: 15px;
  }
}
</style>
