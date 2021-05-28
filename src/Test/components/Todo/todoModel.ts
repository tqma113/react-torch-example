import { setupStore } from 'react-torch/client'
import { createReactModel } from 'react-torch/client'

export interface Todo {
  id: number,
  content: string,
  completed: boolean
}

export type Todos = Todo[]

const initialState: Todos = []

/**
 * 编写 reducer 的方式进行了简化
 * 第一个参数为 state
 * 第二个参数为 payload，不需要添加 { type, payload } 的对象
 * payload 可以是任意纯数据类型(JSON)，但不能是函数，或者带原型的对象
 */
const addTodo = (todos: Todos, content: string) => {
  let todo = {
    id: Date.now(),
    content,
    completed: false,
  }
  return todos.concat([todo])
}

const removeTodo = (todos: Todos, id: number) => {
  return todos.filter((todo) => todo.id !== id)
}

const updateTodoContent = (todos: Todos, { id, content }: { id: number; content: string }) => {
  return todos.map((todo) => {
    if (todo.id !== id) return todo
    return {
      ...todo,
      content: content,
    }
  })
}

const updateTodoStatus = (todos: Todos, { id, completed }: { id: number; completed: boolean }) => {
  return todos.map((todo) => {
    if (todo.id !== id) return todo
    return {
      ...todo,
      completed,
    }
  })
}

const toggleTodo = (todos: Todos, id: number) => {
  return todos.map((todo) => {
    if (todo.id !== id) return todo
    return {
      ...todo,
      completed: !todo.completed,
    }
  })
}

const toggleAll = (todos: Todos) => {
  let isAllCompleted = todos.every((todo) => todo.completed)

  return todos.map((todo) => {
    return {
      ...todo,
      completed: !isAllCompleted,
    }
  })
}

const clearCompleted = (todos: Todos) => {
  return todos.filter((todo) => !todo.completed)
}

// export react model
export default createReactModel(() => {
  let { store, actions } = setupStore({
    // 可选参数，会反映到 redux-devtools 里的 name
    name: 'todos',
    // 必选参数：initialState
    initialState,
    // 必须参数：reducers，更新状态函数
    reducers: {
      addTodo,
      removeTodo,
      updateTodoContent,
      updateTodoStatus,
      toggleTodo,
      toggleAll,
      clearCompleted,
    },
    // 可选参数，是否开启 redux-logger，默认为 false
    logger: true,
    // 可选参数，是否开启 redux-devtools，默认为 true
    devtools: true,
  })

  // 必须返回 store + actions 的对象结构
  return { store, actions }
})
