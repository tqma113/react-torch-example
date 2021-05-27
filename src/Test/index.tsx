import React from 'react'
import { createPage } from 'react-torch/client'

// function counter() {
//   const [count, setCount] = React.useState(0)

//   const inc = () => {
//     setCount(count + 1)
//   }
//   const dec = () => {
//     setCount(count - 1)
//   }

//   return { count, inc, dec }
// }

const About = createPage(({ history, context }) => {
  // const { count, inc, dec } = useModel(counter)
  const View = () => {
    return (
      <div>
        {/* <div>{count}</div>
        <button onClick={inc}>Increase</button>
        <button onClick={dec}>Decrease</button> */}
      </div>
    )
  }

  return View
})

export default About
