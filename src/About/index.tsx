import React from 'react'
import { createPage } from 'react-torch/client'

export default createPage(() => {

  return () => {
    console.log('about update')
    return <div>about</div>
  }
})