import Switch from 'react-switch'
import styled from 'styled-components'
import { padding, margin } from 'polished'

export const Toggle = styled(Switch)``

export const Mood = styled.div`
  ${margin('1rem', '3rem', '0rem', 'auto')}
  display: flex;
  align-items: center;
  position: absolute;
  right: 4rem;
`
