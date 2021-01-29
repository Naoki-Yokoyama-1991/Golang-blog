import React, {
  useContext,
  Fragment,
  useState,
  MouseEvent,
  useCallback
} from 'react'
import { ThemeContext } from 'styled-components'
import Link from 'next/Link'
import {
  ContainerTop,
  ContainerBottom,
  Toggle,
  Logo,
  Mood,
  LogoBox,
  Nav,
  ListItem,
  Menu,
  Create,
  BackHover,
  CreateMenu
} from './styles'
import { GlobalToggle } from '../Layout'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import { Box } from '@material-ui/core'
import InputIcon from '@material-ui/icons/Input'
import HomeIcon from '@material-ui/icons/Home'
import className from 'classnames'
import PostAddIcon from '@material-ui/icons/PostAdd'
import { destroyToken } from '../../../utils/configureClient'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/react-hooks'
import Cookies from 'js-cookie'
import { useGetProfileQuery, useLogoutMutation } from '../../generated/types.d'
import { useCookies } from 'react-cookie'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import CallMissedOutgoingIcon from '@material-ui/icons/CallMissedOutgoing'
import CreateIcon from '@material-ui/icons/Create'
import AddIcon from '@material-ui/icons/Add'

interface Props {}

export const Side: React.FC<Props> = () => {
  const isServer = () => typeof window === 'undefined'

  const { data, loading, refetch } = useGetProfileQuery()
  const [logout, { loading: logoutFetching }] = useLogoutMutation()
  let switchReact = null
  const { title } = useContext(ThemeContext)
  const toggle = useContext(GlobalToggle)
  const client = useApolloClient()
  const router = useRouter()
  const [click, setClick] = useState('active')
  // event_blogs_call
  const handleOnClick = (name: string) => {
    setClick(name)
  }

  const handleClick = async (e: MouseEvent) => {
    setClick('signin')
    e.preventDefault
    logout()
    destroyToken()
    client.clearStore().then(() => {
      router.push('/dashboard/login')
    })
    // window.location.reload()
  }
  // active button
  let signupClass = className(click == 'signup' ? 'active' : 'signup')
  let activeClass = className(location.pathname == '/' ? 'active' : 'signin')
  let signinClass = className(
    location.pathname == '/dashboard/user' ? 'active' : 'signin'
  )
  let loginClass = className(
    location.pathname == '/dashboard/login' ? 'active' : 'signin'
  )
  let registerClass = className(
    location.pathname == '/dashboard/register' ? 'active' : 'signin'
  )
  let homeClass = className(location.pathname == '/' ? 'active' : 'signin')

  let createClass = className('createItem')

  if (loading) {
  } else if (Cookies.get('token')) {
    switchReact = (
      <Fragment>
        <Nav>
          <Link href="/">
            <BackHover
              className={homeClass}
              onClick={() => handleOnClick('signup')}
            >
              <ListItem>
                <Box mr={1.5} pt={1}>
                  <HomeIcon style={{ fontSize: 26 }} />
                </Box>
                <Menu>Home</Menu>
              </ListItem>
            </BackHover>
          </Link>
          <Link href="/dashboard/user">
            <BackHover
              className={signinClass}
              onClick={() => handleOnClick('signin')}
            >
              <ListItem>
                <Box mr={1.5} pt={1}>
                  <AccountCircleIcon style={{ fontSize: 26 }} />
                </Box>
                <Menu>Dashboard</Menu>
              </ListItem>
            </BackHover>
          </Link>
          <BackHover onClick={handleClick}>
            <ListItem>
              <Box mr={1.5} pt={1}>
                <CallMissedOutgoingIcon style={{ fontSize: 26 }} />
              </Box>
              <Menu>Sign out</Menu>
            </ListItem>
          </BackHover>
          <Link href="/blog/create">
            <Create onClick={() => handleOnClick('')}>
              <ListItem className={createClass}>
                <Box mr={0.5} pt={1}>
                  <AddIcon style={{ fontSize: 20 }} />
                </Box>
                <CreateMenu>New Create</CreateMenu>
              </ListItem>
            </Create>
          </Link>
        </Nav>
      </Fragment>
    )
  } else if (!Cookies.get('token')) {
    switchReact = (
      <Nav>
        <Link href="/">
          <BackHover
            className={homeClass}
            onClick={() => handleOnClick('active')}
          >
            <ListItem>
              <Box mr={1.5} pt={1}>
                <HomeIcon style={{ fontSize: 26 }} />
              </Box>
              <Menu>Home</Menu>
            </ListItem>
          </BackHover>
        </Link>
        <Link href="/dashboard/register">
          <BackHover
            className={registerClass}
            onClick={() => handleOnClick('signup')}
          >
            <ListItem>
              <Box mr={1.5} pt={1}>
                <PersonAddIcon style={{ fontSize: 26 }} />
              </Box>
              <Menu>Sign up</Menu>
            </ListItem>
          </BackHover>
        </Link>
        <Link href="/dashboard/login">
          <BackHover
            className={loginClass}
            onClick={() => handleOnClick('signin')}
          >
            <ListItem>
              <Box mr={1.5} pt={1}>
                <InputIcon style={{ fontSize: 26 }} />
              </Box>
              <Menu>Sign in</Menu>
            </ListItem>
          </BackHover>
        </Link>
      </Nav>
    )
  }

  return (
    <Fragment>
      <ContainerTop>
        <LogoBox>
          <Box>
            <PostAddIcon style={{ fontSize: 40, color: '#3D8BF2' }} />
          </Box>
          <Logo>BLOGs</Logo>
        </LogoBox>
      </ContainerTop>
      <ContainerBottom>
        {switchReact}
        <Mood>
          <Toggle
            onChange={toggle}
            checked={title == 'Dark'}
            offColor={'#d4e4f3'}
            onColor={'#3D8BF2'}
            onHandleColor={'#d4e4f3'}
            offHandleColor={'#3D8BF2'}
            activeBoxShadow={'0 0 10px 2px #d4e4f3'}
            height={14}
            width={46}
            checkedIcon={false}
            uncheckedIcon={false}
            handleDiameter={24}
          />
          <Box ml={3} fontWeight={400}>
            {title}
          </Box>
        </Mood>
      </ContainerBottom>
    </Fragment>
  )
}
