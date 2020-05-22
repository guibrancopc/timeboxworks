<template>
  <tw-modal title="Email template preview" ref="modal" width="md" close-on-overlay-click>
    <tw-page>
    <div class="tw-template-preview-modal__main" ref="emailTemplate">
      <div :style="styles.container">
        <header>
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
        </header>
        <main>
          <section>
            <h2 :style="styles.h2">Goals</h2>
            <div style="margin-left: 20px">
              <div
                v-for="(goal, index) in currentMeeting.goals"
                style="margin-bottom: 50px"
                :key="goal.name">
                  <h3 :style="styles.h3">{{ index + 1 }}. {{ goal.value }}</h3>
                  <label :style="styles.label">
                    &#9200;  <span v-if="goal.finishedAt">Done at </span>
                    <tw-time-format
                      v-if="goal.finishedAt"
                      :time="goal.finishedAt" />
                    <span v-else>Item has not been completed</span>
                  </label>
                  <div v-if="goal.decisions">
                    <h4 :style="styles.h4">Notes</h4>
                    <tw-template-preview-modal-article
                      :text="goal.decisions" />
                  </div>
              </div>
            </div>
          </section>
          <section>
            <h2 :style="styles.h2">Performance</h2>
            <div>
              <center>
                <img
                  width="100%"
                  v-if="chartImageSrc"
                  :src="chartImageSrc" />
              </center>
            </div>
            <tw-template-preview-modal-cards :current-meeting="currentMeeting" />
          </section>
        </main>
        <div :style="styles.textCenter">
          <hr :style="styles.hr"/>
          <div style="margin: 15px; text-align: center;">
            Generated with ❤️ in <a
              :style="styles.anchor"
              :href="getOriginHref()"
              target="_blank">Timebox Works</a>.
          </div>
          <div style="text-align: center;">
            <a :href="getOriginHref()" target="_blank" :style="styles.anchor">
              <img width="150" height="150" :src="getLogoImageSrc()" alt="Logo Timebox Works" />
            </a>
          </div>
        </div>
      </div>
    </div>
    </tw-page>
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
import TwTemplatePreviewModalCards from './TemplatePreviewModalCards.vue';
import roundedLogo from '../../assets/images/logos/timebox-works_logo-rounded.png';

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
    copyButtonText() {
      return this.copied ? 'Copied! ✓' : 'Copy to clipboard';
    },
    burndownDataset() {
      return this.currentMeeting.goals.map(goal => ({
        id: goal.name,
        title: goal.value,
        finishedAt: goal.finishedAt || null,
      }));
    },
    styles() {
      return {
        container: `box-sizing: border-box;
        color: #333;
        margin: auto;
        font-family: Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';`,
        label: 'font-size: 16px; color: #777;',
        h1: 'font-size: 32px',
        h2: 'font-size: 28px; border-bottom: 1px solid #ddd;',
        h3: 'font-size: 24px;',
        h4: 'font-size: 21px;',
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
    onGetChartImage(chartImageSrc) {
      this.chartImageSrc = chartImageSrc;
    },
    getOriginHref() {
      return window.origin;
    },
    getLogoImageSrc() {
      return roundedLogo;
    },
  },
  components: {
    TwTemplatePreviewModalArticle,
    TwTemplatePreviewModalCards,
  },
};
</script>
