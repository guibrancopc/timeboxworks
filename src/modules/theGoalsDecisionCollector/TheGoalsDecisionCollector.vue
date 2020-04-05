<template>
  <div class="tw-the-goals-decision-collector">
    <tw-box>
      <tw-row>
        <tw-col>
          <tw-gutter bottom class="tw-u_text--right">
            <tw-button
              @click="onToggleCloseWhenChecked"
              template="info"
              :outline="!toggleOnCheck"
              size="sm">{{ toggleWhenCheckedButtonLabel }}</tw-button>
            <tw-button
              @click="onToggleAllCollapses"
              size="sm">{{ toggleAllButtonLabel }}</tw-button>
          </tw-gutter>
          <tw-collapse
            v-for="(goal, index) in goals"
            :ref="`goal-${index}`"
            :key="goal.name"
            :title="goal.value"
            :is-opened="toggleAll"
            :checkbox-disabled="disabled"
            checkbox-label="Done"
            :checkbox-value="isGoalChecked(goal)"
            :close-when-checked="toggleOnCheck"
            @checkbox-change="onCheckboxChange($event, goal, index)">
            <tw-form-field label="Conclusions">
              <tw-form-textarea
                :disabled="disabled || isGoalChecked(goal)"
                :name="goal.name"
                v-model="goal.decisions"/>
            </tw-form-field>
          </tw-collapse>
        </tw-col>
      </tw-row>
    </tw-box>
  </div>
</template>

<script>
import Time from '../../services/timeService/timeService';

export default {
  name: 'TwTheGoalsDecisionCollector',
  mounted() {
    this.initModelProperties();
  },
  data() {
    return {
      toggleAll: false,
      toggleOnCheck: true,
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
    toggleAllButtonLabel() {
      return this.toggleAll ? 'Close all' : 'Open all';
    },
    toggleWhenCheckedButtonLabel() {
      return this.toggleOnCheck ? 'Automatic' : 'Manual';
    },
  },
  methods: {
    onCheckboxChange({ value }, goal, index) {
      if (value) {
        setGoalFinishTime(goal, Time.getNowISOString());
        this.toggleNextUncheckedGoal(index, true);
      } else {
        setGoalFinishTime(goal, '');
        this.toggleNextUncheckedGoal(index, false);
      }
    },
    toggleNextUncheckedGoal(index, value) {
      if (!this.toggleOnCheck) { return; }
      for (let i = index + 1; i < this.goals.length; i += 1) {
        if (!this.goals[i].finishedAt) {
          this.toggleSpecificCollapse(i, value);
          return;
        }
      }
    },
    toggleSpecificCollapse(index, value) {
      this.$refs[`goal-${index}`][0].toggleCollapse(value);
    },
    initModelProperties() {
      this.goals.forEach(goal => {
        this.initializeGoalProp(goal, 'finishedAt');
        this.initializeGoalProp(goal, 'decisions');
      });
    },
    initializeGoalProp(goal, prop) {
      if (!goal[prop]) {
        this.$set(goal, prop, '');
      }
    },
    onToggleAllCollapses() {
      this.toggleAll = !this.toggleAll;
    },
    onToggleCloseWhenChecked() {
      this.toggleOnCheck = !this.toggleOnCheck;
    },
    isGoalChecked(goal) {
      return !!goal.finishedAt;
    },
  },
};

function setGoalFinishTime(goal, value) {
  goal.finishedAt = value;
}
</script>

<style lang="scss">
.tw-the-goals-decision-collector {
  .tw-collapse+.tw-collapse {
    margin-top: 15px;
  }
}
</style>
