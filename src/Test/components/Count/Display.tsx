import React from 'react'

import model from './model'

export default () => {
  const count = model.useState()

  return (
    <div>{count}</div>
  )
}