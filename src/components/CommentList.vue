<template>
  <div class="comments-wrapper">
    <div
      v-for="(comment, index) in comments"
      :key="index"
      class="comment-item"
    >
      <div class="comment-author">
        <strong>{{ comment.author }}</strong>
      </div>
      <p class="comment-text">{{ comment.text }}</p>
      
      <div v-if="comment.children && comment.children.length > 0" class="child-comments">
        <CommentList :comments="comment.children" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Comment  {
  author: string;
  text: string;
  children?: Comment[];  
};

const props = defineProps({
  comments: {
    type: Array as () => Comment[],  
    required: true
  }
});
</script>

<style scoped>
.child-comments {
  margin-left: 2rem; 
}
</style>
