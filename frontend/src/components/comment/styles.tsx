import styled, { css, ThemeConsumer } from 'styled-components'
import { padding, margin, border, backgrounds, rgb } from 'polished'
import Typography from '@material-ui/core/Typography'
import { TextareaAutosize } from '@material-ui/core'

export const Container = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  ${margin('3rem', '0', '0', '0')}
`
export const Main = styled.div`
  ${margin('0', 'auto', '0', 'auto')};
  padding-left: 4rem;
  padding-right: 4rem;
  width: 100%;
  max-width: 65rem;
  .active {
    background-color: ${({ theme }) => theme.colors.title};
    color: ${({ theme }) => theme.colors.background};
    border: none;
  }
  .passive {
    border: 0.15rem solid ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.text};
  }
`

export const CommentTitle = styled.h3`
  ${margin('3rem', '0', '2.2rem', '0')};
  font-size: 1.8rem;
  font-weight: 500;
`

export const Name = styled.p`
  display: inline-block;
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme }) => theme.category.title};
`
export const Time = styled.p`
  color: ${({ theme }) => theme.colors.text};
  margin-top: 0.3rem;
  font-size: 1.3rem;
`
export const CommentText = styled(Typography)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.category.title};
  ${margin('1rem', '0', '3rem', '0')}
`
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

// DeleteComment

export const Delete = styled.div`
  float: right;
  position: relative;
  bottom: 3.5rem;
`

// CreateComment

const InputItem = css`
  -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.background}
    inset;
  border: none;
  overflow: hidden;
  resize: none;
  /* border: 1px solid ${({ theme }) => theme.colors.line}; */
  ${padding('1.8rem', '0', '1.8rem', '0')}
  ${border('top', '1px', 'solid', '#cccccc')}
  outline: none;
  ::placeholder {
    color: ${({ theme }) => theme.colors.line};
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.background};
  }
`

export const Textarea = styled(TextareaAutosize)`
  font: 500 1.6rem Robot, sans-serif;
  width: 100%;
  max-width: 65rem;
  ${InputItem};
`
export const CommentButtton = styled.button`
  /* position: absolute;
  top: 4rem;
  right: 4rem; */
  width: 8rem;
  outline: 0;
  border-radius: 1rem;
  ${padding('1rem', '0', '1rem', '0')}
  font-weight: 400;
  font-size: 1.6rem;
  background-color: ${({ theme }) => theme.colors.background};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`
