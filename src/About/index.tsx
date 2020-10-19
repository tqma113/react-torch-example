import React from 'react'
import { createPage } from 'react-torch'

export default createPage((history, context) => {

  return () => {
    console.log('about update')
    return <div>about</div>
  }
})