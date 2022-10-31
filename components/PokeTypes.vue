<template>
  <div class="flex types">
    <div v-for="type in types" :key="type" :class="['type', typeColor(type)]">
      {{type}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getTypeColor } from '~/util/color'

export default Vue.extend({
  props: {
    types: {
      type: Array as () => string[],
      required: true
    }
  },
   methods: {
    typeColor(type: string) {
      return getTypeColor(type)
    }
  }
})
</script>

<style lang="scss" scoped>
.types {
  gap: 1rem;
  .type {
    padding: 8px;
    border-width: 1px;
    border-style: solid;
    border-radius: 3px;
    font-weight: 700;
    font-size: 1rem;
  }
}
</style>
