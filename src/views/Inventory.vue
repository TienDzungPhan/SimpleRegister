<template>
  <div id="inventory">
    <b-container>
      <b-card no-body>
        <b-tabs
          active-nav-item-class="font-weight-bold text-uppercase"
          content-class="mt-3"
          pills justified small card
        >
          <b-tab title="Grand Menu" active>
            <GrandMenu/>
          </b-tab>
          <b-tab title="Expenses">
            <Expenses/>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import GrandMenu from '@/components/Inventory/GrandMenu'
import Expenses from '@/components/Inventory/Expenses'

export default {
  components: {
    GrandMenu,
    Expenses
  }
}
</script>
