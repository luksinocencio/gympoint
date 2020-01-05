import React from 'react'

import PropTypes from 'prop-types'

import { Btn, BtnText } from './styles'

export default function Button({ btText, onPress }) {
  return (
    <Btn onPress={onPress}>
      <BtnText>{btText}</BtnText>
    </Btn>
  )
}

Button.propTypes = {
  btText: PropTypes.string,
  onPress: PropTypes.func,
}

Button.defaultProps = {
  btText: '',
  onPress: () => {},
}
