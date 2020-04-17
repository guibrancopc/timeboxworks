<template>
  <footer class="tw-the-footer">
    <tw-logo type="rounded"/>
  </footer>
</template>

<script>
export default {
  name: 'TwTheFooter',
};
</script>

<style scoped lang="scss">
  .tw-the-footer {
    text-align: center;
    .tw-logo {
      width: 150px;
      opacity: 0.5;
      transition: 0.3s;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>
