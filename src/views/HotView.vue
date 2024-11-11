<template>
  <div class="new-background">
  <div class="container">
    <div class="filters-wrapper">
      <label class="filter-label">HOT </label>
        in
      <div class="filter-container">
        <select v-model="selectedCategory" @change="fetchStories" class="filter-select">
          <option value="story">Story</option>
          <option value="show_hn">Show HN</option>
          <option value="ask_hn">Ask HN</option>
        </select>
      </div>
      <label >by</label>

      <div class="filter-container">
        <select v-model="selectedSort" @change="fetchStories" class="filter-select">
          <option value="points">By Popularity</option>
          <option value="comments">By Comments</option>
        </select>
      </div>

      <label>for</label>
      <div class="filter-container">
        <select v-model="selectedTime" @change="fetchStories" class="filter-select">
          <option value="24h">Last 24 Hours</option>
          <option value="48h">Last 48 Hours</option>
        </select>
      </div>
    </div>
  </div>
</div>

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

const stories = ref<any[]>([])
const selectedCategory = ref<string>('story')
const selectedSort = ref<string>('points')
const selectedTime = ref<string>('24h')
const apiKey = import.meta.env.VITE_OG_API_KEY

function loadFavorites() {
  const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
  return savedFavorites
}

function getGraph(url: string): Promise<any> {
  //change 1 to api key, now disabled not to waste requests
  return axios
    .get(`https://opengraph.io/api/1.1/site/${encodeURIComponent(url)}?app_id=1`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error fetching OpenGraph data:", error);
      return null;
    });
}

function handleToggleFavorite(story: any) {
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

function fetchStories() {
  const category = selectedCategory.value
  const sort = selectedSort.value
  const time = selectedTime.value
  const timeFilter = time === '24h' ? 'created_at_i>=' + (Date.now() - 86400000) / 1000 : 'created_at_i>=' + (Date.now() - 172800000) / 1000

  axios.get(`http://hn.algolia.com/api/v1/search?tags=${category}&numericFilters=${sort === 'points' ? 'points>100' : 'num_comments>20'},${timeFilter}`)
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

onMounted(() => {
  fetchStories()
})

watch([selectedCategory, selectedSort, selectedTime], () => {
  fetchStories()
})
</script>

<style scoped>

.filter-label {
  color: gray;
  font-weight: bold;
  font-size: 1.5rem;
}

.new-background {
  background-color: #f7fafc;
  width: 100%;
  height: 30vh;
}
.filters-wrapper {
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin-left: 15rem;

}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30vh;
}

.filter-container {
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
}

.filter-select {
  border: 1px solid #cbd5e0;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #fff;
  color: #2d3748;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.filter-select:hover {
  border-color: #4a90e2;
}

.stories-wrapper {
  display: flex;
  flex-direction: column;
  margin-left: 15rem;

}
</style>
