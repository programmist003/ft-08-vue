<script setup>
import { ref, onMounted } from 'vue';
import Emoji from './components/Emoji.vue';


const emojis = ref([]);
try {
  let data = await fetch('https://emojihub.yurace.pro/api/all').then((response) => {return response.json()});
  emojis.value = data;
  console.log(emojis.value[0]);
} catch (error) {
  console.error(error);
}


</script>
<template>
  <div>
    <Emoji :emoji="emojis.values[0]" />
  </div>
</template>