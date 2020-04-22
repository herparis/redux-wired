import React, { useContext, createContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import getArguments from 'es-arguments'

const WiredContext = createContext(null)

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

export const WProvider = ({ wired, children }) => (
  <WiredContext.Provider value={wired}>{children}</WiredContext.Provider>
)

export const wiredUp = (WrappedComponent) => (props) => {
  const { actions, selectors } = useContext(WiredContext)
  const defaultProps = getComponentProps(WrappedComponent)
  const defaultPropsArray = Object.values(defaultProps)

  let newProps = props
  defaultPropsArray.forEach((componentProp) => {
    newProps = {
      ...newProps,
      ...useWired(actions, componentProp, useAction),
      ...useWired(selectors, componentProp, useSelector)
    }
  })

  return <WrappedComponent {...newProps} />
}

export const wired = (actions, selectors) => ({ actions, selectors })
