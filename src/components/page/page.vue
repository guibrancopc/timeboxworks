<template>
  <div class="tw-page">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TwPage',
};
</script>

<style lang="scss">
  .tw-page {
    border: solid 1px var(--gray-light);
    border-radius: 0.3rem;
    margin: 15px 0;
    padding: 15px;
    box-shadow: 0px 2px 13px var(--gray-light);
    background-color: var(--white)
  }
</style>
