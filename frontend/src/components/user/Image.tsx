import React, { useState, MouseEvent, useCallback, useEffect } from 'react'
import { ImageUser, ImageEmpty } from './styles'
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import { MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { OtherIcon } from '../../styles/pages/dashboard/User'
import { ImageUserDelete } from '../Image/UserDelete'
import { UploadFile } from '../Image/UserUpload'
import CameraAltIcon from '@material-ui/icons/CameraAlt'
//
import { NextComponentType } from 'next'
import {
  useDeleteImageUserMutation,
  useGetProfileQuery,
  useImageGetUserQuery,
  useProfileImageCreateMutation,
  ProfileImageCreateMutation
} from '../../generated/types.d'
import { useApolloClient } from '@apollo/react-hooks'
import { useRouter } from 'next/router'
//

import { InputUserImage, ImageEmptyTop, ImageP } from './styles'

import gql from 'graphql-tag'
import { size } from 'polished'

export const GET_IMAGE_USER = gql`
  query ImageGetUser {
    imageUser
  }
`

const MenuItems = withStyles({
  root: {
    '&:nth-of-type(1)': {
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

export const UserImage: NextComponentType = () => {
  //@Image_Upload
  const [
    mutate,
    { error, loading: loadingUpload }
  ] = useProfileImageCreateMutation()

  function onChangeFile({
    target: {
      validity,
      files: [file]
    }
  }: any) {
    if (validity.valid)
      mutate({ variables: { image: file } })
        .then(() => {
          client.resetStore()
        })
        .catch((e) => {
          userError(e.message)
        })
    console.log(file)
  }

  //
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  //

  const router = useRouter()
  const client = useApolloClient()
  const [errors, userError] = useState<string>()
  const { data, loading, fetchMore, refetch } = useImageGetUserQuery({
    fetchPolicy: 'cache-and-network'
  })

  const [deleteUserImage] = useDeleteImageUserMutation()

  useEffect(() => {
    refetch()
  }, [data])

  const handleDelete = useCallback(async () => {
    setAnchorEl(null)
    await deleteUserImage()
      .then(() => {
        client.resetStore()
      })
      .catch((e) => {
        userError(e.message)
      })
  }, [data, client, router, deleteUserImage, refetch])

  if (loadingUpload) return <div>Loading...</div>
  let imageEdit
  imageEdit = (
    <div>
      <OtherIcon
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {!loading && data && data.imageUser ? (
          <div>
            <ImageUser src={data.imageUser} />
          </div>
        ) : (
          <ImageEmptyTop>
            <ImageEmpty />
            <ImageP>
              <CameraAltIcon style={{ fontSize: 34 }} />
            </ImageP>
          </ImageEmptyTop>
        )}
      </OtherIcon>
      <StyledMenu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItems
          onClick={handleClose}
          style={{ backgroundColor: 'transparent' }}
        >
          <InputUserImage htmlFor="file_upload">
            UPLOAD
            <input
              type="file"
              id="file_upload"
              onChange={onChangeFile}
              style={{ display: 'none' }}
            />
          </InputUserImage>
          {/* <UploadFile onChange={onChangeFile} /> */}
        </MenuItems>
        <MenuItems
          onClick={handleDelete}
          style={{ backgroundColor: 'transparent' }}
        >
          DELETE
        </MenuItems>
      </StyledMenu>
    </div>
  )

  return <div>{imageEdit}</div>
}
