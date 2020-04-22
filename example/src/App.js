import React from 'react'
import { Provider } from 'react-redux'
import { WProvider } from 'redux-wired'

import Store from './redux/store'
import Component from './Component'
import Wired from './redux/wired'

function App() {
  return (
    <Provider store={Store}>
      <WProvider wired={Wired}>
        <Component />
      </WProvider>
    </Provider>
  )
}

export default App
