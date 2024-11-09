import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HotView from '../views/HotView.vue'
import AllView from '../views/AllView.vue'
import StoryDetailsView from '@/views/StoryDetailsView.vue'
import StarredView from '@/views/StarredView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/all'
    },
    {
      path: '/hot',
      name: 'hot',

      component: HotView,
    },
    {
      path: '/all',
      name: 'all',
      component: AllView
    },
    {
      path: '/story/:id',
      name: 'story',
      component: StoryDetailsView
    },
    {
      path: '/starred',
      name: 'starred',
      component: StarredView
    }
  ],
})



export default router
