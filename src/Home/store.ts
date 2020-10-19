import { createStore } from 'redux'
import type {  } from 'react-torch'

export const UNSAFE_SETSTATE = 'UNSAFE_SETSTATE'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'

interface UnsafeSetStateAction {
  type: typeof UNSAFE_SETSTATE
  preload: number
}

interface IncrementAction {
  type: typeof INCREMENT
}

interface DecrementAction {
  type: typeof DECREMENT
}

type Action = UnsafeSetStateAction | IncrementAction | DecrementAction

function counter(state = 0, action: Action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    case UNSAFE_SETSTATE:
      return action.preload
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
const reduxStore = createStore(counter)

const store = {
  ...reduxStore,
  __UNSAFE_SET_STATE__(state: number) {
    reduxStore.dispatch({ type: 'UNSAFE_SETSTATE', preload: state })
  }
}

export default store