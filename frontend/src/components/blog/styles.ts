import styled from 'styled-components'
import { Button, DialogTitle, Dialog } from '@material-ui/core'

export const ButtonAlert = styled(Button)`
  text-align: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  font-size: 1.5rem;
  color: #939393;
  font-weight: 400;
  margin-bottom: 0.5rem;
  &:hover {
    background-color: transparent;
    color: #444444;
  }
`

export const Title = styled.h1`
  font-size: 1.9rem;
  text-align: center;
  color: #444444;
  margin-bottom: 1rem;
  margin-top: 1.8rem;
`
export const Text = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: #939393;
  line-height: 2.7rem;
`

export const DialogMain = styled.div`
  margin: 1.5rem;
`

export const Actions = styled.div`
  margin: auto;
`
