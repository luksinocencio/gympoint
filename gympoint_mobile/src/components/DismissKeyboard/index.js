import React from 'react'
import { TouchableWithoutFeedback, Keyboard } from 'react-native'

import PropTypes from 'prop-types'

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
)

DismissKeyboard.propTypes = {
  children: PropTypes.element.isRequired,
}

export default DismissKeyboard
