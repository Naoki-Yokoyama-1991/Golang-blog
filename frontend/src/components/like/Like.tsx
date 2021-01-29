import { useApolloClient } from '@apollo/react-hooks'
import Link from 'next/Link'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'
import {
  useCreateLikeMutation,
  useGetBlogQuery,
  useDeleteLikeMutation,
  useGetProfileQuery
} from '../../generated/types.d'
import { Like } from '../../lib/types/Like'
import { LikeNumber, LikeButton } from './styles'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import FavoriteIcon from '@material-ui/icons/Favorite'
import Menu, { MenuProps } from '@material-ui/core/Menu'
import { IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'

const MenuItems = withStyles({
  root: {
    fontSize: '1.5rem',
    color: '#eb4060',
    padding: '0.2rem 2rem 0.2rem 2rem',
    '&:hover': {}
  }
})(MenuItem)

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #eb4060',
    borderRadius: '1rem'
  }
})((props: MenuProps) => (
  <Menu
    elevation={7}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left'
    }}
    {...props}
  />
))
interface Props {
  likes
  likeCount: number
  refetch: () => void
}

interface LikeMutation {
  like: Like
}

export const LikeCreate: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const getProfile = useGetProfileQuery()

  const [errors, setError] = useState<string>()
  const [errComment, setErrComment] = useState<string>('')
  const router = useRouter()
  const client = useApolloClient()
  const [liked, setLiked] = useState<boolean>(false)

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    errName: string
  ) => {
    setErrComment(errName)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [createMutation] = useCreateLikeMutation()
  const [deleteMutation] = useDeleteLikeMutation()

  // like Count state change
  useEffect(() => {
    if (!getProfile.loading && getProfile.data) {
      if (
        props.likes.find(
          (like) => like.user.id === getProfile.data.userProfile.id
        )
      ) {
        setLiked(true)
      } else setLiked(false)
    }
  }, [props.likeCount])

  let blogId: any = router.query.id
  const blogQuery = useGetBlogQuery({
    variables: {
      blogID: blogId
    }
  })

  const handleLike = useCallback(async () => {
    setError(undefined)
    if (getProfile.loading && !getProfile.data.userProfile) return
    !liked
      ? createMutation({
          variables: {
            blogID: blogId
          }
        })
          .then((res) => {
            client.resetStore().then(() => setLiked(true))
          })
          .catch((e) => {
            console.error(e)
            setError(e.message)
          })
      : deleteMutation({
          variables: {
            blogID: blogId
          }
        })
          .then((res) => {
            client.resetStore().then(() => setLiked(false))
          })
          .catch((e) => {
            console.error(e)
            setError(e.message)
          })
  }, [createMutation, deleteMutation, liked, getProfile.data])

  let likeButton
  // not login user
  if (getProfile.data == undefined) {
    likeButton = (
      <LikeButton
        aria-controls="error"
        aria-haspopup="true"
        onClick={(e) => handleClick(e, 'Please SignUp or SignIn.')}
      >
        <FavoriteBorderIcon style={{ fontSize: 18, marginRight: 6 }} />
      </LikeButton>
    )
  } else {
    likeButton =
      // not owner user
      !blogQuery.loading &&
      blogQuery.data.blog.user.id === getProfile.data.userProfile.id ? (
        <LikeButton
          onClick={(e) => handleClick(e, 'The owner cannot press the button.')}
        >
          <FavoriteBorderIcon style={{ fontSize: 18, marginRight: 6 }} />
        </LikeButton>
      ) : !getProfile.loading && getProfile.data.userProfile ? (
        liked ? (
          <LikeButton onClick={handleLike}>
            <FavoriteIcon style={{ fontSize: 18, marginRight: 6 }} />
          </LikeButton>
        ) : (
          <LikeButton onClick={handleLike}>
            <FavoriteBorderIcon style={{ fontSize: 18, marginRight: 6 }} />
          </LikeButton>
        )
      ) : (
        <Link href="/login">login</Link>
      )
  }

  return (
    <div>
      {likeButton}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItems
          onClick={handleClose}
          style={{ backgroundColor: 'transparent' }}
        >
          {errComment}
          <IconButton
            size="small"
            aria-label="close"
            onClick={handleClose}
            style={{
              backgroundColor: 'transparent'
            }}
          >
            <Close
              className={'close'}
              style={{
                fontSize: 18,
                marginLeft: 8,
                color: '#eb4060'
              }}
            />
          </IconButton>
        </MenuItems>
      </StyledMenu>
      <LikeNumber>{props.likeCount}</LikeNumber>
    </div>
  )
}
