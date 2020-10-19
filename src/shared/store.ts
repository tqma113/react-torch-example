import { createStore as createReduxStore, Action, Reducer, PreloadedState, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export const UNSAFE_SETSTATE = 'UNSAFE_SETSTATE'

export interface UnsafeSetStateAction {
  type: typeof UNSAFE_SETSTATE
  preload: any
}

function unsafeSetState(state: any, action: UnsafeSetStateAction) {
  switch (action.type) {
    case UNSAFE_SETSTATE:
      return action.preload
    default:
      return state
  }
}

export const createStore = <S, A extends Action, Ext, StateExt>(reducer: Reducer<S, A>, preloadedState?: PreloadedState<S>) => {
  const reduxStore = createReduxStore(combineReducers({ reducer, unsafeSetState }), preloadedState, composeWithDevTools())

  return {
    ...reduxStore,
    __UNSAFE_SET_STATE__(state: number) {
      reduxStore.dispatch({ type: 'UNSAFE_SETSTATE', preload: state })
    }
  }
}
