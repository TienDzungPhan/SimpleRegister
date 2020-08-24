<template>
  <div id="app">
    <b-navbar type="dark" variant="primary" fixed="top">
      <b-container>
        <b-navbar-brand to="/" class="my-brand">Simple Register <b-badge>DEMO</b-badge></b-navbar-brand>
        <b-navbar-nav class="main-item">
          <b-nav-item to="/orders" class="mx-2"><i class="fas fa-receipt fa-lg"></i></b-nav-item>
          <b-nav-item to="/sales" class="mx-2"><i class="fas fa-chart-line fa-lg"></i></b-nav-item>
          <b-nav-item to="/inventory" class="mx-2"><i class="fas fa-warehouse"></i></b-nav-item>
          <b-button v-b-modal.cashier variant="success" class="mx-2 px-3"><i class="fas fa-cash-register fa-lg"></i></b-button>
        </b-navbar-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="right-nav ml-auto">
          <b-nav-item to="/profile">
            <b-avatar
              text="DP"
              src="https://media-exp1.licdn.com/dms/image/C4E03AQEubUH2NLLpZg/profile-displayphoto-shrink_200_200/0?e=1603324800&v=beta&t=FfYGbCJIaXs1i71RCH9siX1bpy76puZLdC85OuLE7GE"
            ></b-avatar>
          </b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>

    <b-navbar type="light" variant="light" fixed="bottom" class="border mobile-navbar">
      <b-navbar-nav class="w-100 d-flex justify-content-around">
        <b-nav-item to="/orders"><i class="fas fa-receipt fa-lg"></i></b-nav-item>
        <b-nav-item to="/sales"><i class="fas fa-chart-line fa-lg"></i></b-nav-item>
        <b-nav-item to="/inventory"><i class="fas fa-warehouse"></i></b-nav-item>
        <b-button v-b-modal.cashier variant="success" class="ml-2 px-3"><i class="fas fa-cash-register fa-lg"></i></b-button>
      </b-navbar-nav>
    </b-navbar>

    <Cashier/>

    <b-container class="main-content">
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import Cashier from '@/components/Cashier'

export default {
  components: {
    Cashier
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Comfortaa|Pacifico&display=swap');

body {
  font-family: Comfortaa, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.my-brand {
  font-family: Pacifico, Comfortaa, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a.nav-link.router-link-exact-active {
  color: white !important;
}

.mobile-navbar .nav-link.router-link-exact-active {
  color: #007bff !important;
}

.right-nav .nav-link {
  padding-top: 0;
  padding-bottom: 0;
}

.main-content {
  margin-top: 70px;
  margin-bottom: 70px;
}

@media screen and (max-width: 767px) {
  .main-item {
    display: none;
  }
}

@media screen and (min-width: 768px) {
  .mobile-navbar {
    display: none;
  }
}
</style>
