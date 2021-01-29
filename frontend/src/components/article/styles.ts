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

export const Container = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  .name {
    font-size: 1.4rem;
  }
`

export const Main = styled.div`
  &:hover {
    animation: ${fadeIn} 0.5s ease-in-out;
    opacity: 0.7;
    cursor: pointer;
    box-shadow: 0.2rem 0.2rem 1rem rgba(220, 220, 220, 1);
  }
`

export const Name = styled.p`
  color: ${({ theme }) => theme.category.title};
  display: inline-block;
`

export const Count = styled(Box)`
  float: right;
  color: ${({ theme }) => theme.blog.like};
  .like {
    font-size: 1.6rem;
    margin-left: 0.5rem;
    float: right;
    line-height: 2.5rem;
  }
`

export const BlogImage = styled.img`
  object-fit: cover;
  height: 40%;
  border-radius: 10px;
  width: 100%;
  margin-bottom: 0;
`
export const BlogImagelabel = styled.label`
  margin-right: 2rem;
  &:hover {
    cursor: pointer;
  }
`

export const Primary = styled.div`
  margin-bottom: 1.5rem;
  margin-top: 0.8rem;
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.category.title};
  height: 3.4rem;
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`

export const Text = styled.div`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`
