
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'Home' },
      { path: '/:userId', component: () => import('pages/UserPage.vue'), name: 'User' },
      { path: '/:userId/:postId', component: () => import('pages/Post.vue'), name: 'Post' },
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
