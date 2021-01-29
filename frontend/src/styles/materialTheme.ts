import { backgrounds } from 'polished'
import { createMuiTheme } from '@material-ui/core'
import { normalize } from 'path'
const materialTheme = createMuiTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
})
export default materialTheme
