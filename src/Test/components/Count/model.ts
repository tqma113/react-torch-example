import { setupStore, setupPreload } from 'react-torch/client'
import { createReactModel } from 'react-torch/client'

const initialState: number = 0

const update = (state: number, payload: number) => {
  return payload
}

const inscrease = (state: number) => {
  return state + 1
}

const descrease = (state: number) => {
  return state - 1
}

export default createReactModel(() => {
  let { store, actions } = setupStore({
    // 可选参数，会反映到 redux-devtools 里的 name
    name: 'todos',
    // 必选参数：initialState
    initialState,
    // 必须参数：reducers，更新状态函数
    reducers: {
      update,
      inscrease,
      descrease
    },
    // 可选参数，是否开启 redux-logger，默认为 false
    logger: true,
    // 可选参数，是否开启 redux-devtools，默认为 true
    devtools: true,
  })

  setupPreload(() => {
    actions.inscrease()
  })

  // 必须返回 store + actions 的对象结构
  return { store, actions }
})
