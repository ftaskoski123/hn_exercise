<template>
  <div class="container">
    <div class="story-card" @click="$router.push({ name: 'story', params: { id: props.story.objectID } })">
      <div class="story-header">
        <h2 class="story-title">{{ props.story.title }}</h2>
        <div class="icons-wrapper">
          <svg
            @click.stop="toggleFavorite(props.story)"
            class="star-icon"
            :class="{ 'star-icon-active': props.story.isFavorite }"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="37"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <div v-if="props.story.num_comments" class="comment-icon-wrapper">
            <img :src="commentIcon" class="comment-icon" />
            <span class="comment-number">{{ props.story.num_comments }}</span>
          </div>
        </div>
      </div>
      
      <p class="story-author">
        <img :src="personIcon" class="person-icon" />
        {{ props.story.author }}
        <img v-if="props.story.points" :src="heartIcon" class="heart-icon" />
        {{ props.story.points }}
        <img :src="clockIcon" class="clock-icon" />
        {{ storyAge }}
      </p>
      <div class="url-og-wrapper">
        <a :href="props.story.url" @mouseenter="showPreview=true" target="_blank" class="story-link" @click.stop>{{ props.story.url }}</a>
        <div  v-if="showPreview" class="og-section">
          <img v-if="props.story.openGraphData.image" :src="props.story.openGraphData.image" alt="OpenGraph image" class="og-image" />
          <h3 class="og-title">{{ props.story.openGraphData.title }}</h3>
          <p class="og-description">{{ props.story.openGraphData.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import commentIcon from '../svgs/comment.svg'
import personIcon from '../svgs/person.svg'
import heartIcon from '../svgs/heart.svg'
import clockIcon from '../svgs/clock.svg'
import {computed,ref} from 'vue'
const props = defineProps({
  story: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['favorite'])
const showPreview = ref<boolean>(false);
const toggleFavorite = (story: any) : void => {
  emit('favorite', story)
}

const storyAge = computed(() => {
  const now = new Date()
  const storyDate = new Date(props.story.created_at)
  const timeDiff = now.getTime() - storyDate.getTime()

  const daysOld = Math.floor(timeDiff / (1000 * 3600 * 24))
  const hoursOld = Math.floor(timeDiff / (1000 * 3600))

  return daysOld < 1 ? `${hoursOld} hours ago` : `${daysOld} days ago`
})
</script>

<style>
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
  width: 100%;
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
  display: flex;
  align-items: center;
}

.person-icon {
  width: 1rem;
  height: 1rem;
  margin-right: 0.5rem;
}

.heart-icon, .clock-icon {
  width: 1rem;
  height: 1rem;
  margin-left: 1rem; 
  margin-right: 0.5rem; 
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

.comment-icon {
  width: 1.5rem;
  height: 1.5rem;
  transition: background-color 0.3s ease;
  cursor: pointer;
}

.star-icon {
  transition: background-color 0.3s ease;
  cursor: pointer;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
}

.star-icon:hover {
  fill: yellow;
}

.star-icon-active {
  fill: yellow;
}

.star-icon-active:hover {
  fill: transparent;
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

.url-og-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  position: relative; 
}

.og-section {
  display: none; 
  width: 30%;
  padding: 0.5rem;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  background-color: #f5f5f5;
  position: absolute;
  z-index: 100000 !important;
  margin-bottom: 0.5rem;
  right: 0;
  bottom: -5.5rem;
}

.url-og-wrapper:hover .og-section {
  display: block; 
  z-index: 100000 !important;
}

.og-image {
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  z-index: 100000 !important;
}

.og-title {
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}

.og-description {
  font-size: 0.8rem;
  color: #666;
}

</style>
