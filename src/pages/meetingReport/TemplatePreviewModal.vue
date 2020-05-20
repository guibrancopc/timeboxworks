<template>
  <tw-modal title="Email template preview" ref="modal" close-on-overlay-click>
    <tw-page>
    <div class="tw-template-preview-modal__main" ref="emailTemplate">
      <div style="box-sizing: border-box;
        color: #333;
        font-family: Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji';
        font-size: 16px;">
        <header>
          <h1>{{ currentMeeting.name }}</h1>
          <label style="color: #777">
            &#9200; From <tw-time-format
              :time="currentMeeting.realStartTime" /> to <tw-time-format
              :time="currentMeeting.realEndTime" />
          </label>
          <tw-template-preview-modal-article
            v-if="currentMeeting.description"
            :text="currentMeeting.description" />
        </header>
        <main>
          <section>
            <h2 style="border-bottom: 1px solid #ddd">Goals</h2>
            <div style="margin-left: 20px">
              <div
                v-for="(goal, index) in currentMeeting.goals"
                style="margin-bottom: 50px"
                :key="goal.name">
                  <h3>{{ index + 1 }}. {{ goal.value }}</h3>
                  <label style="color: #777">
                    &#9200;  <span v-if="goal.finishedAt">Done at </span>
                    <tw-time-format
                      v-if="goal.finishedAt"
                      :time="goal.finishedAt" />
                    <span v-else>Item has not been completed</span>
                  </label>
                  <div v-if="goal.decisions">
                  <h4>Decisions</h4>
                  <tw-template-preview-modal-article
                    :text="goal.decisions" />
                  </div>
              </div>
            </div>
          </section>
          <section>
            <h2 style="border-bottom: 1px solid #ddd">Performance</h2>
            <div style="text-align: center">
              <img
                style="width: 100%;"
                v-if="chartImageSrc"
                :src="chartImageSrc" />
            </div>
            <tw-template-preview-modal-cards :current-meeting="currentMeeting" />
          </section>
        </main>
        <footer style="text-align: center;">
          <hr style="border: 1px solid #ddd; border-top: 1px solid #ccc; margin: 50px 0;"/>
          <div style="margin: 15px;">
            Generated with ❤️ in <a
              style="cursor: pointer;"
              :href="getOriginHref()"
              target="_blank">Timebox Works</a>.
          </div>
          <a :href="getOriginHref()" target="_blank" style="cursor: pointer;">
            <img width="150" height="150" :src="getLogoImageSrc()" alt="Logo Timebox Works" />
          </a>
        </footer>
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
