import styled, { keyframes } from 'styled-components'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { padding, margin } from 'polished'
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
  ${padding('4rem')}
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: 11em;
  overflow: auto;
  height: 100vh;
  .name {
    font-size: 1.4rem;
  }
`

export const Main = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 2rem;
  padding: 2rem;
  &:hover {
    animation: ${fadeIn} 0.5s ease-in-out;
    opacity: 0.7;
    cursor: pointer;
    box-shadow: 0.2rem 0.2rem 1rem rgba(220, 220, 220, 1);
  }
`

export const Title = styled.h2`
  color: ${({ theme }) => theme.category.title};
  font-size: 2.2rem;
  font-weight: 500;
  margin-bottom: 1rem;
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
  margin-top: 0.2rem;
  .like {
    font-size: 1.7rem;
    margin-left: 0.5rem;
    float: right;
    line-height: 2rem;
  }
`
