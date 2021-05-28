import React, {useEffect} from 'react'
import { createPage, useTorchContext } from 'react-torch/client'
import Count from './components/Count'
import Todo from './components/Todo'

const About = createPage(({ history, context }) => {
  const View = () => {
    const ctx = useTorchContext()

    useEffect(() => {
      console.log(ctx)
    }, [])
    
    return (
      <>
        <Count />
        <Todo />
      </>
    )
  }

  return View
})

export default About
