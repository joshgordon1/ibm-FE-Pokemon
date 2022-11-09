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
  viewingFavorites: false,
  loading: false,
  types: undefined as string[] | undefined,
  selectedType: ''
});

export type RootState = ReturnType<typeof state>
export type RootStateMapped<S> = {
  [K in keyof S]: () => S[K]
}

export const getters: GetterTree<RootState, RootState> = {
  count: state => state?.pokemon?.count,
}

export const mutations: MutationTree<RootState> = {
  setPokemon(state: RootState, pokemon: ApiResponse) {
    state.pokemon = undefined
    state.pokemon = pokemon
  },
  setTypes(state: RootState, types: string[]) {
    state.types = types
  },
  setType(state: RootState, type: string) {
    state.selectedType = type
  },
  setBasePokemon(state: RootState, pokemon: ApiResponse) {
    state.basePokemonData = undefined
    state.basePokemonData = pokemon
  },
  setSearchMessage(state: RootState, message: string) {
    state.searchMessage = message
  },
  setViewingFavorites(state: RootState, isViewingFav: boolean) {
    state.viewingFavorites = isViewingFav
  },
  setPage(state: RootState, pageNum: number) {
    state.currentPage = pageNum
  },
  incrementPage(state: RootState) {
    state.currentPage = state.currentPage + 1
  },
  decrementPage(state: RootState) {
    state.currentPage = state.currentPage - 1
  },
  setLoading(state: RootState, isLoading: boolean) {
    state.loading = isLoading
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async baseRequest({ commit, state }): Promise<void> {
    try {
      commit('setLoading', true)
      const [pokemon, types] = await Promise.all([
        this.$axios.$get(`${state.apiBaseUrl}?limit=${state.limit}`),
        this.$axios.$get('https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types')
      ])
      commit('setPokemon', pokemon)
      commit('setTypes', types)
      commit('setBasePokemon', pokemon)
      commit('setSearchMessage', `${pokemon?.count} Results`)
    } catch (error) {
      console.log('Error Fetching Base Request', error)
    } finally {
      commit('setLoading', false)
    }
  },
  async getPokemon({ commit, state }, { isFavorite = false, searchQuery = undefined, errorMessage = 'Error Fetching Pokemon', type = undefined }): Promise<void> {
    try {
      commit('setLoading', true)
      const searchParam = searchQuery ? `&search=${searchQuery}` : ''
      const fav = isFavorite ? '&isFavorite=true' : ''
      const off = `&offset=${(state.currentPage - 1) * state.limit}`
      const pokeType = type ? `&type=${type}` : ''
      const pokemon = await this.$axios.$get(`${state.apiBaseUrl}?limit=${state.limit}${searchParam + fav + off + pokeType}`)
      commit('setPokemon', pokemon)
      commit('setSearchMessage', `${pokemon?.count} Results`)
    } catch (error) {
      commit('setSearchMessage', 'No Results')
      console.log(errorMessage, error)
    } finally {
      commit('setLoading', false)
    }
  },
  clear({ commit, state }): void {
    commit('setPokemon', null)
    commit('setSearchMessage', `${state?.basePokemonData?.count} Results`)
    commit('setPage', 1)
    commit('setViewingFavorites', false)
  },
}