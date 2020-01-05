import React from 'react'
import { MdArrowBack, MdArrowForward } from 'react-icons/md'

import PropTypes from 'prop-types'

import { MPaginator } from './styles'

export default function PaginatorComponent({
  lastPage,
  page,
  handlePreviousPageChange,
  handleNextPageChange,
  ...rest
}) {
  return (
    <MPaginator {...rest}>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => {
          handlePreviousPageChange()
        }}>
        <MdArrowBack color="#000" size={20} />
      </button>

      <span>{page}</span>

      <button
        disabled={lastPage}
        type="button"
        onClick={() => {
          handleNextPageChange()
        }}>
        <MdArrowForward color="#000" size={20} />
      </button>
    </MPaginator>
  )
}

PaginatorComponent.defaultProps = {
  lastPage: null,
  page: null,
  handlePreviousPageChange: () => {},
  handleNextPageChange: () => {},
}

PaginatorComponent.propTypes = {
  lastPage: PropTypes.bool,
  page: PropTypes.number,
  handlePreviousPageChange: PropTypes.func,
  handleNextPageChange: PropTypes.func,
}
