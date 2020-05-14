<template>
  <div v-if="shouldShowContainer" class="tw-modal">
    <tw-animation
      enter-active-class="fadeIn"
      leave-active-class="fadeOut">
      <div v-if="shouldShowDialog" class="tw-modal__overlay" @click="onOverlayClick"></div>
    </tw-animation>
    <tw-animation
      enter-active-class="bounceInDown"
      leave-active-class="bounceOutUp">
      <div
        v-if="shouldShowDialog"
        role="dialog"
        class="tw-modal__container tw-u-overflow-y--scroll tw-u-overflow-scroll--invisible"
        :class="dialogWidth"
        @click="onOverlayClick">
        <tw-container>
          <tw-header v-if="title || $slots.header">
            <slot v-if="shouldShowHeader" name="header">
              <tw-heading size="sm" :title="title" />
            </slot>
            <tw-divider />
          </tw-header>
          <main class="tw-modal__body">
            <slot />
          </main>
          <tw-footer v-if="$slots.footer || $slots.footerRight">
            <slot name="footer" slot="left" />
            <slot name="footerRight" slot="right" />
          </tw-footer>
          <tw-close-button @close="close" v-if="!disableCloseButton" />
        </tw-container>
      </div>
    </tw-animation>
  </div>
</template>

<script>
import {
  cleanDOM,
  isTargetElementOfEvent,
  addBlurBackground,
  removeBlurBackgroundWhenIsLastModal,
  addBodyScrollbar,
  removeBodyScrollbar,
  addKeyupListener,
  removeKeyupListener,
} from './ModalService';

export default {
  name: 'TwModal',
  data() {
    return {
      shouldOpenModal: false,
      shouldShowContainer: false,
      shouldShowDialog: false,
      shouldShowOverlay: false,
    };
  },
  props: {
    title: String,
    disableCloseButton: Boolean,
    closeOnOverlayClick: Boolean,
    width: {
      type: String,
      default: 'lg',
      validator(value) {
        return ['lg', 'md', 'sm', 'xs']
          .includes(value);
      },
    },
  },
  watch: {
    shouldOpenModal(value) {
      const DURATION = 300;

      if (value) {
        this.openingHandler(DURATION);
      } else {
        this.closingHandler(DURATION);
      }
    },
  },
  computed: {
    shouldShowHeader() {
      return !!this.title || !!this.$slots.header;
    },
    dialogWidth() {
      return `tw-modal__container--${this.width}`;
    },
  },
  methods: {
    open() {
      this.shouldOpenModal = true;
    },
    close() {
      this.shouldOpenModal = false;
      this.$emit('closed');
    },
    onOverlayClick(e) {
      if (this.closeOnOverlayClick && isTargetElementOfEvent(e)) {
        this.close();
      }
    },
    openingHandler(DURATION) {
      this.shouldShowContainer = true;
      setTimeout(() => {
        this.shouldShowDialog = true;
      });
      setTimeout(() => {
        this.shouldShowOverlay = true;
      }, DURATION);
    },
    closingHandler(DURATION) {
      removeBlurBackgroundWhenIsLastModal();
      addBodyScrollbar();
      this.shouldShowDialog = false;
      setTimeout(() => {
        this.shouldShowOverlay = false;
      }, DURATION);
      setTimeout(() => {
        this.shouldShowContainer = false;
      }, DURATION * 2);
      setTimeout(() => {
        this.$parent.$destroy();
      }, DURATION * 4);
    },
    escapeClosingHandler(event) {
      if (event.key === 'Escape' && !this.disableCloseButton) {
        this.close();
      }
    },
  },
  mounted() {
    this.open();
    addBlurBackground();
    removeBodyScrollbar();
    addKeyupListener(this.escapeClosingHandler);
  },
  beforeDestroy() {
    cleanDOM(this.$el);
    removeKeyupListener(this.escapeClosingHandler);
  },
};
</script>

<style scoped lang="scss">
@import './Modal.scss';
</style>
