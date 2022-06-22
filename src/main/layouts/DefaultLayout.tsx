import React, {ReactElement} from 'react';
import Header from "../components/pageElements/Header";
import Navigation from "../components/pageElements/Navigation";
import AuthRequired from "../components/auth/AuthRequired";
import Footer from "../components/pageElements/Footer";
import FlashMessages from "../components/pageElements/FlashMessages";

interface DefaultLayoutProps {
	children: ReactElement | ReactElement[],
	showNavigation?: boolean
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({children, showNavigation = true}) => {
	return (
		<>
			<Header/>
			<div className={'appBody'}>
				<AuthRequired>
					{showNavigation && <Navigation/>}
					<FlashMessages/>
					<div className={'containerInner'}>
						<div className={'container'} id={'mainColumnLayout'}>
							<main>
								{children}
							</main>
						</div>
					</div>
				</AuthRequired>
			</div>
			<Footer/>
		</>
	)
};

export default DefaultLayout;
