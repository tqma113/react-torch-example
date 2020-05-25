import React from 'react'
import { createPage } from 'react-torch/page'
import { createStore } from 'react-torch/store'


const About = createPage(
  () => {
    console.log('about update')
    return <div>about</div>
  },
  createStore({}, {})
)

export default About