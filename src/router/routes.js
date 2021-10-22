
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'Home' },
      { path: '/:userId', component: () => import('pages/UserPage.vue'), name: 'User' },
      { path: '/:userId/:postId', component: () => import('pages/Post.vue'), name: 'Post' },
      { path: '/newpost', component: () => import('pages/AddPost.vue'), name: 'Add' },
      { path: '/dms', component: () => import('pages/DM.vue'), name: 'DM' },
      { path: '/settings', component: () => import('pages/Settings.vue'), name: 'Settings' },
      { path: '/search', component: () => import('pages/Search.vue'), name: 'Search' },
      { path: '/likes', component: () => import('pages/Likes.vue'), name: 'Likes' },
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
