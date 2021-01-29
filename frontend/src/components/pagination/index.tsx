import React, { useState, MouseEvent } from 'react'
import { NextPage } from 'next'
import {
  OtherIcon,
  Number,
  ArrowIcon,
  NumberIcon
} from '../../styles/pages/pagination/connection'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import { MenuItem } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'

const MenuItems = withStyles({
  root: {
    '&:nth-of-type(1)': {
      fontSize: '2rem',
      color: '#3D8BF2',
      borderBottom: '1px solid #3D8BF2',
      margin: '0',
      padding: '0.5rem',
      paddingLeft: '1rem'
    },
    '&:nth-of-type(2)': {
      fontSize: '2rem',
      color: '#3D8BF2',
      margin: '0',
      padding: '0.5rem',
      paddingRight: '1.5rem',
      paddingLeft: '1rem',
      borderBottom: '1px solid #3D8BF2'
    },
    '&:nth-of-type(3)': {
      fontSize: '2rem',
      color: '#3D8BF2',
      paddingRight: '1.5rem',
      paddingLeft: '1rem'
    }
  }
})(MenuItem)

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #3D8BF2',
    boxShadow: '0.5rem 0.5rem 0.5rem #eeee'
  }
})((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))

interface Props {}

export const PageIndex: React.FC<Props> = (props) => {
  // number search
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const [limit, setLimit] = useState<number>(4)

  const handleClose = (number: number) => {
    setAnchorEl(null)
    setLimit(number)
  }

  return (
    <div>
      <OtherIcon
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Number>
          <ArrowIcon>
            <ArrowDropDownIcon style={{ fontSize: 35 }} />
          </ArrowIcon>
          <NumberIcon>{limit}</NumberIcon>
        </Number>
      </OtherIcon>
      <StyledMenu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItems
          button
          onClick={() => handleClose(4)}
          style={{ backgroundColor: 'transparent' }}
        >
          <ArrowIcon>
            <ArrowDropDownIcon style={{ fontSize: 35, marginTop: 5 }} />
          </ArrowIcon>
          <NumberIcon>4</NumberIcon>
        </MenuItems>
        <MenuItems
          button
          onClick={() => handleClose(8)}
          style={{ backgroundColor: 'transparent' }}
        >
          <ArrowIcon>
            <ArrowDropDownIcon style={{ fontSize: 35, marginTop: 5 }} />
          </ArrowIcon>
          <NumberIcon>8</NumberIcon>
        </MenuItems>
        <MenuItems
          onClick={() => handleClose(12)}
          style={{ backgroundColor: 'transparent' }}
        >
          <ArrowIcon>
            <ArrowDropDownIcon style={{ fontSize: 35, marginTop: 5 }} />
          </ArrowIcon>
          <NumberIcon>12</NumberIcon>
        </MenuItems>
      </StyledMenu>
    </div>
  )
}
