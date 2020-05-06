<template>
  <div class="tw-the-goals-decision-collector">
    <tw-box>
      <tw-row>
        <tw-col>
          <tw-gutter bottom class="tw-u-text-align--right">
            <tw-button
              @click="onToggleAutomaticBehavior"
              theme="info"
              :outline="!automaticBehavior"
              size="sm">{{ automaticBehaviorButtonLabel }}</tw-button>
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
            :close-when-checked="automaticBehavior"
            @checkbox-change="onCheckboxChange($event, goal, index)">
            <tw-form-field label="Conclusions">
              <tw-form-textarea
                :ref="`textarea-${index}`"
                :readonly="disabled || isGoalChecked(goal)"
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
export default {
  name: 'TwTheGoalsDecisionCollector',
  mounted() {
    this.initModelProperties();
    setTimeout(this.openFirstUncheckedGoal, 2000);
  },
  data() {
    return {
      toggleAll: false,
    };
  },
  props: {
    goals: {
      type: Array,
      required: true,
    },
    disabled: Boolean,
    automaticBehavior: {
      type: Boolean,
      default: true,
    },
  },
  watch: {
    disabled(value) {
      if (!value) {
        this.toggleNextUncheckedGoal(-1, true);
      }
    },
  },
  computed: {
    toggleAllButtonLabel() {
      return this.toggleAll ? 'Close all' : 'Open all';
    },
    automaticBehaviorButtonLabel() {
      return this.automaticBehavior ? 'Automatic' : 'Manual';
    },
  },
  methods: {
    openFirstUncheckedGoal() {
      if (!this.disabled) {
        this.toggleNextUncheckedGoal(-1, true);
      }
    },
    onCheckboxChange({ value }, goal, index) {
      if (value) {
        setGoalFinishTime(goal, this.getNowISOString());
        this.toggleNextUncheckedGoal(index, true);
      } else {
        setGoalFinishTime(goal, '');
        this.toggleNextUncheckedGoal(index, false);
        this.focusOnTextAreaByIndex(index);
      }
    },
    toggleNextUncheckedGoal(index, value) {
      if (!this.automaticBehavior) { return; }
      for (let i = index + 1; i < this.goals.length; i += 1) {
        if (!this.goals[i].finishedAt) {
          this.toggleSpecificCollapse(i, value);
          this.focusOnTextAreaByIndex(i);
          return;
        }
      }
    },
    toggleSpecificCollapse(index, value) {
      const ref = this.$refs[`goal-${index}`];
      if (ref && ref[0] && ref[0].toggleCollapse) {
        ref[0].toggleCollapse(value);
      }
    },
    focusOnTextAreaByIndex(index) {
      const ref = this.$refs[`textarea-${index}`];
      if (ref && ref[0] && ref[0].focus) {
        this.$nextTick(() => {
          ref[0].focus();
        });
      }
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
    onToggleAutomaticBehavior() {
      this.$emit('update-automatic-behavior', !this.automaticBehavior);
    },
    isGoalChecked(goal) {
      return !!goal.finishedAt;
    },
    getNowISOString() {
      return this.$twTime.getNowISOString();
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
