import { colors } from '@material-ui/core'
import styled from 'styled-components'
import { border, backgrounds, rgb } from 'polished'

export const OtherIcon = styled.button`
  ${border('0')}
  ${backgrounds('transparent')}
  outline: none;
  color: ${({ theme }) => theme.colors.line};
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.category.title};
  }
  .mouse {
    &:hover {
      cursor: pointer;
    }
  }
`
