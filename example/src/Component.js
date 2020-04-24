//COMPONENT (THE USER CAN USED THIS WAY TOO),
//only has to match props to the constans types values of actions and selectors
import React from 'react'
import { wiredUp } from 'redux-wired'

const Component = ({
  value,
  doUpdateText,
  doUpdateValue,
  text,
  buttonText
}) => {

  function handleButtonClick() {
    const newValue = value + 1
    doUpdateValue(newValue)
  }

  function handleChange(e) {
    doUpdateText(e.target.value)
  }

  return (
    <div>
      <button onClick={handleButtonClick}>{buttonText}</button>
      <p>{value}</p>
      <input value={text} onChange={handleChange}/>
    </div>
  )
}

Component.defaultProps = {
  value: undefined,
  doUpdateText: undefined,
  doUpdateValue: undefined,
  text: undefined,
  buttonText: 'PRESS ME!!'
}

export default wiredUp(Component)