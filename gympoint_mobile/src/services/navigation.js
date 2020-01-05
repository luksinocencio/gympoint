import { Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'

let navigator

function setNavigator(ref) {
  navigator = ref
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  )
}

function getRoutName(routeName) {
  navigator.dispatch(Alert.alert(routeName))
}

function goBack() {
  navigator.dispatch(NavigationActions.back())
}

export { setNavigator, navigate, getRoutName, goBack }
