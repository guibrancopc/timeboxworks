<template>
  <div>
    <h2 :style="styles.h2">Goals</h2>
    <div style="margin-left: 20px">
      <div
        v-for="(goal, index) in goals"
        style="margin-bottom: 50px"
        :key="goal.name">
          <h3 :style="styles.h3">{{ index + 1 }}. {{ goal.value }}</h3>
          <label :style="styles.label">
            <span v-if="goal.finishedAt">&#9989; Done at </span>
            <tw-time-format
              v-if="goal.finishedAt"
              :time="goal.finishedAt" />
            <span v-else>&#9888; Item has not been completed</span>
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
  },
  components: {
    TwTemplatePreviewModalArticle,
  },
};
</script>
