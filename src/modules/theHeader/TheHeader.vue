<template>
    <header class="tw-the-header">
      <tw-container full-width>
        <div class="tw-the-header__content">
          <div class="tw-the-header__logo-side">
            <router-link to="/">
              <tw-the-logo :width="150" />
            </router-link>
          </div>
          <div class="tw-the-header__nav-side">
            <tw-the-menu />
          </div>
        </div>
      </tw-container>
  </header>
</template>

<script>
import TwTheMenu from '../theMenu/TheMenu.vue';

export default {
  name: 'TwTheHeader',
  components: {
    TwTheMenu,
  },
};
</script>

<style scoped>
.tw-the-header {
  background-color: #E8E8E8;
  margin-bottom: 45px;
}

.tw-the-header__content {
  margin: 0 auto;
  padding: 10px;
}

.tw-the-header__nav-side a {
  display: inline-block;
  padding: 15px;
  color: #3a3d47;
  text-decoration: none;
}

@media screen and (min-width: 1000px) {
  .tw-the-header__content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .tw-the-header__nav-side {
    align-self: center;
  }
}

@media screen and (max-width: 999px) {
  .tw-the-header__content {
    text-align: center;
  }

  .tw-the-header__nav-side {
    display: none;
  }
}
</style>
