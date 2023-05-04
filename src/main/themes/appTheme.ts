import {ThemeOptions, createTheme} from '@mui/material/styles';

// @ts-ignore
import BCSansWoff2 from '../styles/assets/fonts/BCSans/BCSans-Regular.woff2';
// @ts-ignore
import BCSansBoldWoff2 from '../styles/assets/fonts/BCSans/BCSans-Bold.woff2';

export const themeOptions: ThemeOptions = {
	components: {
		MuiCssBaseline: {
			styleOverrides: `
            @font-face {
              font-family: 'BCSans';
              font-style: normal;
              font-display: swap;
              font-weight: 400;
              src: local('BCSans'), local('BCSans-Regular'), url(${BCSansWoff2}) format('woff2');
            }
    				@font-face {
              font-family: 'BCSans';
              font-style: bold;
              font-display: swap;
              font-weight: 700;
              src: local('BCSans'), local('BCSans-Bold'), url(${BCSansBoldWoff2}) format('woff2');
            }
          `
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
					borderRadius: '5px',
					fontSize: '0.9rem',
					fontWeight: '400'
				}
			}
		}
	},
	typography: {
		fontSize: 14,
		h1: {
			fontSize: '2rem',
			fontWeight: 700
		},
		h2: {
			fontSize: '1.5rem',
			fontWeight: 700
		},
		h3: {
			fontSize: '1.125rem',
			fontWeight: 700
		},
		h4: {
			fontSize: '1.3rem',
			fontWeight: 400
		},
		h5: {
			fontSize: '1.2rem',
			fontWeight: 400
		},
		h6: {
			fontSize: '1rem',
			fontWeight: 400
		},
		fontFamily: ['BCSans', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(',')
	},
	palette: {
		primary: {
			main: '#003366'
		},
		secondary: {
			main: '#fade81'
		},
		background: {
			default: '#dcdcdc'
		},
		text: {
			primary: '#313132'
		}
	}
};
const appTheme = createTheme(themeOptions);

export default appTheme;
