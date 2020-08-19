<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
    class="tw-info-button"
    @click="onInfoButtonClick">&#8505;</button>
</template>

<script>
export default {
  name: 'TwInfoButton',
};
</script>

<style lang="scss" scoped>
.tw-info-button {
  position: absolute;
  right: 0;
  top: 0;
  background-color: transparent;
  border: 1px solid var(--cyan);
  border-radius: 50%;
  color: var(--cyan);
  transition: 0.2s;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: var(--cyan);
    color: var(--white);
  }
}
</style>
