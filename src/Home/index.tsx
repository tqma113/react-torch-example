import React, { useEffect, useState } from 'react'
import { createPage, useStore } from 'react-torch/client'
import { createStore } from './store'

type Store = ReturnType<typeof createStore>

function View () {
  const store = useStore<Store>()
  const [state, setState] = useState({} as any)

  useEffect(() => {
    setState(store.getState())
    store.subscribe(() => {
      const curState = store.getState()
      console.log({ curState, state })
      if (!Object.is(curState, state)) {
        setState(curState)
        console.log({ state })
      }
    })
  }, [])
  const INCREASE = () => {
    store.dispatch({ type: 'INCREMENT' })
  }
  return <div className='test'>Home {state?.count} <button onClick={() => INCREASE()}>Increate</button></div>
}

const Home = createPage(() => {
  return View
}, createStore)

export default Home