<template>
  <div class="default-layout">
    <header class="">
      <div class="header-content">
        <div to="/" class="main-logo pointer" role="button" aria-label="Go to home page" @click="navHome()">
          <img src="https://assets.pokemon.com/assets/cms2/img/misc/gus/buttons/logo-pokemon-79x45.png" alt="site_slug">
        </div>

        <input
          v-model="query"
          type="text"
          placeholder="Search"
          aria-placeholder="Search"
          @keypress.enter="search()"
        >

        <button class="search-btn" @click="search()">Search</button>
        <button class="fav-btn" @click="viewFavorites()">Favorites</button>

        <select v-if="types && types.length" id="types" v-model="type" name="types pointer">
          <option value="">Select Type</option>
          <option v-for="typeName in types" :key="typeName" :value="typeName">{{ typeName }}</option>
        </select>
      </div>
    </header>
    <main class="main-content">
      <Nuxt />
    </main>
    <footer class="">
      <div class="footer-content flex center">
        Website made by Josh Gordon - 2022
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'LayoutDefault',
  data() {
    return {
      type: '',
      query: ''
    };
  },
  async fetch(): Promise<void> {
    await this.$store.dispatch('baseRequest')
  },
  computed: {
    ...mapState(['types','viewingFavorites','searchQuery']),
  },
  watch: {
    async type(newType: string): Promise<void> {
      this.$store.commit('setType', newType)
      await this.$store.dispatch('getPokemon', {
        errorMessage: 'Error Fetching Pokemon By Type'
      })
    },
    query(newQuery: string) {
      this.$store.commit('setSearchQuery', newQuery)
    }
  },
  methods: {
    async search(): Promise<void> {
      await this.$store.dispatch('getPokemon', {
        errorMessage: 'Error Fetching Search Param'
      })
    },
    async viewFavorites(): Promise<void> {
      await this.navHome()
      this.$store.commit('setViewingFavorites', true)
      await this.$store.dispatch('getPokemon', {         
        errorMessage: 'Error Fetching Favorites'
      })
    },
    async clear(): Promise<void> {
      await this.$store.dispatch('clear')
    },
    async navHome(): Promise<void> {
      await this.clear()
      if (this.$route.path !== '/') this.$router.push('/')
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
  input, select {
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
.header-content {
  display: grid;
  gap: 1rem;
  grid-template-areas: "logo search searchButton"
                          "favButton select select";
  @include mobile {
    grid-template-areas: "logo search search"
                          "favButton select select";
  }
  @include desktop {
    grid-template-areas: "logo search searchButton select favButton";
  }
  .main-logo {
    grid-area: logo;
  }
  input {
    grid-area: search;
  }
  .search-btn {
    grid-area: searchButton;
    @include mobile {
      display: none;
    }
  }
  .fav-btn {
    grid-area: favButton;
  }
  select {
    grid-area: select;
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