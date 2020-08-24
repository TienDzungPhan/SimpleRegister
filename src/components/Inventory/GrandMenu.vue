<template>
  <div id="grand-menu">
    <b-list-group flush>
      <b-list-group-item
        v-for="item in menu"
        :key="item.id"
        class="clearfix"
      >
        <span class="float-left">
          {{ item.name }} <small class="text-secondary">{{ item.price }}$</small>
        </span>
        <b-button-group class="float-right">
          <b-button v-b-modal.menu-change @click="setUpdateData(item)" variant="outline-primary" size="sm"><i class="fas fa-edit"></i></b-button>
          <b-button @click="deleteItem(item)" variant="outline-danger" size="sm"><i class="fas fa-trash-alt"></i></b-button>
        </b-button-group>
      </b-list-group-item>
    </b-list-group>
    <b-button v-b-modal.menu-change block variant="success" class="mt-3"><i class="fas fa-plus"></i> Add new item</b-button>
    <b-modal
      title="Menu Change"
      id="menu-change"
      ok-title="Save"
      @ok="saveMenu()"
      @cancel="resetData()"
    >
      <b-form-group
        label="Item name"
        label-for="item-name"
      >
        <b-form-input id="item-name" v-model="itemName"></b-form-input>
      </b-form-group>
      <b-form-group
        label="Item price"
        label-for="item-price"
      >
        <b-form-input type="number" min="0" id="item-price" v-model="itemPrice"></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import { menuDB } from '@/data/db'

export default {
  data () {
    return {
      menu: [],
      itemId: '',
      itemName: '',
      itemPrice: 0
    }
  },
  firestore: {
    menu: menuDB
  },
  methods: {
    saveMenu () {
      if (this.itemId !== '') {
        menuDB.doc(this.itemId).update({
          name: this.itemName,
          price: this.itemPrice
        })
      } else {
        menuDB.add({
          name: this.itemName,
          price: this.itemPrice
        })
      }
      this.itemId = ''
      this.itemName = ''
      this.itemPrice = 0
    },
    setUpdateData (item) {
      this.itemId = item.id
      this.itemName = item.name
      this.itemPrice = item.price
    },
    resetData () {
      this.itemId = ''
      this.itemName = ''
      this.itemPrice = 0
    },
    deleteItem (item) {
      menuDB.doc(item.id).delete()
    }
  }
}
</script>
