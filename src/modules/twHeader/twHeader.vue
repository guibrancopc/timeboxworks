<template>
  <header>
    <div class="header__wrapper">
      <tw-container>
        <div class="header__content">
          <div class="header__logo-side">
            <router-link to="/">
              <tw-logo width="150px" />
            </router-link>
          </div>
          <div class="header__nav-side">
            <tw-menu />
          </div>
        </div>
      </tw-container>
    </div>
  </header>
</template>

<style lang="scss">

.header__wrapper {
  background-color: #E8E8E8;
  margin-bottom: 45px;
}

.header__content {
  margin: 0 auto;
  padding: 10px;
}

.header__nav-side a {
  display: inline-block;
  padding: 15px;
  color: #3a3d47;
  text-decoration: none;
}

@media screen and (min-width: 1000px) {
  .header__content {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .header__nav-side {
    align-self: center;
  }
}

@media screen and (max-width: 999px) {
  .header__content {
    text-align: center;
  }

  .header__nav-side {
    display: none;
  }
}
</style>