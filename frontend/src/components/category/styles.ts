import styled, { css } from 'styled-components'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { padding, margin } from 'polished'

const ListStyle = css`
  .active {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.title};
    border: 0.2rem solid ${({ theme }) => theme.colors.title};
  }
`

export const Main = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  ${padding('0', '4rem', '0', '4rem')}
`

export const CategoryList = styled.div`
  ${ListStyle}
  white-space: nowrap;
  display: flex;
  flex-direction: row;
`

export const Title = styled.p`
  display: block;
  float: left;
  padding-right: 1rem;
  padding-top: 0.5rem;
`
export const ButtonUI = styled.div`
  color: ${({ theme }) => theme.colors.text};
  border: 0.2rem solid ${({ theme }) => theme.colors.text};
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.8rem 2.2rem 0.8rem 2.2rem;
  margin-bottom: 2.5rem;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.title};
    border: 0.2rem solid ${({ theme }) => theme.colors.title};
  }
`
export const Music = styled.div``
