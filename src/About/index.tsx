import React from 'react'
import { createPage } from 'react-torch/page'
import { createStore } from 'react-torch/store'

export default createPage((history, context) => {

  return [
    () => {
      console.log('about update')
      return <div>about</div>
    },
    createStore({}, {})
  ]
})