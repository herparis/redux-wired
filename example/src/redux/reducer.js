import { DO_ACTION_1, DO_ACTION_2 } from '../constants/index'

const INITIAL_STATE = {
  value: 0,
  text: ''
}

//users has to elavorate a selector function that listed all selectors regarding their selector type
export function reducer(initialState = INITIAL_STATE, action) {
  const { type, payload } = action
  switch(type) {
    case DO_ACTION_1:
      return { ...initialState, value: payload }
    case DO_ACTION_2:
      return { ...initialState, text: payload }
    default:
      return initialState
  }
}