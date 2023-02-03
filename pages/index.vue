<template>
  <div class="home-page">

    <div class="flex between mb-4">
      <h2 v-if="searchMessage">{{searchMessage}}</h2>
      <h1>{{ pageTitle }}</h1>
      <button class="clear-btn" @click="clear()">Clear Filters/Search</button>
    </div>

    <div class="flex between next-prev mb-4">
      <button :disabled="currentPage === 1" @click="navigatePage(false)">← <span class="mob-hide">Previous Page</span></button>
      <button :disabled="currentPage * limit > count" @click="navigatePage(true)"><span class="mob-hide">Next Page</span> →</button>
    </div>

    <div v-if="loading" class="items-container flex">
      <div v-for="i in limit" :key="i + 'load'" class="card-loading"/>
    </div>
    <div v-else-if="dataAvail" class="items-container flex">
      <PokeCard v-for="poke in displayPokemonData" :key="poke.id" :pokemon="poke"/>
    </div>
    <div v-else class="no-data">
      <div class="flex center">- No Data Available -</div>
    </div>
    <div class="flex between next-prev mt-4">
      <button :disabled="currentPage === 1" @click="navigatePage(false)">← <span class="mob-hide">Previous Page</span></button>
      <FooterPagination />
      <button :disabled="currentPage * limit > count" @click="navigatePage(true)"><span class="mob-hide">Next Page</span> →</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapState } from 'vuex'
import { Pokemon } from '~/types/pokemon'
import { RootState, RootStateMapped } from '~/store'

export default Vue.extend({
  name: 'IndexPage',
  computed: {
    displayPokemonData(): Pokemon[] | undefined {
      return this.pokemon?.items || this.basePokemonData?.items;
    },
    ...mapGetters(['count']),
    ...(mapState([
      'searchMessage',
      'currentPage',
      'basePokemonData',
      'viewingFavorites',
      'pokemon',
      'limit',
      'loading',
      'searchQuery',
      'selectedType'
    ]) as RootStateMapped<RootState>),
    dataAvail(): boolean {
      return !!(this.displayPokemonData as any[])?.length;
    },
    pageTitle() {
      if (this.viewingFavorites) {
        return 'Favorites'
      } else if (this.searchQuery) {
        return `Results for "${this.searchQuery}"`;
      } else if (this.selectedType) {
        return `${this.selectedType} Pokemon`;
      }
      return 'All Pokemon'
    }
  },
  methods: {
    async navigatePage(increment: boolean): Promise<void> {
      if (increment) {
        this.$store.commit('incrementPage')
      } else {
        this.$store.commit('decrementPage')
      }
      await this.$store.dispatch('getPokemon', {
        errorMessage: 'Error Navigating Page'
      })
    },
    async clear(): Promise<void> {
      await this.$store.dispatch('clear')
    }
  }
})
</script> 

<style lang="scss" scoped>
.items-container {
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 1.5rem;
}
.no-data {
  height: 40vh;
  text-align: center;
  text-transform: uppercase;
  .flex {
    height: -webkit-fill-available;
  }
}
.clear-btn {
  font-weight: 600;
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
