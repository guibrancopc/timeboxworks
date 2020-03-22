<template>
  <span class="tw-checkbox">
    <input
      class="tw-checkbox"
      type="checkbox"
      ref="checkboxInput"
      :id="htmlId"
      :checked="value"
      :disabled="disabled"
      v-on="$attrs"
      @input="onInput"
      @click="onClick"
      @change="onChange"/>
    <tw-label
      v-if="label"
      :text="label"
      @click="onLabelClick"/>
  </span>
</template>

<script>
export default {
  name: 'TwCheckbox',
  inheritAttrs: false,
  props: {
    value: Boolean,
    label: String,
    required: Boolean,
    disabled: Boolean,
    htmlId: String,
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.checked);
    },
    onClick(event) {
      event.stopPropagation();
      this.$emit('click', event);
    },
    onChange(event) {
      this.$emit('change', event);
    },
    onLabelClick() {
      this.$refs.checkboxInput.click();
    },
  },
};
</script>

<style scoped>
.tw-checkbox {
  vertical-align: text-top;
}
</style>
