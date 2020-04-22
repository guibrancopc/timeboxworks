<template>
  <article class="tw-article">
    <tw-p v-for="(text, index) in texts" :key="index">{{ text }}</tw-p>
  </article>
</template>

<script>
import TwP from '../paragraph/Paragraph.vue';

export default {
  name: 'TwArticle',
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
  components: {
    TwP,
  },
};

function removeExcessOfBreakline(text) {
  return text.replace(/[\n\r][\n\r]/g, '\n');
}

function splitByBreakline(text) {
  return text.split(/[\n\r]/g);
}
</script>
