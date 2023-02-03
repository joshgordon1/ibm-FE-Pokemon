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



describe('PokeCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(PokeCard, {
      propsData: {
        pokemon: {
          id: 1,
          name: 'Bulbasaur',
          image: 'http://example.com/bulbasaur.png',
          types: ['grass', 'poison'],
          isFavorite: false
        }
      }
    })
  })

  it('renders a NuxtLink component with the correct props', () => {
    const link = wrapper.find('NuxtLink-stub')
    expect(link.exists()).toBe(true)
    expect(link.props().to).toBe('/pokemon/1')
    expect(link.classes()).toContain('pokemon-card')
    expect(link.classes()).toContain('flex')
    expect(link.classes()).toContain('flex-col')
    expect(link.classes()).toContain('typeColor-grass')
  })

  it('renders a div with class "header"', () => {
    const header = wrapper.find('.header')
    expect(header.exists()).toBe(true)
  })

  it('renders an h2 with class "name" and the correct text', () => {
    const name = wrapper.find('.name')
    expect(name.exists()).toBe(true)
    expect(name.text()).toBe('Bulbasaur')
  })

  it('renders a div with class "pokeid" and the correct text', () => {
    const pokeid = wrapper.find('.pokeid')
    expect(pokeid.exists()).toBe(true)
    expect(pokeid.text()).toBe('#1')
  })

  it('renders a favorite-button component with the correct props', () => {
    const button = wrapper.find('favorite-button-stub')
    expect(button.exists()).toBe(true)
    expect(button.props().id).toBe(1)
    expect(button.props().favorited).toBe(false)
  })

  it('renders an img with the correct src and alt', () => {
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes().src).toBe('http://example.com/bulbasaur.png')
    expect(img.attributes().alt).toBe('Bulbasaur')
  })

  it('renders a PokeTypes component with the correct prop', () => {
    const types = wrapper.find('PokeTypes-stub')
    expect(types.exists()).toBe(true)
    expect(types.props().types).toEqual(['grass', 'poison'])
  })
})