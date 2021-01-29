import styled, { css } from 'styled-components'
import { padding, margin } from 'polished'
import { TextareaAutosize } from '@material-ui/core'

export const Container = styled.div`
  position: relative;
  grid-row: 1/3;
  grid-column: 2/3;
  display: flex;
  justify-content: center;
  overflow: auto;
  height: 100vh;
  ${padding('4rem')} .active {
    background-color: ${({ theme }) => theme.colors.title};
    color: ${({ theme }) => theme.colors.background};
    border: none;
  }
  .passive {
    border: 0.15rem solid ${({ theme }) => theme.colors.line};
    color: ${({ theme }) => theme.colors.text};
  }
`

const InputItem = css`
  -webkit-box-shadow: 0 0 0px 1000px ${({ theme }) => theme.colors.background}
    inset;
  line-height: 3.8rem;
  border: none;
  overflow: hidden;
  resize: none;
  /* border: 1px solid ${({ theme }) => theme.colors.line}; */
  ${padding('1.8rem', '0', '1.8rem', '0')}
  outline: none;
  ::placeholder {
    color: ${({ theme }) => theme.colors.line};
  }
  &:focus {
    background-color: ${({ theme }) => theme.colors.background};
  }
`

export const Title = styled.input.attrs((props) => ({
  size: props.size || '50vw'
}))`
  ${InputItem}
  font-size:4rem;
  font: 500 4rem Robot, sans-serif;
  width: ${(props) => props.size};
  padding-left: ${(props) => props.paddingLeft};
`

export const Textarea = styled(TextareaAutosize)`
  width: 60vw;

  font: 500 1.8rem Robot, sans-serif;
  ${margin('0', '0', '3rem', '0')}
  ${InputItem};
`

export const SignUpButtton = styled.button`
  width: 100%;
  border-radius: 1rem;
  ${padding('1.2rem', '0', '1.2rem', '0')}
  ${margin('1rem', '0', '4rem', '0')};
  font-weight: 400;
  font-size: 1.8rem;
  background-color: ${({ theme }) => theme.colors.background};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

//////////////////////////////////////

const ListStyle = css`
  .one {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.title};
    border: 0.15rem solid ${({ theme }) => theme.colors.title};
  }
`

export const Main = styled.div`
  grid-row: 2/3;
  grid-column: 2/3;
  overflow: auto;
  height: 100vh;
  ${padding('0', '4rem', '0', '4rem')}
`

export const CategoryList = styled.div`
  ${ListStyle}
  white-space: nowrap;
  display: flex;
  flex-direction: row;
`

export const TitleCategory = styled.p`
  float: left;
  padding-right: 1rem;
  padding-top: 0.6rem;
`
export const ButtonUI = styled.div`
  color: ${({ theme }) => theme.colors.text};
  border: 0.15rem solid ${({ theme }) => theme.colors.line};
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.8rem 2.2rem 0.8rem 2.2rem;
  margin-bottom: 2.5rem;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.title};
    border: 0.15rem solid ${({ theme }) => theme.colors.title};
  }
`
export const ImageEmptyTop = styled.div`
  position: relative;
`

export const ImageEmpty = styled.div`
  object-fit: cover;
  height: 26rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.button};
`

export const ImageP = styled.div`
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  position: absolute;
  &:hover {
    cursor: pointer;
  }
`
export const ImageUser = styled.img`
  object-fit: cover;
  height: 26rem;
  width: 100%;
`
export const InputUserImage = styled.label`
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

export const InputPosition = styled.div`
  top: 17rem;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  margin: 0;
  padding: 0;
  position: absolute;
`
