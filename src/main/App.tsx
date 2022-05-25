import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AuthRequired from './components/auth/AuthRequired';
import Footer from './components/pageElements/Footer';
import Header from './components/pageElements/Header';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import WildlifeIdRoutes from './routes/wildlifeIds';
import AdminRoutes from "./routes/Admin";
import DefaultLayout from "./layouts/DefaultLayout";
import {createTheme, ThemeOptions, ThemeProvider} from "@mui/material";

export const themeOptions: ThemeOptions = {
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
						<Route path="/" element={<DefaultLayout><LandingPage/></DefaultLayout>}/>
						<Route path="" element={<DefaultLayout><LandingPage/></DefaultLayout>}/>
						<Route path="*" element={<DefaultLayout><NotFound/></DefaultLayout>}/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
