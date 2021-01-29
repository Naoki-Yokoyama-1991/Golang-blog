import styled, { css } from 'styled-components'
import { padding, margin } from 'polished'
import { Box } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

export const Container = styled.div`
  grid-row: 1/3;
  grid-column: 2/3;
  width: 100%;
  overflow: auto;
  height: 100vh;
  ${padding('4rem', '0', '4rem', '0')}
`

export const Main = styled.div`
  ${margin('0', 'auto', '0', 'auto')};
  padding-left: 4rem;
  padding-right: 4rem;
  width: 100%;
  max-width: 65rem;
  font-size: 1.4rem;
`

export const Title = styled.h1`
  font-size: 4rem;
  color: ${({ theme }) => theme.category.title};
  font: 500 4rem Robot, sans-serif;
  ${margin('1rem', '0', '2rem', '0')}
`

export const Text = styled(Typography)`
  font: 500 1.8rem Robot, sans-serif;
  color: ${({ theme }) => theme.category.title};
  line-height: 1.9em;
`

export const Count = styled(Box)`
  color: ${({ theme }) => theme.blog.like};
`

export const LikeNumber = styled.div`
  display: inline;
  font-size: 1.7rem;
  vertical-align: 0.1em;
`
export const Name = styled.p`
  color: ${({ theme }) => theme.category.title};
  display: inline-block;
  font-size: 1.4rem;
  ${margin('0.5rem', '1.5rem', '1.5rem', '0')};
`
export const Edit = styled.div`
  float: right;
  position: relative;
  bottom: 0.6rem;
`

export const CommentTitle = styled.h1`
  text-align: center;
`

export const ImageUser = styled.img`
  object-fit: cover;
  height: 26rem;
  width: 100%;
  margin-bottom:2.5rem;
`
