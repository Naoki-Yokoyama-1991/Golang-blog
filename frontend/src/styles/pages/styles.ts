import styled from 'styled-components'
import { Button } from '@material-ui/core'

export const Container = styled.div`
  display: grid;
  grid-template-rows: 120px 1fr;
  grid-template-columns: 220px 1fr;
`

export const ButtonUI = styled(Button)`
  background-color: ${(theme) => theme.theme.colors.text};
  border-radius: 5px;
`
