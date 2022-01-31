import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import AuthRequired from './components/auth/AuthRequired';
import Footer from './components/page_elements/Footer';
import Header from './components/page_elements/Header';
import {Provider} from 'react-redux';
import {Route, Routes} from "react-router";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";

const App: React.FC<{ store }> = ({store}) => {

  return (

    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <div className={'appBody'}>
          <AuthRequired>

            <div className={'container'} id={"mainColumnLayout"}>
              <div className={'containerInner'}>
              </div>
              <main>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="" element={<LandingPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>

            </div>
          </AuthRequired>
        </div>

        <Footer />
      </BrowserRouter>
    </Provider>
  )
};

export default App;
