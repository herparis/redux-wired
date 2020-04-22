import { wired } from 'redux-wired'
import { actions } from './action'
import { selectors } from './selectors'

const combineActions = {
  actions,
}

const combineSelectors = {
  selectors,
}

const Wired = wired(combineActions, combineSelectors)

export default Wired
