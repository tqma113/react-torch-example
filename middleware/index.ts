import type { Middleware } from 'react-torch'

export const foo: Middleware = (app, server) => {
  app.use((req, res, next) => {
    console.log(req.url)
    next()
  })
}