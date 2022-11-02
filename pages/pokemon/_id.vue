<template>
  <div v-if="pokemon" class="pokemon-page flex flex-col">
    <div class="flex between next-prev">
      <button :disabled="pokemon.number === 1" @click="navigatePokemon(true)">← Previous</button>
      <button @click="navigatePokemon(false)">Next →</button>
    </div>
    <div class="flex flex-col pokemon">
      <div class="header flex">
        <h2 class="flex">
          {{ pokemon.name }}
          <div class="pokeid text-gray-300">#{{ pokemon.id}}</div>
        </h2>
        <FavoriteButton :id="pokemon.id" :favorited="pokemon.isFavorite" />
      </div>
      <img :src="pokemon.image" :alt="pokemon.name" class="image pointer">

      <PokeTypes :types="pokemon.types"/>

      <button class="audio pointer" @click="playAudio(pokemon.sound)">Play Audio</button>

      <div class="flex flex-col">
        Max CP:
        <div class="max-cp bg-blue-700">
          {{ pokemon.maxCP }}
        </div>
        Max HP:
        <div class="max-hp bg-red-700">
          {{ pokemon.maxHP }}
        </div>
      </div>
      <div>
        <h3>Height</h3>
        Max: {{ pokemon.height.maximum }}
        Min: {{ pokemon.height.minimum }}
      </div>
      <div>
        <h3>Weight</h3>
        Max: {{ pokemon.weight.maximum }}
        Min: {{ pokemon.weight.minimum }}
      </div>
    </div>
    <div class="evo-container flex flex-col">
      <h3>Previous Evolutions</h3>
      <div class="horizontal-scroll">
        <template v-if="prevEvolutions && prevEvolutions.length">
          <PokeCard v-for="poke in prevEvolutions" :key="`prev${poke.id}`" :pokemon="poke" :mini-card="true"/>
        </template>
        <div v-else class="none-card">
          N/A
        </div>
      </div>
      <h3>Evolutions</h3>
      <div class="horizontal-scroll">
        <template v-if="evolutions && evolutions.length">
          <PokeCard v-for="poke in evolutions" :key="`future${poke.id}`" :pokemon="poke" :mini-card="true"/>
        </template>
        <div v-else class="none-card">
          N/A
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Pokemon, PokemonLink } from '~/types/pokemon'

export default Vue.extend({
  name: 'PokemonPage',
  data() {
    return {
      pokemon: null as Pokemon | null,
    };
  },
  async fetch() {
    this.pokemon = await this.$axios.$get(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${this.$route?.params?.id}`)
  },
  computed: {
    evolutions(): PokemonLink[] | undefined {
      return this.pokemon?.evolutions
    },
    prevEvolutions(): PokemonLink[] | undefined  {
      return this.pokemon?.previousEvolutions
    }
  },
  methods: {
    playAudio(url: string): void {
      new Audio(url).play();
    },
    navigatePokemon(prev: boolean) {
      let currentNumber = this.pokemon?.number
      if (currentNumber) {
        prev ? currentNumber-- : currentNumber++;
        let numStr = currentNumber.toString()
        numStr = numStr.padStart(3, '0')
        window.location.href = `/pokemon/${numStr}`
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.pokemon-page, .pokemon {
  gap: 1rem;
}
.audio {
  width: fit-content;
}
.evo-container {
  gap: 1.5rem;
}
.header {
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 2.5rem;
  }
}
.max-cp, .max-hp {
  padding: 2px 10px;
  height: 16px;
  font-size: 12px;
  line-height: 1;
  border-radius: 8px;
  max-width: 300px;
  width: 100%;
  color: white;
}
.none-card {
  padding: 2rem;
  border: 1px solid grey;
  background-color: lightgray;
  color: grey;
  border-radius: 6px;
}
.image {
  height: auto;
  width: auto;
  margin: auto auto;
  max-height: 300px;
}
</style>