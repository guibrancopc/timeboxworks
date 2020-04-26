<template>
  <div class="tw-row">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TwRow',
};
</script>

<style lang="scss">
.tw-row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.no-gutters {
  margin-right: 0;
  margin-left: 0;
}

.no-gutters > .col,
.no-gutters > [class*="col-"] {
  padding-right: 0;
  padding-left: 0;
}
</style>
