<template>
  <div class="tw-the-goals-decision-collector">
    <tw-box>
      <tw-row>
        <tw-col>
          <div class="tw-u-margin--bottom tw-u-display--flex tw-u-justify-content--space-between">
            <div>
              <tw-switch
                :checked="automaticBehavior"
                @change="onToggleAutomaticBehavior" />
              <tw-label text="Automatic" />
            </div>
            <div>
              <tw-button
                @click="onToggleAllCollapses"
                size="sm">{{ toggleAllButtonLabel }}</tw-button>
            </div>
          </div>
          <tw-collapse
            v-for="(goal, index) in goals"
            :ref="`goal-${index}`"
            :key="goal.id"
            :title="getGoalTitle(goal)"
            :is-opened="toggleAll"
            :checkbox-disabled="disabled"
            checkbox-label="Done"
            :checkbox-value="isGoalChecked(goal)"
            :close-when-checked="automaticBehavior"
            @checkbox-change="onCheckboxChange($event, goal, index)">
            <div v-if="isGoalTitleTooLong(goal)">
              <tw-label bold>Goal</tw-label>
              <tw-p>{{ goal.name }}</tw-p>
            </div>
            <tw-form-field label="Notes">
              <tw-form-textarea
                :ref="`textarea-${index}`"
                :readonly="disabled || isGoalChecked(goal)"
                :name="goal.id"
                v-model="goal.decisions"/>
            </tw-form-field>
            <small v-if="shouldShowWeight">Weight: {{ goal.weight || 1 }}</small>
          </tw-collapse>
        </tw-col>
      </tw-row>
    </tw-box>
  </div>
</template>

<script>
const GOAL_TITLE_MAX_LENGTH = 50;
const HALF_SECOND = 500;

export default {
  name: 'TwTheGoalsDecisionCollector',
  mounted() {
    this.initModelProperties();
    setTimeout(this.openFirstUncheckedGoal, HALF_SECOND);
  },
  data() {
    return {
      toggleAll: false,
      checked: false,
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
    automaticBehaviorLabel() {
      return this.automaticBehavior ? 'Automatic' : 'Manual';
    },
    shouldShowWeight() {
      return this.goals.some(item => item.weight !== 1);
    },
  },
  methods: {
    getGoalTitle(goal) {
      return `${goal.name.substring(0, GOAL_TITLE_MAX_LENGTH)}${this.isGoalTitleTooLong(goal) ? '...' : ''}`;
    },
    isGoalTitleTooLong(goal) {
      return goal.name.length > GOAL_TITLE_MAX_LENGTH;
    },
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
      return this.$twServices.time.getNowISOString();
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
