<template>
  <div class="stories-wrapper">
    <div class="container" v-for="story in favorites" :key="story.objectID">
      <div class="story-card" @click="$router.push({ name: 'story', params: { id: story.id } })">
        <div class="story-header">
          <h2 class="story-title">{{ story.title }}</h2>
          <div class="icons-wrapper">
            <img @click.stop="removeStory(story.id)" :src="starIcon" class="star-icon"
               />
            <div class="comment-icon-wrapper">
              <img :src="commentIcon" class="comment-icon" />
              <span class="comment-number">{{ commentCount(story) }}</span>
            </div>
          </div>
        </div>
        <p class="story-author">by {{ story.author }}</p>
        <a :href="story.url" target="_blank" class="story-link">Read more</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted,computed } from 'vue'
import starIcon from '../svgs/star.svg'
import commentIcon from '../svgs/comment.svg'

const favoritesId = ref<any[]>([]) 
const favorites = ref<any[]>([])

onMounted(() => {
  favoritesId.value = JSON.parse(localStorage.getItem('favorites') || '[]');
  favoritesId.value.forEach((id: string) => {
    axios.get(`https://hn.algolia.com/api/v1/items/${id}`).then((response) => {
      favorites.value.push(response.data);
    })
  });
});

function removeStory(storyId: string) : void {
  favorites.value = favorites.value.filter((story) => story.id !== storyId)

  const updatedFavorites = favorites.value.map((story) => story.id.toString())
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
}


function commentCount(story: any) : number {
  let count = 0;
  if (story.children) {
    // Count the direct comments first
    count += story.children.filter((child: any) => child.type === 'comment').length;
    // Recursively count comments in child comments
    
    story.children.forEach((child: any) => {
      if (child.children) {

        count += commentCount(child);  // Recursion to count nested comments
      }
    });
  }
  return count;
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

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.story-card {
  background-color: #f8f9fa;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-align: left;
  cursor: pointer;
}

.story-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.story-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.story-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.story-author {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
}

.story-link {
  font-size: 0.9rem;
  color: #0073e6;
  text-decoration: none;
}

.story-link:hover {
  text-decoration: underline;
}

.icons-wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.star-icon, .comment-icon {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}

.star-icon:hover {
  background-color: transparent;
}
.star-icon {
  background-color: yellow;
}

.comment-icon-wrapper {
  position: relative; 
  display: inline-block;
}

.comment-number {
  position: absolute;
  top: -0.25rem; 
  right: -0.25rem; 
  background-color: red;
  color: white;
  font-size: 0.6rem;
  padding: 0.2rem 0.4rem;
  border-radius: 50%;
  transform: translate(50%, -50%); 
}
</style>
