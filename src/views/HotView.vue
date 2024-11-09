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
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import StoryCard from '../components/StoryCard.vue'
  
  const stories = ref<any[]>([])
  
  function loadFavorites() {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]')
    return savedFavorites
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
  
  onMounted(() => {
    axios.get("http://hn.algolia.com/api/v1/search?tags=front_page&numericFilters=points>400").then((response) => {
      const fetchedStories = response.data.hits
      const favorites = loadFavorites()
  
      fetchedStories.forEach((story: any) => {
        story.isFavorite = favorites.includes(story.objectID)
      })
  
      stories.value = fetchedStories
    })
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
  