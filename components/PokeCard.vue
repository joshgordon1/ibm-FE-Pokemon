<template>
  <NuxtLink :to="`/pokemon/${pokemon.id}`" :class="['pokemon-card flex flex-col', { 'mini-card' : miniCard}, typeColor(mainType)]">
    <div class="header flex">
      <h2 class="flex">
        {{ pokemon.name }}
        <div class="pokeid text-gray-300">#{{ pokemon.id}}</div>
      </h2>
      <favorite-button :id="pokemon.id" :favorited="pokemon.isFavorite" />
    </div>
    <img :src="pokemon.image" :alt="pokemon.name" class="image">
    <PokeTypes :types="pokemon.types" />
  </NuxtLink>
</template>

<script lang="ts">
import Vue from 'vue'
import { PokemonLink } from '~/types/pokemon'
import { getTypeBGColor } from '~/util/color'

export default Vue.extend({
  props: {
    pokemon: {
      type: Object as () => PokemonLink,
      required: true
    },
    miniCard: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mainType(): string {
      return this.pokemon?.types?.length ? this.pokemon.types[0] : ''
    }
  },
  methods: {
    typeColor(type: string) {
      return getTypeBGColor(type)
    }
  }
})
</script> 

<style lang="scss" scoped>
.pokemon-card {
  border: 10px solid #ffcb05;
  border-radius: 12px;
  padding: 0.75rem;
  gap: 0.75rem;
  width: 150px;
  @include desktop {
    width: 300px;
  }
  &:hover {
    transform: scale(1.05);
  }
  &.mini-card {
    width: 150px;
    border-width: 6px;
    border-radius: 6px;
    .favorite {
      font-size: 25px;
    }
    .types::v-deep {
      gap: 0.5rem;
      .type {
        padding: 4px;
        font-size: 0.75rem;
      }
    }
    .image {
      max-height: 150px;
    }
  }
}
.image {
  height: auto;
  width: auto;
  margin: auto auto;
  max-height: 300px;
  border: 4px solid #B3A125;
  border-radius: 4px;
  background-color: #424242;
}
.header {
  justify-content: space-between;
  align-items: center;
}
</style>
