import { useApolloClient } from '@apollo/react-hooks'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import { withAuthSync } from '../../../utils/auth'
import { destroyToken } from '../../../utils/configureClient'
import {
  useDeleteUserMutation,
  useGetProfileQuery
} from '../../generated/types.d'
import {
  Delete,
  ButtonAlert,
  DeleteTitle,
  DeleteText,
  DialogMain,
  Actions
} from './styles'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core'

interface Props {}

export const UserDelete: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false)

  const [errors, setError] = useState<string>()
  const router = useRouter()
  const client = useApolloClient()
  const meQuery = useGetProfileQuery()
  const [deleteMutation] = useDeleteUserMutation({
    onCompleted() {
      meQuery.refetch()
    }
  })

  let messages = 'Users'
  if (!meQuery.data) messages = 'Loading...'
  if (meQuery.error) messages = `Error!${meQuery.error}`

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = useCallback(async () => {
    await deleteMutation()
      .then((res) => {
        if (!res.data) return
        if (Cookies.get('token')) {
          destroyToken()
        }
        client.stop()
        client.cache.reset()
        client.resetStore().then(() => router.push('/'))
      })
      .catch((e) => {
        setError(e.message)
      })
  }, [deleteMutation, router, destroyToken])

  return (
    <>
      <ButtonAlert variant="outlined" onClick={handleClickOpen}>
        Delete
      </ButtonAlert>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogMain>
          <DeleteTitle id="alert-dialog-title">
            {'Are you sure you want to delete it'}
          </DeleteTitle>
          <DialogContent>
            <DeleteText id="alert-dialog-description">
              Once deleted, it cannot be undone. Are you sure?
            </DeleteText>
          </DialogContent>
          <DialogActions>
            <Actions>
              <ButtonAlert
                className={'first'}
                style={{ marginRight: 8 }}
                onClick={handleClose}
              >
                Disagree
              </ButtonAlert>
              <ButtonAlert
                style={{ marginLeft: 8 }}
                onClick={handleDelete}
                autoFocus
              >
                Agree
              </ButtonAlert>
            </Actions>
          </DialogActions>
        </DialogMain>
      </Dialog>
      {errors}
    </>
  )
}

withAuthSync(UserDelete)
