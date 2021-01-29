import styled, { keyframes } from 'styled-components'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'

// fadeIn
const fadeIn = keyframes`
  from {
    box-shadow: 0.2rem 0.2rem 1rem rgba(220, 220, 220, 0.3);

  }
  to {
    box-shadow: 0.2rem 0.2rem 1rem rgba(220, 220, 220, 1);

  }
`

export const Main = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 2rem;
  padding: 2rem 2rem 1rem 2rem;
  &:hover {
    animation: ${fadeIn} 0.5s ease-in-out;
    opacity: 0.7;
    cursor: pointer;
    box-shadow: 0.2rem 0.2rem 1rem rgba(220, 220, 220, 1);
  }
  .name {
    font-size: 1.4rem;
  }
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.category.title};
  height: 3.4rem;
  font-size: 2.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const Primary = styled.div`
  margin-bottom: 1.5rem;
`

export const Text = styled.div`
  height: 5.5rem;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 1rem;
  line-height: 2.5rem;
`

export const Name = styled.p`
  color: ${({ theme }) => theme.category.title};
  display: inline-block;
`

export const Count = styled(Box)`
  float: right;
  color: ${({ theme }) => theme.blog.like};
  .like {
    font-size: 1.8rem;
    margin-left: 0.5rem;
    float: right;
    line-height: 1.9rem;
    margin-top: 0.3rem;
  }
`
export const Category = styled.p`
  display: inline-block;
  color: ${({ theme }) => theme.category.title};
  margin-bottom: 1rem;
`
export const Delete = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  padding: 0.5rem 0 0.5rem 0;
  &:hover {
    color: #444444;
  }
`

export const ButtonAlert = styled(Button)`
  text-align: center;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;
  font-size: 1.5rem;
  color: #939393;
  font-weight: 400;
  &:hover {
    background-color: transparent;
    color: #444444;
  }
`

export const DeleteTitle = styled.h1`
  font-size: 1.9rem;
  text-align: center;
  color: #444444;
  margin-bottom: 1rem;
  margin-top: 1.8rem;
`
export const DeleteText = styled.p`
  font-size: 1.5rem;
  text-align: center;
  color: #939393;
  line-height: 2.7rem;
`

export const DialogMain = styled.div`
  margin: 1.5rem;
`

export const Actions = styled.div`
  margin: auto;
`

export const ImageUser = styled.img`
  height: 8rem;
  width: 8rem;
  object-fit: cover;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`

export const ImageEmptyTop = styled.div`
  position: relative;
`

export const ImageEmpty = styled.div`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.button};

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
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

export const InputUserImage = styled.label`
  &:hover {
    cursor: pointer;
  }
`

export const BlogImagelabel = styled.label`
  float: left;
  margin-right: 2rem;
  &:hover {
    cursor: pointer;
  }
`

export const BlogImage = styled.img`
  object-fit: cover;
  height: 138px;
  width: 14rem;
`
