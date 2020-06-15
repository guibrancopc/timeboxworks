<template>
  <div>
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
</template>

<script>
import roundedLogo from '../../assets/images/logos/timebox-works_logo-rounded.png';

export default {
  name: 'TwTemplatePreviewModalFooter',
  props: {
    styles: Object,
  },
  methods: {
    getOriginHref() {
      return window.origin;
    },
    getLogoImageSrc() {
      return roundedLogo;
    },
  },
};
</script>
