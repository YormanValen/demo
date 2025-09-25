<template>
  <div class="search-bar">
    <div class="search-input-container">
      <v-icon class="search-icon" size="20" color="#9ca3af">mdi-magnify</v-icon>
      <input type="text" class="search-input" placeholder="Busca tu entidad financiera" v-model="searchQuery"
        @input="$emit('search', searchQuery)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineEmits<{
  search: [query: string]
}>()

const searchQuery = ref('')
</script>

<style scoped>
.search-bar {
  margin-bottom: 24px;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  z-index: 1;
}

.search-input {
  width: 100%;
  height: 48px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 0 16px 0 48px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #001340;
}

.search-input::placeholder {
  color: #9ca3af;
}
</style>