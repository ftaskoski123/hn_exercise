<template>
  <div class="stories-wrapper">
    <StoryCard
      class="star-icon-active"
      v-for="story in favorites"
      :key="story.id"
      :story="story"
      @favorite="removeStory(story.id)"
      :isFavorite="true"
      v-if="!loading"
    />
    <div class="loading-container" v-else>
      <p class="loading">Loading...</p>
      <img class="loading-icon" :src="loadingIcon" />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import StoryCard from '../components/StoryCard.vue'
import loadingIcon from '../svgs/spinner.svg'

const favoritesId = ref<string[]>([]) 
const favorites = ref<any[]>([])
const loading = ref<boolean>(false);
const apiKey = import.meta.env.VITE_OG_API_KEY

function getGraph(url: string): Promise<any> {
  //change 1 to api key, now disabled not to waste requests
  return axios
    .get(`https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=1`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
}


onMounted(() => {
  favoritesId.value = JSON.parse(localStorage.getItem('favorites') || '[]')
  favoritesId.value.forEach((id) => {
    loading.value = true
    axios.get(`https://hn.algolia.com/api/v1/items/${id}`).then(async(response) => {
      const story = response.data
      if (story.url) {
          const openGraphData = await getGraph(story.url)
          story.openGraphData = openGraphData ? {
            title: openGraphData.hybridGraph.title,
            description: openGraphData.hybridGraph.description,
            image: openGraphData.hybridGraph.image
          } : null
        }      
      story.isFavorite = true
      favorites.value.push(story)
      loading.value = false

    })
  })
})


function removeStory(storyId: number): void {
  favorites.value = favorites.value.filter((story) => {
    return story.id !== storyId
  })

  const updatedFavorites = favorites.value.map((favStory) => favStory.id.toString())
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
}
</script>

<style scoped>
.stories-wrapper {
  margin-left: 15rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 8rem;
}
</style>
