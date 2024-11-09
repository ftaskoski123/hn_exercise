<template>
    <div class="container">
      <div class="story-card" @click="$router.push({ name: 'story', params: { id: props.story.objectID } })">
        <div class="story-header">
          <h2 class="story-title">{{ props.story.title }}</h2>
          <img :src="starIcon" @click.stop="toggleFavorite(story)" class="star-icon" :class="{ 'star-icon-active': props.story.isFavorite }" />
        </div>
        <p class="story-author">by {{ props.story.author }}</p>
        <a :href="props.story.url" target="_blank" class="story-link">Read more</a>
      </div>
    </div>    
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  import starIcon from '../svgs/star.svg'
  
  const props = defineProps({
    story: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['favorite'])
  
  const toggleFavorite = (story: any) => {
    emit('favorite', story)
  }
  </script>
  
  <style >

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
  
  .star-icon {
    width: 1.5rem;
    height: 1.5rem;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }
  
  .star-icon-active {
    background-color: yellow;
  }
  </style>
  