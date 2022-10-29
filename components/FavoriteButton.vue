<template>
  <div class="favorite pointer" @click.stop="toggleAndEmit">
    {{ isFavorited ? '♥' : '♡' }}
  </div>
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
    async toggleAndEmit() {
      this.isFavorited = !this.isFavorited
      if (this.isFavorited) {
        await this.favoritePokemon()
      } else {
        await this.unFavoritePokemon()
      }
    },
    async favoritePokemon() {
      await this.$axios.$post(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${this.id}/favorite`)
    },
    async unFavoritePokemon() {
      await this.$axios.$post(`https://q-exercise-api.o64ixruq9hj.us-south.codeengine.appdomain.cloud/api/rest/pokemon/${this.id}/unfavorite`)
    },
  }
})
</script>

<style lang="scss" scoped>
.favorite {
  font-size: 40px;
  color: #dc2626;
}
</style>