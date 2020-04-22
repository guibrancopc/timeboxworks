<template>
  <p class="tw-p">
    <slot>
      {{ text }}
    </slot>
  </p>
</template>

<script>
export default {
  name: 'TwP',
  props: {
    text: String,
  },
};
</script>

<style scoped>
.tw-paragraph {
  margin-top: 0;
  margin-bottom: 15px;
}
</style>
