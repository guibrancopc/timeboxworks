<template>
  <tw-modal
    ref="modal"
    width="md"
    title="Email template preview"
    close-on-overlay-click>
    <table
      ref="emailTemplate"
      :style="styles.container"
      class="tw-template-preview-modal__main">
      <tr>
        <td>
          <h1 :style="styles.h1">{{ currentMeeting.name }}</h1>
          <div style="margin-bottom: 5px;">
            <label :style="styles.label">
              &#9200; Started at <tw-time-format
                :time="currentMeeting.realStartTime" />
            </label>
          </div>
          <div>
            <label :style="styles.label">
              &#9200; Ended at <tw-time-format
                :time="currentMeeting.realEndTime" />
            </label>
          </div>
          <tw-template-preview-modal-article
            v-if="currentMeeting.description"
            :text="currentMeeting.description" />
        </td>
      </tr>
      <tr>
        <td>
          <tw-template-preview-modal-goals
            :styles="styles"
            :goals="currentMeeting.goals" />
        </td>
      </tr>
      <tr v-if="shouldShowSideTopics">
        <td>
          <tw-template-preview-modal-side-topics
            :styles="styles"
            :items="currentMeeting.sideTopics" />
        </td>
      </tr>
      <tr>
        <td>
          <div>
            <h2 :style="styles.h2">Performance</h2>
            <div style="text-align: center;">
              <center>
                <img
                  width="100%"
                  v-if="!!chartImageSrc"
                  :src="chartImageSrc" />
              </center>
            </div>
            <tw-template-preview-modal-time-cards :current-meeting="currentMeeting" />
          </div>
        </td>
      </tr>
      <tr :style="styles.textCenter">
        <td>
          <tw-template-preview-modal-footer :styles="styles" />
        </td>
      </tr>
    </table>
    <tw-button
      slot="footer"
      theme="secondary"
      outline @click="onClose">Done</tw-button>
    <tw-button
      slot="footer"
      theme="success"
      @click="onCopyClick"
      @blur="onCopyBlur">{{ copyButtonText }}</tw-button>
  </tw-modal>
</template>

<script>
import TwTemplatePreviewModalArticle from './TemplatePreviewModalArticle.vue';
import TwTemplatePreviewModalFooter from './TemplatePreviewModalFooter.vue';
import TwTemplatePreviewModalGoals from './TemplatePreviewModalGoals.vue';
import TwTemplatePreviewModalSideTopics from './TemplatePreviewModalSideTopics.vue';
import TwTemplatePreviewModalTimeCards from './TemplatePreviewModalTimeCards.vue';

export default {
  name: 'TwTemplatePreviewModal',
  data() {
    return {
      copied: false,
    };
  },
  props: {
    currentMeeting: Object,
    chartImageSrc: String,
  },
  computed: {
    shouldShowSideTopics() {
      return !!this.currentMeeting.sideTopics.length;
    },
    copyButtonText() {
      return this.copied ? 'Copied! ✓' : 'Copy to clipboard';
    },
    burndownDataset() {
      return this.currentMeeting.goals.map(goal => ({
        id: goal.id,
        title: goal.name,
        finishedAt: goal.finishedAt || null,
      }));
    },
    styles() {
      return {
        container: `
        border-radius: 3px;
        padding: 15px;
        border: solid 1px #ddd;
        box-sizing: border-box;
        max-width: 660px;
        color: #333;
        margin: auto;
        font-family: Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';`,
        label: 'font-size: 16px; color: #777;',
        h1: 'font-size: 32px',
        h2: 'font-size: 28px; border-bottom: 1px solid #ddd;',
        h3: 'font-size: 24px;',
        h4: 'font-size: 19px; margin: 15px 0;',
        hr: 'border: 1px solid #ddd; border-top: 1px solid #ccc; margin: 50px 0;',
        textCenter: 'text-align: center;',
        anchor: 'cursor: pointer; color: #967f30; text-decoration: none;',
      };
    },
  },
  methods: {
    onClose() {
      this.$refs.modal.close();
    },
    onCopyClick() {
      this.$twServices.dom
        .copyHtmlToClipboardByElement(this.$refs.emailTemplate);
      this.copied = true;
    },
    onCopyBlur() {
      this.copied = false;
    },
  },
  components: {
    TwTemplatePreviewModalArticle,
    TwTemplatePreviewModalFooter,
    TwTemplatePreviewModalGoals,
    TwTemplatePreviewModalSideTopics,
    TwTemplatePreviewModalTimeCards,
  },
};
</script>
