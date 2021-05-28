import React, { useMemo } from 'react'
import classNames from 'classnames'

import todoModel from './todoModel'
import showingModel, { Showing } from './showingModel'

export default function TodoFooter() {
  const todos = todoModel.useState()
  const { clearCompleted } = todoModel.useActions()

  const showing = showingModel.useState()
  const { toggle } = showingModel.useActions()

  const { count, completedCount } = useMemo(() => {
    let count = todos.filter(todo => !todo.completed).length
    let completedCount = todos.length - count
    return { count, completedCount }
  }, [todos])


  const handleClick = () => {
    clearCompleted()
  }

  const handleTagClick = (showing: Showing) => {
    toggle(showing)
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{count}</strong> {count > 1 ? 'items' : 'item'} left
      </span>
      <ul className="filters">
        <li>
          <a
            onClick={() => handleTagClick(Showing.ALL)}
            className={classNames({ selected: showing === Showing.ALL })}>
            All
          </a>
        </li>
        {' '}
        <li>
          <a
            onClick={() => handleTagClick(Showing.ACTIVE)}
            className={classNames({ selected: showing === Showing.ACTIVE })}>
            Active
          </a>
        </li>
        {' '}
        <li>
          <a
            onClick={() => handleTagClick(Showing.COMPLETED)}
            className={classNames({ selected: showing === Showing.COMPLETED })}>
            Completed
          </a>
        </li>
      </ul>
      {completedCount > 0 &&
        <button
          className="clear-completed"
          onClick={handleClick}>
          Clear completed
    </button>}
    </footer>
  )
}