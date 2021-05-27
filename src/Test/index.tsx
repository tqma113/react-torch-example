import React from 'react'
import { createPage } from 'react-torch/client'
import { Bar } from './bar'
import { Foo } from './foo'
import { Provider } from './ace'

const About = createPage(({ history, context }) => {
  const View = () => {
    return (
      <Provider>
        <Foo />
        <Bar />
      </Provider>
    )
  }

  return View
})

export default About
