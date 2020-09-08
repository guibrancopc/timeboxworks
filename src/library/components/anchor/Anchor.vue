<template>
  <a
    class="tw-a"
    v-bind="$attrs"
    v-on="$listeners">
    <slot />
  </a>
</template>

<script>
export default {
  name: 'TwA',
};
</script>

<style scoped lang="scss">
.tw-a {
  &, &:visited, &:active{
    color: var(--blue);
    text-decoration: none;
  };
  &:hover {
    text-decoration: underline;
  }
}
</style>
