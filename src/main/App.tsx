import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router';
import Dashboard from './pages/wildlifeIds/Dashboard';
import NotFound from './pages/NotFound';
import WildlifeIdRoutes from './routes/wildlifeIds';
import AdminRoutes from "./routes/Admin";
import DefaultLayout from "./layouts/DefaultLayout";
import {createTheme, CssBaseline, ThemeOptions, ThemeProvider} from "@mui/material";

// @ts-ignore
import BCSansWoff2 from './styles/assets/fonts/BCSans/BCSans-Regular.woff2';
// @ts-ignore
import BCSansBoldWoff2 from './styles/assets/fonts/BCSans/BCSans-Bold.woff2';

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
      `,
		},
	},
	typography: {
		fontSize: 16,
		h1: {
			fontSize: '1.6rem',
			fontWeight: 700
		},
		h2: {
			fontSize: '1.5rem',
			fontWeight: 700,
		},
		h3: {
			fontSize: '1.4rem',
			fontWeight: 700
		},
		h4: {
			fontSize: '1.3rem',
			fontWeight: 500
		},
		h5: {
			fontSize: '1.2rem',
			fontWeight: 500
		},
		h6: {
			fontSize: '1.1rem',
			fontWeight: 500
		},
		fontFamily: [
			'BCSans',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(',')
	},
	palette: {
		primary: {
			main: '#003366',
		},
		secondary: {
			main: '#fade81',
		},
		background: {
			default: '#dcdcdc',
		},
	},
};
const theme = createTheme(themeOptions)

const App: React.FC<{ store }> = ({store}) => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline/>
				<BrowserRouter>
					<Routes>
						{WildlifeIdRoutes}
						{AdminRoutes}
						<Route path="/" element={<DefaultLayout><Dashboard/></DefaultLayout>}/>
						<Route path="" element={<DefaultLayout><Dashboard/></DefaultLayout>}/>
						<Route path="*" element={<DefaultLayout><NotFound/></DefaultLayout>}/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
