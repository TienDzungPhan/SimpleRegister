<template>
  <div id="home">
    <b-jumbotron lead="A Simple Cash Register Web App" bg-variant="white">
      <template v-slot:header>
        <span class="my-brand">Simple Register</span>
      </template>
      <p>Feel free to give it a try!</p>
      <b-button variant="outline-primary" to="orders" size="lg">Start Now</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
#home {
  text-align: center;
}
</style>
