import { createStore as createReduxStore } from 'redux'

export type State = {
  count: number
}

export const initialState: State = {
  count: 0,
}

export const UNSAFE_SETSTATE = 'UNSAFE_SETSTATE'

export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const UPDATE_COUNT = 'UPDATE_COUNT'

interface UnsafeSetStateAction {
  type: typeof UNSAFE_SETSTATE
  preload: State
}

interface IncrementAction {
  type: typeof INCREMENT
}

interface DecrementAction {
  type: typeof DECREMENT
}

interface UpdateCountAction {
  type: typeof UPDATE_COUNT
  preload: number
}

type Action =
  | UnsafeSetStateAction
  | IncrementAction
  | DecrementAction
  | UpdateCountAction

function counter(state: State = initialState, action: Action): State {
  switch (action.type) {
    case INCREMENT:
      state.count++
      return state
    case DECREMENT:
      state.count++
      return state
    case UNSAFE_SETSTATE:
      return action.preload
    case UPDATE_COUNT:
      state.count = action.preload
      return state
    default:
      return state
  }
}

export const createStore = (is: State = initialState) => {
  return createReduxStore(counter, is)
}
