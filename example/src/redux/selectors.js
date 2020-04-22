import { GET_VALUE_1, GET_VALUE_2 } from '../constants/index'

const getValue = ({ state }) => state.value
const getText = ({ state }) => state.text


//users has to elavorate a selector function that listed all selectors regarding their selector type
export function selectors(prop, getSelector) {
  switch(prop) {
    case GET_VALUE_1: {
      return { [prop]: getSelector(getValue) }
    }
    case GET_VALUE_2: {
      return { [prop]: getSelector(getText) }
    }
    default:
      return null
  }
}
