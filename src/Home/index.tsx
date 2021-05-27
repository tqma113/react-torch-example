import React from 'react'
import { createPage, useStore } from 'react-torch/client'
import { createStore } from './store'

type Store = ReturnType<typeof createStore>

function View () {
  const store = useStore<Store>()
  const state = store.getState()
  const INCREASE = () => {
    store.dispatch({ type: 'INCREMENT' })
  }
  return <div className='test'>Home {state.count} <button onClick={() => INCREASE()}>Increate</button></div>
}

const Home = createPage(() => {
  return View
}, createStore)

export default Home