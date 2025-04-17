<template>
    <span>{{ htmlCode[0] }}</span>
</template>
  
<script>
  export default {
    props: {
      emoji: {
        type: Object,
        required: true,
      },
    },
    setup(props) {
      return { htmlCode: props.emoji.htmlCode };
    },
  };
</script>