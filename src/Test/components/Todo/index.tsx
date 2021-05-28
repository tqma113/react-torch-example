import React from 'react'
import { Provider } from 'react-torch/client'

import Layout from './Layout'

import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoFooter from './TodoFooter'

import todoModel from './todoModel'
import showingModel from './showingModel'

export default function View() {
  return (
    <Provider list={[{ Model: todoModel }, { Model: showingModel }]}>
      <Layout>
        <TodoHeader />
        <TodoMain />
        <TodoFooter />
      </Layout>
    </Provider>
  )
}