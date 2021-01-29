import styled, { css } from 'styled-components'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { padding, margin } from 'polished'

const SearchItem = css`
  -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.signup.form} inset;
  border-radius: 3rem;
  border: none;
  width: 330px;
  height: 4.6rem;
  /* border: 1px solid ${({ theme }) => theme.colors.line}; */
  outline: none;
  ::placeholder {
    color: ${({ theme }) => theme.colors.line};
  }
`

export const SearchTitle = styled.input`
  padding-left: 2.7rem;
  padding-right: 2.7rem;
  ${SearchItem}
  box-sizing: border-box;
  ::placeholder {
    color: ${({ theme }) => theme.colors.line};
    font-size: 1.6rem;
  }
`

export const Main = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;
  ${padding('0', '4rem', '0', '4rem')}
  display:flex;
  align-items: center;
  .search_container {
    box-sizing: border-box;
    position: relative;
  }

  .search_icon {
    background-color: transparent;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.line};
    position: absolute;
    left: 28rem;
    bottom: 0.6rem;
    border: none;
    outline: none;
  }
`

export const Title = styled.p`
  float: left;
  padding-right: 1rem;
  padding-top: 0.7rem;
`

export const Music = styled.div``
