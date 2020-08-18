<template>
  <div>
    <h2 :style="styles.h2">Goals</h2>
    <div style="margin-left: 20px">
      <div
        v-for="(goal, index) in goals"
        style="margin-bottom: 50px"
        :key="goal.id">
          <h3 :style="styles.h3">{{ index + 1 }}. {{ goal.name }}</h3>
          <label :style="styles.label">
            <template v-if="goal.finishedAt">
              <span>&#9989; Done at </span>
              <tw-time-format
                v-if="shouldShowFullDate"
                :time="goal.finishedAt" />
              <span v-else>{{ getTimeFormatted(goal.finishedAt) }}</span>
            </template>
            <span v-else>&#9888; Item has not been completed</span>
            <p v-if="shouldShowWeight">
              <small>Weight: {{ goal.weight || 1 }}</small>
            </p>
          </label>
          <div v-if="goal.decisions">
            <h4 :style="styles.h4">Notes</h4>
            <tw-template-preview-modal-article
              :text="goal.decisions" />
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import TwTemplatePreviewModalArticle from './TemplatePreviewModalArticle.vue';

export default {
  name: 'TwTemplatePreviewModalGoals',
  props: {
    goals: {
      type: Array,
      required: true,
    },
    styles: Object,
    shouldShowFullDate: Boolean,
  },
  components: {
    TwTemplatePreviewModalArticle,
  },
  computed: {
    shouldShowWeight() {
      return this.goals.some(item => item.weight !== 1);
    },
  },
  methods: {
    getTimeFormatted(time) {
      return this.$twServices.time.getTimeFormatOf(time);
    },
  },
};
</script>
