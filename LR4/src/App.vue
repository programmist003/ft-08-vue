<script setup>
import { ref, computed } from 'vue';

const history = ref([]);

const title = ref('');
const amount = ref(0);

const addHistoryItem = () => {
  if (title.value.trim() && amount.value !== 0) {
    history.value.push({
      text: title.value.trim(),
      amount: amount.value,
      id: Date.now()
    });
    title.value = '';
    amount.value = 0;
  }
};

const incomeBalance = computed(() => {
  return history.value
    .filter(item => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);
});

const outcomeBalance = computed(() => {
  return history.value
    .filter(item => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0);
});

const totalBalance = computed(() => incomeBalance.value + outcomeBalance.value);
</script>

<template>
  <form @submit.prevent="addHistoryItem">
    <div>
      <label>Название:</label>
      <input type="text" v-model.trim="title" />
    </div>
    <div>
      <label>Сумма:</label>
      <input type="number" v-model.number="amount" />
    </div>
    <button type="submit">Добавить</button>
  </form>

  <ul>
    <li v-for="item in history" :key="item.id">
      {{ item.text }}: {{ item.amount }}
    </li>
  </ul>

  <div v-if="history.length > 0">
    <p>Доходы: {{ incomeBalance }}</p>
    <p>Расходы: {{ outcomeBalance }}</p>
    <p>Общий баланс: {{ totalBalance }}</p>
  </div>
  <p v-else>Вы не совершали финансовых операций</p>
</template>

<style scoped>
/* Add any desired styling here */
</style>

