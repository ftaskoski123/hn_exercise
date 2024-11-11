<template>
    <div class="stories-wrapper">
      <StoryCard
        v-for="story in stories"
        :key="story.objectID"
        :story="story"
        @favorite="handleToggleFavorite"
        v-if="!loading"
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
  
  function getStories(query: string): void {
    loading.value = true
    axios
      .get(`https://hn.algolia.com/api/v1/search?query=${query}&tags=poll`)
      .then((response) => {
        const fetchedStories = response.data.hits
        const favorites = loadFavorites()
  
        fetchedStories.forEach((story: any) => {
          story.isFavorite = favorites.includes(story.objectID)
        })
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
  