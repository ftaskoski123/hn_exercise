<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
</script>

<template>
  <Header />
  <Sidebar />

  <RouterView />
</template>
