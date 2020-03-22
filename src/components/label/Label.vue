<template>
  <label
    class="tw-label"
    @click="onClick">
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
    text: String,
    required: Boolean,
  },
  methods: {
    onClick(event) {
      event.stopPropagation();
      this.$emit('click', event);
    },
  },
};
</script>
