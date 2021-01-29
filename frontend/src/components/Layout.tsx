import React, { createContext } from 'react'
import {
  ThemeProvider as StyledThemeProvider,
  DefaultTheme
} from 'styled-components'
import {
  ThemeProvider as MaterialUIThemeProvider,
  StylesProvider
} from '@material-ui/styles'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalStyle from '../styles/global'
import materialTheme from '../styles/materialTheme'
import light from '../styles/themes/light'
import dark from '../styles/themes/dark'
import usePeristedState from '../../utils/usePersistedState'
import { useState, useEffect } from 'react'
import useDarkMode from 'use-dark-mode'

export const GlobalToggle = createContext(null)

function Layout({ children, home }) {
  console.log(home)
  const [theme, setTheme] = usePeristedState<DefaultTheme>('theme', light)
  const darkMode = useDarkMode(false, {
    storageKey: null,
    onChange: null
  })
  const themes = darkMode.value ? dark : light
  const toggle = () => {
    setTheme(theme.title === 'Light' ? dark : light)
  }

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    setMounted(true)
  }, [])

  const body = (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={materialTheme}>
        <MaterialUIThemeProvider theme={materialTheme}>
          <StyledThemeProvider theme={theme}>
            <GlobalStyle />
            <CssBaseline />
            <GlobalToggle.Provider value={toggle}>
              {mounted && children}
            </GlobalToggle.Provider>
          </StyledThemeProvider>
        </MaterialUIThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )

  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{body}</div>
  }

  return body
}

export default Layout
