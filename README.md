# REDUX-WIRED

Redux-Wired help you improves react applications that use the redux library.

It helps you write components that connect to redux store in a way that behave consistently, perfectly manage, and easy to test. On top of that, it provides a great developer experience

You must use Redux-Wired together with [React](https://reactjs.org) and [Redux Framework](https://reduxframework.com/).

## Learn REDUX-WIRED

### Just the Basics

If you're brand new to Redux-Wired and want to understand the basic concepts, see:

- Motivations: Stablish a middle ground between the concept of container and wrappers and the hook squema. Mantain components as independent as we can, their only inputs being the props and as the same time not overloading them. More easy to make unit testing

## Before Proceeding Further

Redux-Wired is a valuable tool for organizing your redux's actions and selectors, and improving the general arquitecture of your functional components, but you should also consider whether it's appropriate for your situation. Don't use WireUp just because someone said you should - take some time to understand the potential benefits and tradeoffs of using it.

Here are some suggestions on when it makes sense to use WireUp:

- You are using react or react-native
- You are using redux
- You have reasonable amounts of actions and selectors changing over time
- You need a single source of truth for your components
- You find that using hooks isn't helping you for unit-testing
- You find that using redux connect is making your component less readable

Yes, these guidelines are subjective and vague, but this is for good reason. The point at which you should integrate WireUp into your application is different for every user and different for every application.

## Influences

Redux-Wired evolves the ideas of [Redux](http://facebook.github.io/flux/), but avoids its complexity by taking cues from React hooks. Even if you haven't used Hooks, Redux-Wired only takes a few minutes to get started with in.

## Installation

To install the stable version:

```sh
npm install redux-wired
```

```sh
yarn add redux-wired
```

This assumes you are using [npm](https://www.npmjs.com/) or [yarn](https://https://yarnpkg.com/) as your package manager.

Most commonly, people consume WireUp as a collection of [CommonJS](https://github.com/webpack/docs/wiki/commonjs) modules. These modules are what you get when you import `wireup` in a [Webpack](https://webpack.js.org/), [Browserify](http://browserify.org/), or a Node environment. If you like to live on the edge and use [Rollup](https://rollupjs.org), we support that as well.

The WireUp source code is written in ES2015

### Requirement Packages

You'll also need [the React libraries](https://github.com/reduxjs/react-redux) and [the Redux libraries](https://github.com/reduxjs/redux).

```sh
npm install redux
npm install react-redux
```

```sh
yarn add redux
yarn add react-redux
```

## The Time Has Come

While you manage all your state of your app with redux and all your components are available to access that state connecting to the store, you have to tell every component what action or selector they want as a prop, or of course you can use hooks, but you loose control as they not are props anymore.
  So what do we do then!!, redux-wired comes to save the day. You only had to wiredUp the component to the store and declare the props on components arguments

That's it!

# First Things First

We setup the wired to connect the actions and selectors

```js
import { wired } from 'redux-wired'

/**
 * Redux use ACTION_TYPES constants for dispatch actions
*/

const DO_ACTION_1 =  'doUpdate1'
const DO_ACTION_2 = 'doUpdate2'

/**
 * Here we also use SELECTOR_TYPES constants for the seletors
*/

const GET_VALUE_1 =  'value1'
const GET_VALUE_2 = 'value2'

/**
 * This is a selector, a reducer like function with (prop, function) => {} signature.
 * It describes how the selectors and actions transforms the component props into redux store props.
 *
 * we use a `switch` statement and string contants, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */

/**
 * this one is handling the selectors of the redux store, you have to make use of the SELECTOR_TYPES as
 * the switch cases
*/
const getSelector1 = state => state.someReduxState1
const getSelector2 = state => state.someReduxState2

function selectors(prop, selector) {
  switch(prop) {
    case GET_VALUE_1: {
      return { [prop]: selector(getSelector1) }
    }
    case GET_VALUE_2: {
      return { [prop]: selector(getSelector2) }
    }
    default:
      return null
  }
}
/**
 * this one is handling the actions of the redux store, you have to make use of the ACTIONS_TYPES as
 * the switch cases
*/
const doAction1 = () => ({ type: DO_ACTION_1, payload: 'some action' })
const doAction2 = () => ({ type: DO_ACTION_2, payload: 'some other action' })

function actions(prop, action) {
  switch(prop) {
    case DO_ACTION_1: {
      return { [prop]: action(doAction1) }
    }
    case DO_ACTION_2: {
      return { [prop]: action(doAction2) }
    }
    default:
      return null
  }
}

const combineActions = { actions }
const combineSelectors = { selectors }

// Create a Wired holding all actions and selectors of your app.
const Wired = wired(combineActions, combineSelectors)
```

# We Pass the Provider
```js
import { WProvider } from 'redux-wired'
<Provider store={store}>
  ...
  <WProvider wired={Wired}>
    ...
      <App />
    ...
  </WProvider>
  ...
</Provider>
```

# Finally, The Component!

```js
import React from 'react'
import { wiredUp } from 'redux-wired'

//The props name has to match with the ACTION_TYPES and SELECTOR_TYPES contanst values
const Component = ({
  value1,
  doUpdate1,
  ...rest,
}) => {
  return (
    <div>
      <button onClick={() => doUpdate1(value1 + 1)}>PRESS ME!!</button>
      <p>{value1}</p>
    </div>
  )
}

// the magic happends
export default wiredUp(Component)
```

If create your component with defaultProps, its important that you declare your redux props store with the same name as the constants ACTIONS_TYPES and SELECTOR_TYPES values. The default value for this specific props will be undefined

## Component With Props

```js
import React from 'react'
import { wiredUp } from 'redux-wired'

//The props name has to match with the ACTION_TYPES and SELECTOR_TYPES contanst values
const Component = ({
  value1,
  doUpdate1,
  ...rest,
}) => {
  return (
    <div>
      <button onClick={() => doUpdate1(value1 + 1)}>PRESS ME!!</button>
      <p>{value1}</p>
    </div>
  )
}

//its important to declare all you redux props here, handle your other props as you wish
Component.defaultProps = {
  value1: undefined,
  doUpdate1: undefined,
  ...otherProps
}

// the magic happends
export default wiredUp(Component)
```

### Troubleshooting

If you experience some issues or bug trying to wired-up your component normally, use instead the defaultProps second example

## License

[MIT](LICENSE.md)
