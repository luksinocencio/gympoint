import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import logo from '~/assets/image/menu-logo.png'
import Notifications from '~/components/Notifications'
import { signOut } from '~/store/modules/auth/actions'

import { items } from './navigation'
import { Container, Content, Logo, Nav, NavItem, Profile } from './styles'

export default function Header() {
  const dispatch = useDispatch()
  const activeNavItem = useSelector(state => state.navitem.navItem)

  function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <Container>
      <Content>
        <Link to="/">
          <Logo>
            <img src={logo} alt="Gympoint" />
          </Logo>
        </Link>

        <Nav>
          {Object.keys(items).map(key => {
            const item = items[key]

            return (
              <NavItem
                key={item.name}
                active={activeNavItem === item.name ? 'true' : 'false'}
                to={item.route}>
                {item.name}
              </NavItem>
            )
          })}
        </Nav>

        <aside>
          <Notifications />
          <Profile>
            <strong>Admin</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}
