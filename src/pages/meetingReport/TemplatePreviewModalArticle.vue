<template>
  <article>
    <p
      style="line-height: 30px; font-size: 20px;"
      v-for="(text, index) in texts" :key="index">{{ text }}</p>
  </article>
</template>

<script>
export default {
  name: 'TwTemplatePreviewModalArticle',
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    texts() {
      const cleanText = removeExcessOfBreakline(this.text);
      return splitByBreakline(cleanText);
    },
  },
};

function removeExcessOfBreakline(text) {
  return text.replace(/[\n\r][\n\r]/g, '\n');
}

function splitByBreakline(text) {
  return text.split(/[\n\r]/g);
}
</script>
