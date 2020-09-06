<template>
  <div class="tw-box">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TwBox',
};
</script>

<style lang="scss" scoped>
.tw-box {
  border-radius: 0.3rem;
  margin: 15px 0;
  padding: 15px;
  background-color: var(--white);
  box-shadow: 0px 2px 13px var(--gray-light);
}
</style>
