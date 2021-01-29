import styled, { css } from 'styled-components'
import { padding, margin } from 'polished'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import MenuItem from '@material-ui/core/MenuItem'

export const LikeNumber = styled.p`
  display: inline;
  font-size: 1.8rem;
  vertical-align: 0.1em;
  color: ${({ theme }) => theme.blog.like};
  ${padding('0', '0', '0', '0')}
`

export const LikeButton = styled.button`
  color: ${({ theme }) => theme.blog.like};
  border: none; /* 枠線を消す */
  outline: none; /* クリックしたときに表示される枠線を消す */
  background: transparent; /* 背景の灰色を消す */
  cursor: pointer;
`

export const OwnerButton = styled.p`
  color: ${({ theme }) => theme.colors.line};
  .noHeart {
    color: ${({ theme }) => theme.colors.line};
  }
`

export const ErrorItem = styled(MenuItem)`
  color: ${({ theme }) => theme.blog.like};
  font-size: 1.5rem;
  padding: 0.2rem 2rem 0.2rem 2rem;
  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
  }
  .errorIcon {
    color: ${({ theme }) => theme.colors.secundary};
  }
  .close {
    height: 20px;
    background-color: 'transparent';
    &:hover {
      background-color: '#fff';
    }
  }
`
