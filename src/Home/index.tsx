import React from 'react'
import { createPage } from 'react-torch/page'
import { createStore } from 'react-torch/store'
import type { Currings } from 'react-torch/store'

export type State = {
  count: number
}

export type Actions = typeof actions

const initialState: State = {
  count: 0
}

const actions = {
  UPDATE_COUNT(state: State, nextCount: number) {
    return {
      ...state,
      count: nextCount
    }
  },
  INCREASE(state: State) {
    return {
      ...state,
      count: state.count + 1
    }
  },
  DECREASE(state: State) {
    return {
      ...state,
      count: state.count - 1
    }
  },
}

const store = createStore(initialState, actions)

type Props = {
  state: State,
  actions: Currings<State, Actions>
}

function View ({ state, actions }: Props) {
  return <div>Home {state.count} <button onClick={() => actions.INCREASE()}>Increate</button></div>
}

const Home = createPage(View, store)

export default Home