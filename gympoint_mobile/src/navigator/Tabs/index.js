import { createBottomTabNavigator } from 'react-navigation-tabs'

import AskHelpStack from '~/navigator/AskHelpStack'
import CheckinsStack from '~/navigator/CheckinsStack'

const Tabs = createBottomTabNavigator(
  {
    CheckinsStack,
    AskHelpStack,
  },
  {
    initialRouteName: 'CheckinsStack',
    tabBarOptions: {
      activeTintColor: '#ee4e62',
      inactiveTintColor: '#999999',
    },
  },
)

export default Tabs
