import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AuthRequired from './components/auth/AuthRequired';
import Footer from './components/pageElements/Footer';
import Header from './components/pageElements/Header';
import {Provider} from 'react-redux';
import {Route, Routes} from 'react-router';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Navigation from './components/pageElements/Navigation';
import WildlifeIdRoutes from './routes/wildlifeIds';

const App: React.FC<{store}> = ({store}) => {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<Header />
				<div className={'appBody'}>
					<AuthRequired>
						<div className={'containerInner'}>
							<Navigation />
							<div className={'container'} id={'mainColumnLayout'}>
								<main>
									<Routes>
										{WildlifeIdRoutes}
										<Route path="/" element={<LandingPage />} />
										<Route path="" element={<LandingPage />} />
										<Route path="*" element={<NotFound />} />
									</Routes>
								</main>
							</div>
						</div>
					</AuthRequired>
				</div>

				<Footer />
			</BrowserRouter>
		</Provider>
	);
};

export default App;
