import React, { useState, MouseEvent } from 'react'
import { NextComponentType } from 'next'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import { MenuItem, MenuItemProps } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'
import { OtherIcon } from './styles'
import Tooltip from '@material-ui/core/Tooltip'
import Link from 'next/Link'
import { BlogDelete } from '../blog/Delete'

interface Props {
  id: string
}

const ExpansionPanel = withStyles({
  root: {
    fontSize: '2.5rem'
  }
})(MoreVert)

const TooltipItem = withStyles({
  tooltip: {
    fontSize: '1.5rem',
    padding: '1rem',
    backgroundColor: '#c6c6c6',
    color: '#f5f5f5'
  }
})(Tooltip)

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

export const Other: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  type LinkMenuItemProps = Omit<
    MenuItemProps<'a', { href: string; as: string }>,
    'component' | 'button'
  >

  const LinkMenuItem = React.forwardRef<HTMLAnchorElement, LinkMenuItemProps>(
    function LinkMenuItem(props, forwardedRef) {
      const { href, as, ...other } = props
      return (
        <Link href={href} as={as} {...other}>
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

  return (
    <div>
      <TooltipItem title="Details" placement="top">
        <OtherIcon
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <ExpansionPanel />
        </OtherIcon>
      </TooltipItem>
      <StyledMenu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <LinkMenuItem href="/edit/[id]" as={`/edit/${props.id}`} />
        <MenuItems
          onClick={handleClose}
          style={{ backgroundColor: 'transparent' }}
        >
          <BlogDelete id={props.id} />
        </MenuItems>
      </StyledMenu>
    </div>
  )
}
