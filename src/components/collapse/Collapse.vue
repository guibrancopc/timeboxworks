<template>
  <div
    class="tw-collapse"
    :class="classes">
    <div class="tw-collapse__header" @click="onHeaderClick">
      <button class="tw-collapse__toggle-button">
        <span class="tw-collapse__header-arrow">&#10095;</span>
        <strong size="xs">{{ title }}</strong>
      </button>
      <tw-slim-checkbox
        class="tw-collapse__checkbox"
        v-if="checkboxLabel"
        :label="checkboxLabel"
        :value="checkboxValue"
        :disabled="checkboxDisabled"
        @input="onCheckboxClick" />
    </div>
    <div
      ref="mainContent"
      class="tw-collapse__main-content">
      <tw-gutter full inner>
        <slot />
      </tw-gutter>
    </div>
  </div>
</template>

<script>
const ANIMATION_DELAY = 300;

export default {
  name: 'TwCollapse',
  data() {
    return {
      isCollapseOpened: false,
    };
  },
  mounted() {
    this.isCollapseOpened = this.isOpened;
    this.handleAnimation();
  },
  computed: {
    classes() {
      return {
        'tw-collapse--opened': this.isCollapseOpened,
      };
    },
  },
  watch: {
    isOpened(value) {
      this.isCollapseOpened = value;
      this.handleAnimation();
    },
  },
  props: {
    title: String,
    isOpened: {
      default: null,
      validator(value) {
        return [true, false, null].includes(value);
      },
    },
    checkboxLabel: String,
    checkboxValue: Boolean,
    checkboxDisabled: Boolean,
    closeWhenChecked: Boolean,
  },
  methods: {
    onHeaderClick() {
      this.toggleCollapse();
    },
    toggleCollapse(value) {
      if (value === undefined) {
        this.isCollapseOpened = !this.isCollapseOpened;
      } else {
        this.isCollapseOpened = value;
      }
      this.handleAnimation();
    },
    async handleAnimation() {
      await this.$nextTick();
      this.runSlideToggle();
    },
    async runSlideToggle() {
      if (!this.$refs.mainContent) { return; }
      const { mainContent } = this.$refs;
      if (this.isCollapseOpened) {
        this.setHeightAsScrollHeight(mainContent);
        this.letHeightFlexibleAfterAnimation(mainContent);
      } else {
        this.setHeightAsScrollHeight(mainContent);
        this.triggerCloseAnimation(mainContent);
      }
    },
    setHeightAsScrollHeight(mainContent) {
      mainContent.style.maxHeight = `${mainContent.scrollHeight}px`;
    },
    letHeightFlexibleAfterAnimation(mainContent) {
      setTimeout(() => {
        mainContent.style.maxHeight = 'inherit';
      }, ANIMATION_DELAY);
    },
    triggerCloseAnimation(mainContent) {
      setTimeout(() => {
        mainContent.style.maxHeight = null;
      });
    },
    onCheckboxClick(value) {
      this.$emit('checkbox-click', { value });
      if (this.closeWhenChecked) {
        this.toggleCollapse(!value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Collapse.scss';
</style>
