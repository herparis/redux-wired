import React, { useContext, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getArguments from 'es-arguments'

const WiredContext = createContext(null)

function getDefaultProps(component){
  if(component.defaultProps){
    return Object.keys(component.defaultProps)
  }

  const componentArguments = getComponentProps(component)
  return Object.values(componentArguments)
}

function getComponentProps(component) {
  const [args] = getArguments(component)
  let argsArray = args.split(',')
  argsArray = argsArray.map((arg) => arg.replace(/[{}]/g, '').trim())

  return { ...argsArray }
}

function useAction(action) {
  const dispatch = useDispatch()
  return (value) => dispatch(action(value))
}

function useWired(reduxBundle, componentProp, handleHook) {
  let propsFromStore
  Object.values(reduxBundle).forEach((func) => {
    propsFromStore = updatePropsWithStore(func, componentProp, handleHook)
  })

  return propsFromStore
}

const updatePropsWithStore = (func, componentProp, handleHook) => ({
  ...func(componentProp, handleHook)
})

/**
 * Makes all your actions and selectors available to all your selected components that are wiredUp
 */
export const WProvider = ({ wired, children }) => (
  <WiredContext.Provider value={wired}>{children}</WiredContext.Provider>
)

/**
 * Accepts any functional component to wired-up to the store, and give them access to the
 * accions and selectors they need. These components has to have as props the values of the
 * ACTIONS_TYPES and SELECTORS_TYPES.
 * 
 * @example
 * export default wiredUp(component)
 */
export const wiredUp = (WrappedComponent) => (props) => {
  const { actions, selectors } = useContext(WiredContext)
  const defaultProps = getDefaultProps(WrappedComponent)

  let newProps = props
  defaultProps.forEach((componentProp) => {
    newProps = {
      ...newProps,
      ...useWired(actions, componentProp, useAction),
      ...useWired(selectors, componentProp, useSelector)
    }
  })

  return <WrappedComponent {...newProps} />
}

/**
 * Wired-up all your actions and selectors included on the redux store to your selected components
 *
 * @returns actions and selectors object
 * 
 * @example 
 * const combineActions = { actions1, actions2, ... }
 * const combineSelectors = { selectors1, selectors2, ... }
 * 
 * const Wired = wired({ combineActions, combineSelectors })
 */
export const wired = (actions, selectors) => ({ actions, selectors })
