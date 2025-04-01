const routes = [
  { path: '/', redirect: '/items' },
  { path: '/items', component: () => import('pages/ItemsView.vue') },
  { path: '/wishlist', component: () => import('pages/WishlistView.vue') },
  { path: '/items/:id', component: () => import('pages/ItemDetailView.vue') },
]

export default routes
