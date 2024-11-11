<template>
  <div class="stories-wrapper">
    <StoryCard
      v-for="story in stories"
      :key="story.objectID"
      :story="story"
      @favorite="handleToggleFavorite"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import StoryCard from '../components/StoryCard.vue'
import { searchTerm } from '@/store/searchStore'

const stories = ref<any[]>([])
const apiKey = import.meta.env.VITE_OG_API_KEY
function loadFavorites(): string[] {
  const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  return savedFavorites
}

function handleToggleFavorite(story: any): void {
  const favorites = loadFavorites()
  const storyIndex = favorites.indexOf(story.objectID)

  if (storyIndex === -1) {
    favorites.push(story.objectID)
    story.isFavorite = true
  } else {
    favorites.splice(storyIndex, 1)
    story.isFavorite = false
  }
  localStorage.setItem('favorites', JSON.stringify(favorites))
}

function getGraph(url: string): Promise<any> {
  //change 1 to api key, now disabled not to waste requests
  return axios
    .get(`https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=${apiKey}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
}


function getStories(query: string): void {
  axios
    .get(`http://hn.algolia.com/api/v1/search?query=${query}&tags=(front_page,story,poll,show_hn,ask_hn)`)
    .then(async (response) => {
      const fetchedStories = response.data.hits
      const favorites = loadFavorites()

      for (const story of fetchedStories) {
        story.isFavorite = favorites.includes(story.objectID)
        
        if (story.url) {
          const openGraphData = await getGraph(story.url)
          story.openGraphData = openGraphData ? {
            title: openGraphData.hybridGraph.title,
            description: openGraphData.hybridGraph.description,
            image: openGraphData.hybridGraph.image
          } : null
        }
      }

      stories.value = fetchedStories
    })
}

watch(() => searchTerm.value, (newSearchTerm) => {
  getStories(newSearchTerm)
})

onMounted(() => {
  getStories(searchTerm.value)
})
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
