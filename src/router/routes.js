const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/HomeView.vue') },
      { path: 'items', component: () => import('pages/ItemsView.vue') },
      { path: 'items/:id', component: () => import('pages/ItemDetailView.vue') }, // ✅ Ruta de detalles
    ],
  },
]

export default routes
