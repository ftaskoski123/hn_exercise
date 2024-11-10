import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HotView from '../views/HotView.vue'
import AllView from '../views/AllView.vue'
import StoryDetailsView from '@/views/StoryDetailsView.vue'
import StarredView from '@/views/StarredView.vue'
import ShowView from '@/views/ShowView.vue'
import AskView from '@/views/AskView.vue'
import PollsView from '@/views/PollsView.vue'
import JobView from '@/views/JobView.vue'
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
    },
    {
      path:'/show',
      name:'show',
      component:ShowView
    },
    {
      path:'/ask',
      name:'ask',
      component:AskView
    },
    {
      path:'/polls',
      name:'polls',
      component:PollsView
    },
    {
      path:'/jobs',
      name:'jobs',
      component:JobView
    }
  ],
})



export default router
