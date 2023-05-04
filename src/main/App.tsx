import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router';
import Dashboard from './pages/wildlifeIds/Dashboard';
import NotFound from './pages/NotFound';
import WildlifeIdRoutes from './routes/wildlifeIds';
import AdminRoutes from './routes/Admin';
import DefaultLayout from './layouts/DefaultLayout';
import {CssBaseline, ThemeProvider} from '@mui/material';
import appTheme from './themes/appTheme';

const App: React.FC<{store}> = ({store}) => {
	return (
		<Provider store={store}>
			<ThemeProvider theme={appTheme}>
				<CssBaseline />
				<BrowserRouter>
					<Routes>
						{WildlifeIdRoutes}
						{AdminRoutes}
						<Route
							path="/"
							element={
								<DefaultLayout>
									<Dashboard />
								</DefaultLayout>
							}
						/>
						<Route
							path=""
							element={
								<DefaultLayout>
									<Dashboard />
								</DefaultLayout>
							}
						/>
						<Route
							path="*"
							element={
								<DefaultLayout>
									<NotFound />
								</DefaultLayout>
							}
						/>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
