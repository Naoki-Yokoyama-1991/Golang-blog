import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	html {
		font-size: 62.5%;
		overflow-x: hidden;
	}

	body {
		background: ${(props) => props.theme.colors.background};
		color: ${(props) => props.theme.colors.text};
		font: 400 1.7rem Robot, sans-serif;
	}
`
