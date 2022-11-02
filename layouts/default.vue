<template>
  <div class="default-layout">
    <header class="">
      <div class="header-content">
        <nuxt-link to="/">All Pokemon</nuxt-link>
        <input v-model="searchQuery" type="text">
        <button @click="search()">Search</button>
        <button @click="clear()">Clear Results</button>
        <button @click="viewFavorites()">Favorites</button>
      </div>
    </header>
    <div class="main-content">
      <Nuxt />
    </div>
    <footer class="">
      <div class="footer-content">
        <nuxt-link to="/">Home</nuxt-link>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutDefault',
  data() {
    return {
      searchQuery: '',
    };
  },
  
  methods: {
    async search() {
      await this.$store.dispatch('searchPokemon', this.searchQuery)
    },
    async viewFavorites() {
      await this.$store.dispatch('searchFavorites')
    },
    async clear() {
      await this.$store.dispatch('clear')
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  background-color: #3B4CCA;
  color: white;
  position: sticky;
  z-index: 5;
  top: 0;
  padding: 1rem 0;
  input {
    color: black;
  }
}
footer {
  background-color: darkgray;
  color: white;
  padding: 1rem 0;
}
.main-content, .header-content, .footer-content {
  margin: 0 auto;
  max-width: calc(100vw - 2rem);
  @include desktop {
    max-width: calc(#{$screen-lg-min} - 2rem);
  }
  @include xl {
    max-width: calc(#{$screen-xl-min} - 2rem);
  }
}
.main-content {
  margin-top: 1rem;
  margin-bottom: 1rem;
  min-height: calc(100vh - 112px);
  @include desktop {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
</style>