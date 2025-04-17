<template>
  <div>
    <h1>Random facts about numbers</h1>
    <form @submit.prevent="getFact">
      <label>
        Number:
        <input type="number" v-model="number" />
      </label>
      <label>
        Category:
        <select v-model="category">
          <option value="math">math</option>
          <option value="year">year</option>
          <option value="trivia">trivia</option>
        </select>
      </label>
      <button type="submit">Search</button>
    </form>
    <div v-if="loading">Loading...</div>
    <div v-else-if="!found">{{ number }} - скучное число/скучный год</div>
    <div v-else>{{ fact }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const number = ref(0)
const category = ref('trivia')
const fact = ref('')
const found = ref(false)
const loading = ref(false)

async function getFact() {
  loading.value = true
  const response = await fetch(`http://numbersapi.com/${number.value}/${category.value}?json`)
  const data = await response.json()
  fact.value = data.text
  found.value = data.found
  loading.value = false
}
</script>

<style scoped>
</style>
