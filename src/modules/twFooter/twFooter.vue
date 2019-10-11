<template>
  <footer>
    <div id="footer-logo">
      <tw-logo type="rounded"/>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
  #footer-logo {
    text-align: center;
    img {
      width: 150px;
      opacity: 0.5;
      transition: 0.3s;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>