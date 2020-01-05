import React from 'react'

import PropTypes from 'prop-types'

import { Container, CheckinNumber, CheckinDate } from './styles'

export default function ItemCheckin({ checkin, index }) {
  return (
    <Container>
      <CheckinNumber>{`Check-in #${index}`}</CheckinNumber>
      <CheckinDate>{checkin.formattedDate}</CheckinDate>
    </Container>
  )
}

ItemCheckin.propTypes = {
  checkin: PropTypes.shape({
    formattedDate: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
}
