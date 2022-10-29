<template>
  <div>
    <div class="items-container flex">
      <NuxtLink v-for="poke in pokemon.items" :key="poke.id" class="flex-col pokemon" :to="`/pokemon/${poke.id}`">
        <img :src="poke.image" :alt="poke.name" class="image">
        <h2>{{ poke.name }}</h2>
        <PokeTypes :types="poke.types"/>
        <favorite-button :id="poke.id" :favorited="poke.isFavorite" />
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      pokemon: []
    };
  },
  async fetch() {
    this.pokemon = await this.$axios.$get('https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/?limit=20')
  },
  methods: {
  }
})
</script> 

<style lang="scss" scoped>
.pokemon {
  border: 1px solid black;
  border-radius: 4px;
  padding: 1rem;
  width: 300px;
  @include mobile {
    width: 150px;
  }
  .image {
    height: auto;
    width: auto;
    margin: auto auto;
    max-height: 300px;
  }
}
.items-container {
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
