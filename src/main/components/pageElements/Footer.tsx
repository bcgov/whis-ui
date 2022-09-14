import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {userHasAnyRole} from '../../../state/utilities/authentication_helper';

import '../../styles/nav.scss';
import '../../styles/footer.scss';
import {useLocation} from 'react-router';
import {useSelector} from '../../../state/utilities/use_selector';

const Footer: React.FC = () => {
	const location = useLocation();
	const currentUserRoles = useSelector(state => state.Auth.roles);

	const nav = (path, name, roles) => ({
		path,
		name,
		roles
	});

	const navs = [
		nav('/', 'Home', []),
		nav('/', 'Disclaimer', []),
		nav('/', 'Privacy', []),
		nav('/', 'Accessibility', []),
		nav('/', 'Copyright', []),
	];

	const [activeLink, setActiveLink] = useState(null);

	useEffect(() => {
		setActiveLink(location.pathname);
	}, [location.pathname]);

	return (
		<footer id="footer">
			<nav>
				<ul className={'container'}>
					{navs.map((n, i) => {
						if (n.roles.length === 0 || (n.roles.length > 0 && userHasAnyRole(currentUserRoles, n.roles))) {
							return (
								<li key={i}>
									<Link to={n.path} className={activeLink === n.path ? 'active' : ''}>
										{n.name}
									</Link>
								</li>
							);
						} else {
							return null;
						}
					})}
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
