import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { createStackNavigator } from 'react-navigation-stack'

import HeaderTitle from '~/components/HeaderTitle'
import Checkins from '~/pages/Checkins'

const CheckinsStack = createStackNavigator(
  {
    Checkins,
  },
  {
    defaultNavigationOptions: {
      headerTitle: HeaderTitle,
    },
    navigationOptions: {
      tabBarLabel: 'Check-ins',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="map-marker-check" size={20} color={tintColor} />
      ),
    },
  },
)

export default CheckinsStack
