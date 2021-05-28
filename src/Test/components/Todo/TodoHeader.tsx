import React, { useState } from 'react'

import todoModel from './todoModel'

const ENTER_KEY = 13

export default function TodoHeader() {
  const [content, setContent] = useState('')

  const { addTodo } = todoModel.useActions()

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === ENTER_KEY && content !== '') {
      event.preventDefault()
      addTodo(content)
      setContent('')
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setContent(event.target.value)
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        value={content}
        placeholder="What needs to be done?"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        autoFocus={true}
      />
    </header>
  )
}