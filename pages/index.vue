<template>
  <div>
    <div class="items-container flex">
      <PokeCard v-for="poke in pokemon.items" :key="poke.id" :pokemon="poke"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      pokemon: [],
      baseUrl: 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/'
    };
  },
  async fetch() {
    this.pokemon = await this.$axios.$get(`${this.baseUrl}?limit=20`)
  },
  methods: {
    async search() {
      this.pokemon = await this.$axios.$get(`${this.baseUrl}?search=test`)
    }
  }
})
</script> 

<style lang="scss" scoped>
.items-container {
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
