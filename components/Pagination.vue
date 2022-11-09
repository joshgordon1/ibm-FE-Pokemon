<template>
  <div v-if="allPages" class="flex types">
    <div v-for="page in allPages" :key="page" :class="['page', {'selected' : currentPage === page}]" @click="setPage(page)">
      {{ page }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'
import { RootState, RootStateMapped } from '~/store'

export default Vue.extend({
  computed: {
    ...(mapState([
      'currentPage',
      'pokemon',
      'viewingFavorites',
      'selectedType'
    ]) as RootStateMapped<RootState>),
    allPages(): number {
      return this.$store.getters?.count ? Math.floor(this.$store.getters.count / this.$store.state.limit) + 1 : 0
    }
  },
  methods: {
    async setPage(num: number): Promise<void> {
      this.$store.commit('setPage', num)
      await this.$store.dispatch('getPokemon', {
        isFavorite: this.viewingFavorites,
        type: this.selectedType,
        errorMessage: 'Error Navigating Page'
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.page {
  padding: 0 3px;
  margin: 0 3px;
}
.selected {
  font-weight: 700;
  text-decoration: underline;
}
</style>