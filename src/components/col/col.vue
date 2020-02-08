<template>
  <div class="tw-col">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'tw-col',
};
</script>

<style lang="scss" scoped>
.tw-col {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}
</style>
