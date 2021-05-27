import React from 'react'

export function counter() {
  const [count, setCount] = React.useState(0)

  const inc = () => {
    console.log('inc')
    setCount(count + 1)
  }
  const dec = () => {
    console.log('dec')
    setCount(count - 1)
  }

  return { count, inc, dec }
}
