<template>
  <div class="order">
    <b-card
      :title="order.name"
      :sub-title="order.time.toDate().toString().substring(0,24)"
      sub-title-tag="small"
      :bg-variant="order.completed ? 'border border-success' : ''"
      :text-variant="order.completed ? 'success' : ''"
      @click="updateOrder()"
      class="my-2"
    >
      <div class="my-3">
        <b-card-text
          v-for="item in order.items"
          :key="item.id"
          class="ml-3"
        >
          {{ item.name }} <small class="text-secondary">{{ item.price }}$</small> <b-badge class="ml-3"><i class="fas fa-times fa-xs"></i> {{ item.quantity }}</b-badge>
        </b-card-text>
      </div>
      <hr>
      <b-card-text>
        <h5><strong><i class="fas fa-money-bill-wave"></i> {{ order.total }}$</strong></h5>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
import { ordersDB } from '@/data/db.js'

export default {
  name: 'Order',
  props: {
    order: Object
  },
  data () {
    return {}
  },
  methods: {
    updateOrder () {
      ordersDB.doc(this.order.id).update({
        completed: !this.order.completed
      })
    }
  }
}
</script>

<style scoped>
.order {
    cursor: pointer;
}
</style>
