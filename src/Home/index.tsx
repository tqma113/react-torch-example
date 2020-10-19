import React from 'react'
import { createPage } from 'react-torch'
import store from './store'

function View () {
  const state = store.getState()
  const INCREASE = () => {
    store.dispatch({ type: 'INCREMENT' })
  }
  return <div className='test'>Home {state} <button onClick={() => INCREASE()}>Increate</button></div>
}

const Home = createPage(() => {
  return [View, store]
})

export default Home