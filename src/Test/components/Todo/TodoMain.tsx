import React from 'react'

import TodoItem from './TodoItem'

import todoModel from './todoModel'
import showingModel, { Showing } from './showingModel'

export default function TodoList() {
  const todos = todoModel.useState()
  const { toggleAll } = todoModel.useActions()

  const showing = showingModel.useState()

  const hasActiveTodo = todos.some((todo) => {
    return todo.completed === false
  })

  const dTodos = showing === Showing.ALL ? todos : todos.filter((todo) => {
    return (showing === Showing.ACTIVE && !todo.completed) || (showing === Showing.COMPLETED && todo.completed)
  })

  return (
    <section className="main">
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        onChange={toggleAll}
        checked={hasActiveTodo}
      />
      <label
        htmlFor="toggle-all"
      >
        Mark all as complete
      </label>
      <ul className="todo-list">
        {dTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          )
        })}
      </ul>
    </section>
  )
}