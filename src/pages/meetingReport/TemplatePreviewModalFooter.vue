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
    <div>
      <br>
      <br>
      <ds-p>Have any feedback? Feel free to <a
        target="_blank"
        :href="getFeedbackLink">send us a message</a> whenever you want. :)</ds-p>
      <br>
      <br>
      <br>
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
    getFeedbackLink() {
      return 'https://docs.google.com/forms/d/1OZ7q7SiMusZ9wJfKTiwH-hPkG83hcUdx7emi3TlOWyI';
    },
  },
};
</script>
