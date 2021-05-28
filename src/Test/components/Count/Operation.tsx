import React from 'react'

import model from './model'

export default () => {
  const { inscrease, descrease } = model.useActions()

  return (
    <div>
      <button onClick={() => descrease()}>DES</button>
      <button onClick={() => inscrease()}>INS</button>
    </div>
  )
}