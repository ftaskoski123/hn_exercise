<template>
  <button @click="$router.push({ name: 'about' })">Go to About</button>

</template>


<script setup lang="ts">
import axios from 'axios';
import {ref , onMounted} from 'vue'


onMounted(()=>{

  axios.get('https://hn.algolia.com/api/v1/search?query=vue')
  .then(response => {

    console.log(response.data)
  })

})

</script>
