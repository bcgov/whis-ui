import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router';
import Dashboard from './pages/wildlifeIds/Dashboard';
import NotFound from './pages/NotFound';
import WildlifeIdRoutes from './routes/wildlifeIds';
import AdminRoutes from "./routes/Admin";
import DefaultLayout from "./layouts/DefaultLayout";
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material";

export const themeOptions: ThemeOptions = {
	typography: {
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
