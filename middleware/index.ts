import type { Middleware } from 'react-torch'

export const foo: Middleware = (app, server) => {
  app.use((req, res, next) => {
    console.log(req.url)
    next()
  })
}

export const attachCss: Middleware = (app, server) => {
  app.use((req, res, next) => {
    res.locals = {
      styles: [
        {
          type: 'link',
          href: '/css/test.css',
          preload: true,
        },
      ],
    }
    next()
  })
}