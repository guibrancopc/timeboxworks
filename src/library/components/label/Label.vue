<template>
  <label
    class="tw-label"
    :class="{'tw-u-font-weight--bold': this.bold }"
    @click="onClick">
    <slot>{{ text }}</slot>
    <span
      v-if="required"
      class="tw-label__required form-control__color--danger">*</span>
  </label>
</template>

<script>
export default {
  name: 'TwLabel',
  props: {
    text: String,
    required: Boolean,
    bold: Boolean,
  },
  methods: {
    onClick(event) {
      event.stopPropagation();
      this.$emit('click', event);
    },
  },
};
</script>
