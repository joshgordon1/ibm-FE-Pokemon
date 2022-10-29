<template>
  <div>
    <header>
      <nuxt-link to="/">All Pokemon</nuxt-link>
    </header>
    <Nuxt/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LayoutDefault',
  data() {
    return {
      pokemon: []
    };
  },
})
</script>


