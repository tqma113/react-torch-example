import type { Mdlw } from 'react-torch'

export const foo: Mdlw = (app, server) => {
  app.use((req, res, next) => {
    console.log(req.url)
    next()
  })
}