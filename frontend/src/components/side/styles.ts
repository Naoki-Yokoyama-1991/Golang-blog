import styled, { css, keyframes } from 'styled-components'
import Switch from 'react-switch'
import { List } from '@material-ui/core'

// fadeIn
const fadeIn = keyframes`
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
`

export const ContainerTop = styled.div`
  /* box-shadow: 0.1rem 0.1rem 1rem rgba(220, 220, 220, 0.8); */
  grid-row: 1/2;
  grid-column: 1/2;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  border-right: 1px solid ${({ theme }) => theme.colors.line};
  height: 100vh;
`
export const ContainerBottom = styled.div`
  /* box-shadow: 0.1rem 0.1rem 1rem rgba(220, 220, 220, 0.8); */
  grid-row: 2/3;
  grid-column: 1/2;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid ${({ theme }) => theme.colors.line};
  border-right: 1px solid ${({ theme }) => theme.colors.line};
`

export const Toggle = styled(Switch)``

export const Mood = styled.div`
  position: absolute;
  bottom: 4rem;
  display: flex;
  align-items: center;
`
export const LogoBox = styled.div`
  margin-top: 3.8rem;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Logo = styled.h1`
  font-weight: 700;
  font-size: 2.5rem;
  margin-left: 0.2rem;
  color: ${({ theme }) => theme.colors.title};
`
const ListStyle = css`
  margin-top: 1.5rem;
  list-style: none;
  font-weight: 500;
  .active {
    background-color: ${({ theme }) => theme.colors.secundary};
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.title};
  }
  .createItem {
    justify-content: center;
  }
`

export const Nav = styled(List)`
  ${ListStyle}
`

export const ListItem = styled.div`
  display: flex;
  align-items: center;
`

export const BackHover = styled.div`
  padding: 0.5rem 2rem;

  color: ${({ theme }) => theme.colors.SideMenu};
  &:hover {
    animation: ${fadeIn} 0.5s ease-in-out;
    cursor: pointer;
    border-radius: 2rem;
    color: ${({ theme }) => theme.colors.title};
  }
`

export const Create = styled.div`
  padding: 0.6rem 1.5rem 0.8rem 1.5rem;
  margin-top: 0.8rem;
  border-radius: 1.5rem;

  background-color: ${({ theme }) => theme.colors.title};
  color: ${({ theme }) => theme.signup.form};
  /* box-shadow: 0.3rem 0.3rem 0.6rem rgba(200, 200, 200, 1); */

  &:hover {
    cursor: pointer;
    background-color: rgba(61, 139, 242, 0.8);
  }
`

export const Menu = styled.li`
  font-size: 1.7rem;
`

export const CreateMenu = styled.h3`
  font-weight: 800;
  font-size: 1.7rem;
`
