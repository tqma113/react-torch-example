import React, { useState, useMemo, useEffect, useRef } from 'react'
import classNames from 'classnames'

import todoModel, { Todo } from './todoModel'

const ENTER_KEY = 13
const ESCAPE_KEY = 27

interface Props {
  key: number
  todo: Todo
}

export default function TodoItem({
  todo
}: Props) {
  const inputEl = useRef<HTMLInputElement>(null)
  const [editText, setEditText] = useState('')
  const [editing, setEditing] = useState(0)
  
  const { toggleTodo, removeTodo, updateTodoContent } = todoModel.useActions()

  const isSelfEditing = useMemo(() => {
    return (
      editing !== null &&
      todo.id === editing
    )
  }, [todo, editing])
  
  useEffect(() => {
    if (isSelfEditing && inputEl.current) {
      inputEl.current.focus()
    }
  }, [isSelfEditing])

  const handleToggle = () => {
    toggleTodo(todo.id)
  }

  const handleDelete = () => {
    removeTodo(todo.id)
  }

  const handleEdit = (): void => {
    setEditText(todo.content)
  }

  const handleSubmit = (): void => {
    const content = editText

    if (content) {
      updateTodoContent({ id: todo.id, content })
      setEditText(content)
    } else {
      removeTodo(todo.id)
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEditText(event.target.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.keyCode === ESCAPE_KEY) {
      setEditText(todo.content)
      setEditing(todo.id)
    } else if (event.keyCode === ENTER_KEY) {
      handleSubmit()
    }
  }

  return (
    <li className={classNames({
      completed: todo.completed,
      editing: isSelfEditing
    })}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
        />
        <label onDoubleClick={handleEdit}>
          {todo.content}
        </label>
        <button className="destroy" onClick={handleDelete} />
      </div>
      <input
        ref={inputEl}
        className="edit"
        value={editText}
        onBlur={handleSubmit}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </li>
  )
}