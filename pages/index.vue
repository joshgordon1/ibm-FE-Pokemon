<template>
  <div>
    <h1 v-if="searchMessage">{{searchMessage}}</h1>

    <!-- TODO - button show logic -->
    <div class="flex between next-prev mb-4">
      <button :disabled="currentPage === 1" @click="navigatePage(false)">← Previous Page</button>
      <button :disabled="currentPage * limit > count" @click="navigatePage(true)">Next Page →</button>
    </div>
    <button @click="clear()">Clear Results</button>

    <div v-if="loading" class="items-container flex">
      <div v-for="i in limit" :key="i + 'load'" class="card-loading"/>
    </div>
    <div v-else-if="dataAvail" class="items-container flex">
      <PokeCard v-for="poke in displayPokemonData" :key="poke.id" :pokemon="poke"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import { Pokemon } from '~/types/pokemon'

export default Vue.extend({
  name: 'IndexPage',
  async fetch() {
    await this.$store.dispatch('baseRequest')
  },
  computed: {
    ...mapGetters(['count']),
    ...mapState(['searchMessage', 'currentPage', 'basePokemonData', 'pokemon', 'limit', 'loading']),
    displayPokemonData(): Pokemon[] | undefined {
      return this.pokemon?.items || this.basePokemonData?.items
    },
    dataAvail(): boolean {
      return !!this.displayPokemonData?.length
    }
  },
  methods: {
    async navigatePage(increment: boolean) {
      if (increment) {
        this.$store.commit('incrementPage')
      } else {
        this.$store.commit('decrementPage')
      }
      await this.$store.dispatch('navigatePage')
    },
    async clear() {
      await this.$store.dispatch('clear')
    }
  }
})
</script> 

<style lang="scss" scoped>
.items-container {
  gap: 1rem;
  flex-wrap: wrap;
}
.card-loading {
  background-color: grey;
  border-radius: 12px;
  padding: 0.75rem;
  gap: 0.75rem;
  width: 200px;
  height: 320px;
  @include desktop {
    width: 300px;
    height: 450px;
  }
}
</style>
