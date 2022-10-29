<template>
  <div v-if="pokemon">
    <div :key="pokemon.id" class="flex-col pokemon">
        <img :src="pokemon.image" :alt="pokemon.name" class="image">
        <h2>{{ pokemon.name }}</h2>
        <PokeTypes :types="pokemon.types"/>
        <favorite-button :id="pokemon.id" :favorited="pokemon.isFavorite" />
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'PokemonPage',
  data() {
    return {
      pokemon: null,
    };
  },
  async fetch() {
    this.pokemon = await this.$axios.$get(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${this.$route?.params?.id}`)
  },
})
</script>

<style lang="scss" scoped>
.image {
  height: auto;
  width: auto;
  margin: auto auto;
  max-height: 300px;
}
</style>