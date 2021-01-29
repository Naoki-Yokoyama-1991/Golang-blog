import styled, { keyframes, css } from 'styled-components'
import { Button } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { padding, margin, backgrounds, border } from 'polished'

// fadeIn
const fadeIn = keyframes`
  from {
    box-shadow: 0.2rem 0.2rem 1rem rgba(220, 220, 220, 0.3);

  }
  to {
    box-shadow: 0.2rem 0.2rem 1rem rgba(220, 220, 220, 1);

  }
`

export const ConnectionMain = styled.div`
  overflow: auto;
  height: 100vh;
  padding-top: 4rem;
`

const ListStyle = css`
  .active {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.title};
    border: 0.15rem solid ${({ theme }) => theme.colors.title};
  }
  .number {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    border: 0.15rem solid ${({ theme }) => theme.colors.title};
    background-color: ${({ theme }) => theme.colors.title};
  }
  .right {
    margin-right: 0.8rem;
  }
`
export const Whole = styled.div`
  ${ListStyle}
  ${padding('4rem')}
`

export const Container = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));

  .name {
    font-size: 1.4rem;
  }
`

export const Main = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.line};
  border-radius: 2rem;
  padding: 2rem 2rem 1.5rem 2rem;
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
  height: 3.4rem;
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
  margin-top: 0.2rem;
  .like {
    font-size: 1.7rem;
    margin-left: 0.5rem;
    float: right;
    line-height: 2rem;
  }
`

export const NextButton = styled(Button)`
  color: ${({ theme }) => theme.colors.text};
  border: 0.15rem solid ${({ theme }) => theme.colors.line};
  border-radius: 2rem;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 0.8rem 2.2rem 0.8rem 2.2rem;
  margin-bottom: 2.5rem;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.title};
    border: 0.15rem solid ${({ theme }) => theme.colors.title};
    ${backgrounds('transparent')}
  }
`

export const NextNumber = styled.div`
  color: ${({ theme }) => theme.colors.text};
  border: 0.15rem solid ${({ theme }) => theme.colors.line};
  border-radius: 3rem;
  font-size: 1.5rem;
  font-weight: 500;
  height: 4.5rem;
  width: 4.5rem;
  line-height: 4.2rem;
  text-align: center;
  margin-bottom: 2.5rem;
  margin-right: 1rem;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.title};
    border: 0.15rem solid ${({ theme }) => theme.colors.title};
    ${backgrounds('transparent')}
  }
`

export const Top = styled.div`
  display: flex;
  align-items: flex-end;
`

export const Arrow = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-left: 0.7rem;
`

export const ArrowNone = styled.div`
  display: inline-block;
  margin-left: 0.7rem;
`

export const Page = styled.div`
  margin-left: auto;
  margin-bottom: 2rem;
`
export const PageNumber = styled.p`
  margin-left: 2rem;
  display: inline-block;
  font-size: 1.6rem;
`

export const PageArrow = styled.div`
  display: inline-block;
  margin-bottom: 1.3rem;
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

export const Number = styled.div`
  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.title};
  display: flex;
  font-weight: 500;
  cursor: pointer;
  margin-bottom: 2.5rem;
  padding: 0rem 1.5rem 0rem 0.5rem;
`
export const ArrowIcon = styled.div`
  color: ${({ theme }) => theme.colors.title};
`
export const NumberIcon = styled.div`
  color: ${({ theme }) => theme.colors.title};
  font-size: 2rem;
  line-height: 3.5rem;
  margin-left: 0.5rem;
`
export const Line = styled.div`
  border-left: 0.15rem solid ${({ theme }) => theme.colors.line};
  height: 4.5rem;
  margin-bottom: 2.5rem;
  margin-right: 2.5rem;
  margin-left: 1.5rem;
`
