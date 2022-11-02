import { GetterTree, ActionTree, MutationTree } from 'vuex'
// import Vue from 'vue'
import { ApiResponse } from '~/types/pokemon'



export const state = () => ({
  pokemon: undefined as ApiResponse | undefined,
  basePokemonData: undefined as ApiResponse | undefined,
  searchMessage: '',
  apiBaseUrl: 'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/',
  limit: 20,
  currentPage: 1,
  loading: false
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  count: state => state?.pokemon?.count,
}

export const mutations: MutationTree<RootState> = {
  setPokemon(state, pokemon: ApiResponse) {
    state.pokemon = undefined
    state.pokemon = pokemon
  },
  setBasePokemon(state, pokemon: ApiResponse) {
    state.basePokemonData = undefined
    state.basePokemonData = pokemon
  },
  setSearchMessage(state, message) {
    state.searchMessage = message
  },
  setPage(state, pageNum) {
    state.currentPage = pageNum
  },
  incrementPage(state) {
    state.currentPage = state.currentPage + 1
  },
  decrementPage(state) {
    state.currentPage = state.currentPage - 1
  },
  setLoading(state, isLoading) {
    state.loading = isLoading
  },
}

// TODO - LIMITS
export const actions: ActionTree<RootState, RootState> = {
  async baseRequest({ commit, state }): Promise<void> {
    try {
      commit('setLoading', true)
      const pokemon = await this.$axios.$get(`${state.apiBaseUrl}?limit=${state.limit}`)
      commit('setPokemon', pokemon)
      commit('setBasePokemon', pokemon)
    } catch (error) {
      console.log('Error Fetching Base Request', error)
    } finally {
      commit('setLoading', false)
    }
  },
  async getPokemon({ commit, state }, { isFavorite = false, searchQuery = undefined, errorMessage = 'Error Fetching Pokemon' }): Promise<void> {
    try {
      commit('setLoading', true)
      const pokemon = await this.$axios.$get(`${state.apiBaseUrl}?limit=${state.limit}&search=${searchQuery}`)
      commit('setPokemon', pokemon)
      commit('setSearchMessage', `${pokemon?.items?.count} Results`)
    } catch (error) {
      commit('setSearchMessage', 'No Results')
      console.log(errorMessage, error)
    } finally {
      commit('setLoading', false)
    }
  },
  async searchPokemon({ commit, state }, searchQuery: string): Promise<void> {
    try {
      commit('setLoading', true)
      const pokemon = await this.$axios.$get(`${state.apiBaseUrl}?search=${searchQuery}&limit=${state.limit}`)
      commit('setPokemon', pokemon)
      commit('setSearchMessage', `${pokemon?.items?.count} Results`)
    } catch (error) {
      commit('setSearchMessage', 'No Results')
      console.log('Error Fetching Search Param', error)
    } finally {
      commit('setLoading', false)
    }
  },
  async searchFavorites({ commit, state }): Promise<void> {
    try {
      commit('setLoading', true)
      const pokemon = await this.$axios.$get(`${state.apiBaseUrl}?isFavorite=true&offset=${(state.currentPage - 1) * state.limit}&limit=${state.limit}`)
      commit('setPokemon', pokemon)
      commit('setSearchMessage', `${pokemon?.items?.count} Results`)
    } catch (error) {
      commit('setSearchMessage', 'No Results')
      console.log('Error Fetching Favorites', error)
    } finally {
      commit('setLoading', false)
    }
  },
  async navigatePage({commit, state }) {
    try {
      commit('setLoading', true)
      const pokemon = await this.$axios.$get(`${state.apiBaseUrl}?offset=${(state.currentPage - 1) * state.limit}&limit=${state.limit}`)
      commit('setPokemon', pokemon)
    } catch (error) {
      console.log('Error Navigating Pages', error)
    } finally {
      commit('setLoading', false)
    }
  },
  clear({ commit }): void {
    commit('setPokemon', null)
    commit('setSearchMessage', '')
    commit('setPage', 1)
  },
}