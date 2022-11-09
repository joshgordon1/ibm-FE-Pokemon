import { mount, shallowMount } from '@vue/test-utils' // createLocalVue
// import Vuex from 'vuex'
import Vue from 'vue'
import PokeCard from '../components/PokeCard.vue'
import FavoriteButton from '../components/FavoriteButton.vue'
import PokeTypes from '../components/PokeTypes.vue'

const pokemonCardData = {
  id: "001",
  number: 1,
  name: "Bulbasaur",
  image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
  isFavorite: true,
  types: ["Grass", "Poison"]
}

describe('PokeCard.vue', () => {
  test('Pokemon Card Component Mounts', () => {
    const wrapper = shallowMount(PokeCard, {
      propsData: {
        pokemon: pokemonCardData,
        miniCard: false
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('Pokemon Card Name is Displayed', () => {
    const wrapper = shallowMount(PokeCard, {
      propsData: {
        pokemon: pokemonCardData,
        miniCard: false
      }
    })
    // const name = wrapper.get('h2')
    expect(wrapper.html()).toContain(pokemonCardData.name)
  })
})

describe('FavoriteButton.vue', () => {
  test('FavoriteButton Component Mounts', () => {
    const wrapper = shallowMount(FavoriteButton, {
      propsData: {
        favorited: true,
        id: pokemonCardData.id
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })

  test('Favorite button click - favorite', async () => {
    const wrapper = mount(FavoriteButton, {
      propsData: {
        favorited: false,
        id: pokemonCardData.id
      }
    })
    wrapper.vm.toggleFav()
    await Vue.nextTick()
    expect(wrapper.vm.isFavorited).toBe(true)
    expect(wrapper.text()).toContain('♥')
  })

  test('Favorite button click - unfavorite', async () => {
    const wrapper = mount(FavoriteButton, {
      propsData: {
        favorited: true,
        id: pokemonCardData.id
      }
    })
    wrapper.vm.toggleFav()
    await Vue.nextTick()
    expect(wrapper.vm.isFavorited).toBe(false)
    expect(wrapper.text()).toContain('♡')
  })
})

describe('PokeTypes.vue', () => {
  test('PokeTypes Component Mounts', () => {
    const wrapper = shallowMount(PokeTypes, {
      propsData: {
        types: pokemonCardData.types
      }
    })
    expect(wrapper.vm).toBeTruthy()
  })
})
