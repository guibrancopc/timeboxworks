<template>
  <button class="tw-close-button" @click="onClick">&times;</button>
</template>

<script>
export default {
  name: 'TwCloseButton',
  methods: {
    onClick(event) {
      this.$emit('close', event);
    },
  },
};
</script>

<style scoped>
.tw-close-button {
  position: absolute;
  top: 0;
  right: 0;
  display: inline-block;
  padding: 5px 10px;
  border: none;
  background-color: transparent;
  outline: none;
  font-size: 20px;
  cursor: pointer;
}
</style>
