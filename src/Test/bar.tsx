import React from 'react'
import { useModel } from './ace'
import { counter } from './counter'

export const Bar = () => {
  const { count, inc, dec } = useModel(counter)

  return (
    <div>
      <div>{count}</div>
      <button onClick={inc}>Increase</button>
      <button onClick={dec}>Decrease</button>
    </div>
  )
}