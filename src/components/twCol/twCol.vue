<template>
  <div class="col">
    <slot></slot>
  </div>
</template>

<style lang="scss">
.col {
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
}
</style>
