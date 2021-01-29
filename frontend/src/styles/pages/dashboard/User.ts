import styled, { css } from 'styled-components'
import { padding, margin, border, backgrounds } from 'polished'

export const ContainerTop = styled.div`
  grid-row: 1/2;
  grid-column: 2/3;
  overflow: auto;
  ${padding('0', '4rem', '0', '4rem')}
  display: flex;
  align-items: center;
  margin: 0 0 0 auto;
`

export const Containerbottom = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  overflow: auto;
  height: 100vh;
  ${padding('0', '4rem', '0', '4rem')}
`

export const Grid = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
`
export const Name = styled.p`
  display: table-cell;
  font-size: 1.7rem;
  font-weight: 500;
  color: ${({ theme }) => theme.category.title};
  ${margin('0', '0.7rem', '0rem', '0')}
`

export const Login = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.signup.form};
  ${padding('0.5rem', '1rem', '0.5rem', '2rem')}
  border-radius: 2rem;
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
