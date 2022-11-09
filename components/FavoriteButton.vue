<template>
  <button
    class="favorite no-bg pointer"
    :aria-label="isFavorited ? 'Unfavorite' : 'Favorite'"
    @click.stop.prevent="toggleAndEmit"
  >
    {{ isFavorited ? '♥' : '♡' }}
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    favorited: {
      type: Boolean,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isFavorited: this.favorited
    }
  },
  methods: {
    toggleFav(): void {
      this.isFavorited = !this.isFavorited
    },
    async toggleAndEmit(): Promise<void> {
      this.toggleFav();
      if (this.isFavorited) {
        await this.favoritePokemon()
      } else {
        await this.unFavoritePokemon()
      }
    },
    async favoritePokemon(): Promise<void> {
      try {
        await this.$axios.$post(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${this.id}/favorite`)
      } catch(e: any) {
        console.log(e)
      }
      
    },
    async unFavoritePokemon(): Promise<void> {
      try {
         await this.$axios.$post(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${this.id}/unfavorite`)
      } catch(e: any) {
        console.log(e)
      }
    },
  }
})
</script>

<style lang="scss" scoped>
.favorite {
  font-size: 30px;
  line-height: 1;
  color: #dc2626;
  @include desktop {
    font-size: 40px;
  }
}
</style>