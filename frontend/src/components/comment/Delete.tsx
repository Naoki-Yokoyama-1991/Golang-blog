import React, { useState, MouseEvent, useCallback } from 'react'
import { NextComponentType } from 'next'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import { MenuItem, MenuItemProps } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { withStyles } from '@material-ui/styles'
import { OtherIcon } from './styles'
import Tooltip from '@material-ui/core/Tooltip'
import Link from 'next/Link'
import { BlogDelete } from '../blog/Delete'
import { useApolloClient } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
import {
  useDeleteCommentMutation,
  useGetProfileQuery
} from '../../generated/types.d'

interface Props {
  id: string
  refetch: () => void
}

const ExpansionPanel = withStyles({
  root: {
    fontSize: '2.5rem'
  }
})(MoreVert)

const MenuItems = withStyles({
  root: {
    fontSize: '1.5rem',
    color: '#939393',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    '&:hover': {
      color: '#444444'
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

export const CommentDelete: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const userData = useGetProfileQuery()

  const [errors, userError] = useState<string>()
  const router = useRouter()
  const client = useApolloClient()

  const [deleteMutation] = useDeleteCommentMutation()

  const handleDelete = useCallback(async () => {
    await deleteMutation({
      variables: {
        id: props.id
      }
    })
      .then(() => {
        client.cache.reset()
        props.refetch()
      })
      .catch((e) => {
        userError(e.message)
      })
  }, [client, router, deleteMutation])
  let deletecomment
  if (userData.data && userData && !userData.loading) {
    deletecomment = (
      <div>
        <OtherIcon
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <ExpansionPanel />
        </OtherIcon>
        <StyledMenu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItems
            onClick={handleDelete}
            style={{ backgroundColor: 'transparent' }}
          >
            DELETE
          </MenuItems>
        </StyledMenu>
      </div>
    )
  }

  return <>{deletecomment}</>
}
