<template>

</template>

<script setup lang="ts">


import axios from 'axios';
import { onMounted } from 'vue';

onMounted(() => {
  axios.get('https://hn.algolia.com/api/v1/search?query=vue')
    .then(response => {
      console.log(response.data.hits);
    });
});
</script>
