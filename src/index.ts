export default [
  {
    path: '/',
    module: () => import('./Home')
  },
  {
    path: '/about',
    module: () => import('./About')
  }
]