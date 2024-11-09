<template>
  <div class="container">
    <div class="comments-card">
      <h1>{{ title }}</h1>
      <div class="comments-wrapper">
        <div
          v-for="(comment, index) in commentAndAuthor"
          :key="index"
          class="comment-item"
        >
          <div class="comment-author">
            <strong>{{ comment.author }}</strong>
          </div>
          <p class="comment-text">{{ comment.comment }}</p>
          
          <div v-if="comment.children && comment.children.length > 0" class="child-comments">
            <CommentList :comments="comment.children" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import CommentList from '../components/CommentList.vue'; 

const route = useRoute();
const title = ref<string>('');
const commentAndAuthor = ref<{ author: string; comment: string; children?: any[] }[]>([]);

onMounted(() => {
  axios.get(`https://hn.algolia.com/api/v1/items/${route.params.id}`).then((response) => {
    const storyData = response.data;
    title.value = storyData.title;
    if (storyData.children) {
      for (const child of storyData.children) {
        if (child.type === 'comment') {
          commentAndAuthor.value.push({
            author: child.author,
            comment: child.text,
            children: child.children ? child.children : []
          });
        }
      }
    }
  });
});
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin-top: 8rem;
}

.comments-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: left;
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  color: #333;
}

.comments-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.comment-item {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-wrap: break-word;
  word-break: break-word;
}

.comment-author {
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.comment-text {
  font-size: 1rem;
  color: #555;
}

.child-comments {
  margin-left: 2rem;
  padding-top: 1rem;
}
</style>
