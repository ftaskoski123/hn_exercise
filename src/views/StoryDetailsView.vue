<template>
    <div>
            <h1>{{ title }}</h1>
    </div>
</template>

<script setup lang="ts">
import { onMounted,ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const title = ref<string>('');

onMounted(() => {
    axios.get(`https://hn.algolia.com/api/v1/items/${route.params.id}`).then((response) => {
        console.log(response.data)
        title.value = response.data.title
    })
})
</script>

<style scoped>
h1{
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30vh;
}

</style>