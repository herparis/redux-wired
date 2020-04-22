import { DO_ACTION_1, DO_ACTION_2 } from '../constants/index'

const doAction1 = value => ({
  type: DO_ACTION_1,
  payload: value
})

const doAction2 = text => ({
  type: DO_ACTION_2,
  payload: text
})

//users has to elavorate an actions function that listed all actions regarding their action type
export function actions(prop, getAction) {
  switch(prop) {
    case DO_ACTION_1: {
      return { [prop]: getAction(doAction1) }
    }
    case DO_ACTION_2: {
      return { [prop]: getAction(doAction2) }
    }
    default:
      return null
  }
}
