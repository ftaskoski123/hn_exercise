<template>
  <div class="stories-wrapper">
    <StoryCard
      v-if="!loading"
      v-for="story in stories"
      :key="story.objectID"
      :story="story"
      @favorite="handleToggleFavorite"
      :loading="loading"
    />
    <div class="loading-container" v-else>
      <p class="loading">Loading...</p>
      <img class="loading-icon" :src="loadingIcon" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import StoryCard from '../components/StoryCard.vue'
import { searchTerm } from '@/store/searchStore'
import loadingIcon from '../svgs/spinner.svg'

const stories = ref<any[]>([])
const apiKey = import.meta.env.VITE_OG_API_KEY
const loading = ref<boolean>(false);
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
    .get(`https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=1`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return null;
    });
}


function getStories(query: string): void {
  loading.value = true
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
      
      loading.value = false
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


<style>

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.loading {
  font-size: 2.5rem;
  font-weight: bold;
}

.loading-icon {
  width: 5rem;
  height: 5rem;
}
</style>