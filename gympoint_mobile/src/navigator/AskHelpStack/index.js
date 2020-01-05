import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator } from 'react-navigation-stack'

import HeaderTitle from '~/components/HeaderTitle'
import Answear from '~/pages/Answear'
import AskHelp from '~/pages/AskHelp'
import NewOrder from '~/pages/NewOrder'

const AskHelpStack = createStackNavigator(
  {
    AskHelp,
    NewOrder,
    Answear,
  },
  {
    defaultNavigationOptions: {
      headerTitle: HeaderTitle,
      headerBackTitle: null,
      headerTintColor: '#ee4d64',
    },
    navigationOptions: {
      tabBarLabel: 'Pedir ajuda',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="help-box" size={20} color={tintColor} />
      ),
    },
  },
)

export default AskHelpStack
