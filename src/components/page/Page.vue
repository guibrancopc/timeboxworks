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

<style>
.tw-page {
  border: var(--border);
  border-radius: 0.3rem;
  margin: 15px 0;
  padding: 15px;
  box-shadow: 0px 2px 13px var(--gray-light);
  background-color: var(--white)
}
</style>
