<template>
  <label
    class="tw-label"
    :for="inputId">
    {{ text }}
    <span
      v-if="required"
      class="tw-label__required form-control__color--danger">*</span>
  </label>
</template>

<script>
export default {
  name: 'TwLabel',
  props: {
    for: String,
    text: String,
    required: Boolean,
  },
  computed: {
    inputId() {
      return this.for;
    },
  },
};
</script>
