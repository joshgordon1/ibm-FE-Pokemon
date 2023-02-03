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
  selectedType: '',
  searchQuery: ''
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
  setSearchQuery(state: RootState, query: string) {
    state.searchQuery = query
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
        this.$axios.$get(state.apiBaseUrl, {
          params: new URLSearchParams({
            limit: state?.limit?.toString()
          })
        }),
        this.$axios.$get(
          'https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon-types',
          { params: new URLSearchParams() }
        )
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
  async getPokemon({ commit, state }, {
    errorMessage = 'Error Fetching Pokemon' as string,
  }): Promise<void> {
    try {
      commit('setLoading', true)
      const params = new URLSearchParams({
        limit: state?.limit?.toString(),
        offset: ((state.currentPage - 1) * state.limit).toString(),
        ...(state?.searchQuery && { search: state.searchQuery }),
        ...(state?.viewingFavorites && { isFavorite: 'true' }),
        ...(state?.selectedType && { type: state.selectedType }),
      });
      const pokemon = await this.$axios.$get(state.apiBaseUrl, { params });
      commit('setPokemon', pokemon)
      commit('setSearchMessage', `${pokemon?.count} Results`)
    } catch (error) {
      commit('setSearchMessage', 'No Results')
      console.log(errorMessage, error)
    } finally {
      commit('setLoading', false)
    }
  },
  async getPokemonPage({commit, state}, id: string) {
    try {
      const res = await this.$axios.$get(`${state.apiBaseUrl}${id}`)
      return res
    } catch (error) {
      console.log('Error Fetching Pokemon', error)
    } finally {
      commit('setLoading', false)
    }
  },
  clearSearch({ commit }): void {
    commit('setSearchQuery', '')
  },
  clear({ commit, state }): void {
    commit('setPokemon', null)
    commit('setSearchMessage', `${state?.basePokemonData?.count} Results`)
    commit('setPage', 1)
    commit('setViewingFavorites', false)
    commit('setSearchQuery', '')
    commit('setType', '')
  },
}