import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string
    colors: {
      primary: string
      secundary: string
      background: string
      title: string
      text: string
      button: string
      line: string
      SideMenu: string
    }
    category: {
      title: string
    }
    blog: {
      like: string
    }
    signup: {
      form: string
    }
  }
}
