<template>
  <div class="stories-wrapper">
    <StoryCard
      class="star-icon-active"
      v-for="story in favorites"
      :key="story.id"
      :story="story"
      @favorite="removeStory(story.id)"
      :isFavorite="true"
    />
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import StoryCard from '../components/StoryCard.vue'

const favoritesId = ref<string[]>([]) 
const favorites = ref<any[]>([])

onMounted(() => {
  favoritesId.value = JSON.parse(localStorage.getItem('favorites') || '[]')
  favoritesId.value.forEach((id) => {
    axios.get(`https://hn.algolia.com/api/v1/items/${id}`).then((response) => {
      const story = response.data
      story.isFavorite = true
      favorites.value.push(story)
    })
  })
})

function removeStory(storyId: string): void {
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
