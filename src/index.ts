import type { Route } from 'react-torch/client'

const routes: Route[] = [
  {
    path: '/',
    module: {
      pageCreater: () => import('./Home'),
    },
  },
  {
    path: '/about',
    module: {
      pageCreater: () => import('./About'),
    },
  },
  {
    path: '/test',
    module: {
      pageCreater: () => import('./Test'),
    },
  },
]

export default routes
