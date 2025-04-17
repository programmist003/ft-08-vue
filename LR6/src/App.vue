<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const emojis = ref([]);
    const fetchEmojis = async () => {
      try {
        const response = await fetch('https://emojihub.yurace.pro/api/all');
        const data = await response.json();
        emojis.value = data;
      } catch (error) {
        console.error(error);
      }
    };
    onMounted(() => {
      fetchEmojis();
    });
    return { emojis };
  },
};
</script>
<template>
  <div>
    <Emoji :emoji="emojis[0]" />
  </div>
</template>