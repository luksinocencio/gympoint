import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Tabs from '~/navigator/Tabs'

import SignIn from './pages/SignIn'

const AuthStack = createStackNavigator(
  {
    SignIn,
  },
  {
    headerMode: 'none',
  },
)

const Routes = (signed = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        AuthStack,
        Tabs: createStackNavigator(
          {
            Tabs,
          },
          {
            headerMode: 'none',
          },
        ),
      },
      {
        initialRouteName: signed ? 'Tabs' : 'AuthStack',
      },
    ),
  )

export default Routes
