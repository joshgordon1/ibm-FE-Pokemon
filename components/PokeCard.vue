<template>
  <NuxtLink :to="`/pokemon/${pokemon.id}`" :class="['pokemon-card flex flex-col', { 'mini-card' : miniCard}, typeColor(mainType)]">
    <div class="header flex">
      <h2 class="name">{{ pokemon.name }}</h2>
      <div class="pokeid text-gray-300">#{{ pokemon.id}}</div>
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
// TODO - improve mobile styles
.pokemon-card {
  border: 10px solid #ffcb05;
  border-radius: 12px;
  padding: 0.75rem;
  gap: 0.75rem;
  @include mobile {
    &:not(.mini-card) {
      display: grid;
      grid-template-areas: "image header"
                            "image types";
      grid-template-columns: 30% calc(70% - 13px);
      .header {
        grid-area: header;
      }
      .image {
        grid-area: image;
      }
      .types {
        grid-area: types;
      }
    }
  }
  @include tablet {
    width: 300px;
    min-height: 450px;
  }
  @include desktop {
    width: 300px;
    min-height: 450px;
  }
  &:hover {
    transform: scale(1.05);
  }
  &.mini-card {
    width: 200px;
    min-width: 200px;
    min-height: unset;
    border-width: 6px;
    border-radius: 6px;
    .name {
      font-size: 16px;
    }
    .favorite {
      font-size: 25px;
    }
    .image {
      max-height: 150px;
    }
    .types::v-deep {
      gap: 0.5rem;
      .type{
        padding: 4px;
        font-size: 0.75rem;
      }
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
  display: grid;
  grid-template-areas: "id fav"
                        "name name";
  .name {
    grid-area: name;
    font-size: 24px;
    @include desktop {
      font-size: 30px;
    }
  }
  .pokeid {
    grid-area: id;
  }
  .favorite {
    grid-area: fav;
  }
}
</style>
