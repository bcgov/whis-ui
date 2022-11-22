import React, {useEffect, useState} from 'react';
import '../../styles/nav.scss';
import {Link} from 'react-router-dom';
import {useSelector} from '../../../state/utilities/use_selector';
import {userHasAnyRole} from '../../../state/utilities/authentication_helper';
import {nav} from '../../../state/utilities/nav';
import {useLocation} from 'react-router';

const Navigation: React.FC = () => {
	const location = useLocation();

	const currentUserRoles = useSelector(state => state.Auth.roles);

	const navs = [
		nav('/wildlifeIds', 'My Dashboard', ['BIOLOGIST'], 'Wildlife ID'),
		nav('/wildlifeIds/generate', 'WLH ID Generation', ['BIOLOGIST'], 'Wildlife ID'),
		nav('/wildlifeIds/list', 'WLH ID Inventory', ['BIOLOGIST'], 'Wildlife ID'),
		nav('/admin', 'Admin Dashboard', ['ADMIN'], 'Admin'),
	];

	useEffect(() => {
		setActiveLink(location.pathname);
	}, [location.pathname]);

	const sortedNavs = navs.sort((a, b) => {
		if (a.category > b.category) {
			return 1;
		} else if (b.category > a.category) {
			return -1;
		}
		return 0;
	});

	const [activeLink, setActiveLink] = useState(null);

	const categoriesSeen = [];
	sortedNavs.forEach(n => {
		if (!categoriesSeen.includes(n.category)) {
			categoriesSeen.push(n.category);
		}
	});

	return (
		<div className={'topNavOuter'}>
			<nav className={'topNav container'}>
				<ul>
					{categoriesSeen.map(c => (
						<>

							{sortedNavs
								.filter(n => n.category === c)
								.map((n, i) => {
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

						</>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default Navigation;
