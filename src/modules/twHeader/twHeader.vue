<template>
  <header>
    <div class="header__wrapper">
      <div class="header__content">
        <div class="header__logo-side">
          <tw-logo width="150px" />
        </div>
        <div class="header__nav-side">
          <nav>
            <router-link to="/">Meeting Form</router-link> |
            <router-link to="/meeting/dashboard">Meeting Dashboard</router-link> |
            <router-link to="/meeting/report">Meeting Report</router-link>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">

.header__wrapper {
  background-color: #E8E8E8;
}

.header__content {
  max-width: 1000px;
  margin: 0 auto;
  padding: 10px;
}

.header__nav-side a {
  display: inline-block;
  padding: 20px;
  color: #3a3d47;
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