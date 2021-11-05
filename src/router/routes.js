import Main from './../pages/Main.vue'
import Chats from './../pages/Chats.vue'
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'Home' },
      { path: '/:userId', component: () => import('pages/UserPage.vue'), name: 'User' },
      { path: '/:userId/:postId', component: () => import('pages/Post.vue'), name: 'Post' },
      { path: '/newpost', component: () => import('pages/AddPost.vue'), name: 'Add' },
      { path: '/explore', component: () => import('pages/Explore.vue'), name: 'Explore' },
      { path: '/dms', component: () => import('pages/DM.vue'), name: 'DM' },
      { path: '/settings', component: () => import('pages/Settings.vue'), name: 'Settings' },
      { path: '/search', component: () => import('pages/Search.vue'), name: 'Search' },
      { path: '/activity', component: () => import('src/pages/Activity.vue'), name: 'Activity' },
    ]
    
  },
  {
    path: '/main',
    component: () => import('layouts/noLayout.vue'),
    children: [
      {
        path: '/main',
        component: Main,
        name: 'Main'
      },
      {
        path: '/main/:userId',
        component: Chats,
        name: 'Chat',
      },
    ]
  },
  { path: '/auth', component: () => import('pages/Auth.vue'), name: 'Auth' },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
