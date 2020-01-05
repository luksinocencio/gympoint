import 'react-native-gesture-handler'
import '~/config/ReactotronConfig'
import React from 'react'
import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import App from './App'
import { store, persistor } from './store'

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}
