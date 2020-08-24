<template>
    <div id="orders">
      <Order
        v-for="order in orders"
        v-bind:key="order.id"
        v-bind:order="order"
      />
    </div>
</template>

<script>
import { ordersDB } from '../data/db.js'
import Order from '../components/Orders/Order.vue'

export default {
  data () {
    return {
      orders: []
    }
  },
  firestore: {
    orders: ordersDB.orderBy('time', 'desc')
  },
  components: {
    Order
  }
}
</script>

<style scoped>
#orders {
    margin-top: 70px;
    margin-bottom: 70px;
}
</style>
