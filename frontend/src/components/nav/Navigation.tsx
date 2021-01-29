import React, { useState, MouseEvent, useCallback } from 'react'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import { NextComponentType } from 'next'
import { MenuItem, MenuItemProps } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { useApolloClient } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import {
  useGetProfileQuery,
  useImageGetUserQuery
} from '../../generated/types.d'
import {
  ContainerTop,
  Name,
  Login,
  OtherIcon
} from '../../styles/pages/dashboard/User'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'
import { UserDelete } from '../user/Delete'
import Link from 'next/Link'
import { ImageUser } from './styles'
interface Props {
  id: string
  refetch: () => void
}

const MenuItems = withStyles({
  root: {
    '&:nth-of-type(1)': {
      paddingLeft: '2.1rem',
      fontSize: '1.5rem',
      color: '#939393',
      borderBottom: '1px solid #d3d4d5',
      paddingTop: '1rem',
      paddingBottom: '1.4rem',
      '&:hover': {
        color: '#444444'
      }
    },
    '&:nth-of-type(2)': {
      textTransform: 'lowercase',
      fontSize: '1.5rem',
      color: '#939393',
      paddingTop: '1.6rem',
      '&:hover': {
        color: '#444444'
      }
    }
  }
})(MenuItem)
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    boxShadow: '0.5rem 0.5rem 0.5rem #eeee',
    borderRadius: '0.5rem'
  }
})((props: MenuProps) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))

const Nav: NextComponentType<Props> = (props) => {
  let userImage = useImageGetUserQuery()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  type LinkMenuItemProps = Omit<
    MenuItemProps<'a', { href: string }>,
    'component' | 'button'
  >

  const LinkMenuItem = React.forwardRef<HTMLAnchorElement, LinkMenuItemProps>(
    function LinkMenuItem(props, forwardedRef) {
      const { href, ...other } = props
      return (
        <Link href={href} {...other}>
          <MenuItems
            button
            onClick={handleClose}
            style={{ backgroundColor: 'transparent' }}
          >
            EDIT
          </MenuItems>
        </Link>
      )
    }
  )

  const userData = useGetProfileQuery()

  let deletecomment
  if (userData.data && userData && !userData.loading) {
    deletecomment = (
      <ContainerTop>
        <OtherIcon
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Login>
            <Name>{userData.data.userProfile.firstName}</Name>
            {!userImage.loading && userImage.data ? (
              <ImageUser src={userImage.data.imageUser} />
            ) : (
              <SentimentSatisfiedAltIcon
                style={{ fontSize: 36, color: '#3D8BF2' }}
              />
            )}
          </Login>
        </OtherIcon>
        <StyledMenu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <LinkMenuItem href="/dashboard/upload" />
          <MenuItems
            onClick={handleClose}
            style={{ backgroundColor: 'transparent' }}
          >
            <UserDelete />
          </MenuItems>
        </StyledMenu>
      </ContainerTop>
    )
  }

  return <>{deletecomment}</>
}

export default Nav
