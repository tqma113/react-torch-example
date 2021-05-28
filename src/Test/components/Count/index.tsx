import React from 'react'
import { Provider } from 'react-torch/client'

import Display from './Display'
import Operation from './Operation'

import model from './model'

export default () => {
  return (
    <Provider list={[{ Model: model }]}>
      <Display />
      <Operation />
    </Provider>
  )
}