import { GlobalToggle } from '../Layout'
import { ThemeContext } from 'styled-components'
import React, { useContext, Fragment } from 'react'
import { Mood, Toggle } from './styles'
import { Box } from '@material-ui/core'

export const Switch: React.FC = () => {
  const { title } = useContext(ThemeContext)
  const toggle = useContext(GlobalToggle)

  return (
    <Fragment>
      <Mood>
        <Box mr={3} fontWeight={400}>
          {title}
        </Box>
        <Toggle
          onChange={toggle}
          checked={title == 'Dark'}
          offColor={'#d4e4f3'}
          onColor={'#3D8BF2'}
          onHandleColor={'#d4e4f3'}
          offHandleColor={'#3D8BF2'}
          activeBoxShadow={'0 0 10px 2px #d4e4f3'}
          height={14}
          width={46}
          checkedIcon={false}
          uncheckedIcon={false}
          handleDiameter={24}
        />
      </Mood>
    </Fragment>
  )
}
