import styled, { css } from 'styled-components'
import { padding, margin } from 'polished'

export const Container = styled.div`
  grid-row: 1/3;
  grid-column: 2/3;
  display: flex;
  justify-content: center;
  overflow: auto;
  height: 100vh;
  ${padding('4rem', '0', '0', '0')}
`

export const Tertiary = styled.div`
  display: flex;
  .second {
    ${margin('0', '0', '1.3rem', '1.8rem')}
  }
`

const InputItem = css`
  -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.signup.form} inset;
  border-radius: 1.2rem;
  border: none;
  /* border: 1px solid ${({ theme }) => theme.colors.line}; */
  ${padding('1.8rem')}
  ${margin('0', '0', '2.5rem', '0')}
  outline: none;
  ::placeholder {
    color: ${({ theme }) => theme.colors.line};
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.background};
  }
`

export const InputName = styled.input.attrs((props) => ({
  size: props.size || '50vw'
}))`
  ${InputItem}
  width: ${(props) => props.size};
  margin-right: ${(props) => props.marginRight};
  margin-left: ${(props) => props.marginLeft};
`

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.category.title};
  font-size: 1.2rem;
  ${margin('0', '0', '1.3rem', '1rem')}
`

export const SignUpButtton = styled.button`
  /* border: 1px solid ${({ theme }) => theme.colors.line}; */

  background-color: ${({ theme }) => theme.colors.title};
  width: 50vw;
  border-radius: 1.2rem;
  ${padding('1.5rem', '0', '1.5rem', '0')}
  ${margin('0', '0', '2.5rem', '0')};
  outline: none;
  border: none;
  color: ${({ theme }) => theme.colors.background};
  font-weight: 400;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

export const Title = styled.h1`
  letter-spacing: -0.03rem;
  text-align: center;
  font-size: 4rem;
  font-weight: 500;
  color: ${({ theme }) => theme.category.title};
  ${margin('0', '0', '1.5rem', '0')}
`

const Text = css`
  font-size: 1.6rem;
  font-weight: 500;
  color: ${({ theme }) => theme.category.title};
  ${margin('0', '0', '4rem', '0')}
`
export const TitleSub = styled.div`
  display: flex;
  justify-content: center;
`
export const Sub = styled.p`
  text-align: center;
  ${Text}
`

export const Alert = styled.p`
  text-align: center;
  width: 100%;
  color: ${({ theme }) => theme.blog.like};
  ${margin('0', '0', '1.5rem', '0')}
  ${padding('1rem')};
  font-size: 1.4rem;
  border: 1px solid ${({ theme }) => theme.blog.like};
  border-radius: 1rem;
  &:last-child {
    ${margin('0', '0', '2rem', '0')}
  }
`

export const Success = styled.h3`
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  width: 100%;
  ${margin('0', '0', '1.5rem', '0')}
  ${padding('1rem')};
  border: 1px solid ${({ theme }) => theme.colors.title};
  border-radius: 1rem;
  padding-bottom: 1.2rem;
`
