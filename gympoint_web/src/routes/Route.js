import React from 'react'
import { useDispatch } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

import PropTypes from 'prop-types'

import { store } from '~/store'
import { setActiveNavItem } from '~/store/modules/navitem/actions'

import AuthLayout from '../pages/_layouts/auth'
import DefaultLayout from '../pages/_layouts/default'

export default function RouterWrapper({
  component: Component,
  navItem,
  isPrivate,
  ...rest
}) {
  const { signed } = store.getState().auth
  const dispatch = useDispatch()

  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }

  if (signed && !isPrivate) {
    return <Redirect to="/students" />
  }

  const Layout = signed ? DefaultLayout : AuthLayout

  return (
    <Route
      {...rest}
      render={props => {
        if (navItem) dispatch(setActiveNavItem(navItem))
        return (
          <Layout>
            <Component {...props} />
          </Layout>
        )
      }}
    />
  )
}

RouterWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  navItem: PropTypes.string,
}

RouterWrapper.defaultProps = {
  isPrivate: false,
  navItem: '',
  component: null,
}
