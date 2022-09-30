import React from 'react';
import {Link} from 'react-router-dom';
import Icon from '@mdi/react';
import {mdiAccountCircle} from '@mdi/js';
import '../../styles/header.scss';
import {keycloakInstance} from '../../../state/sagas/auth';
import GovLogo from '../../styles/assets/images/gov3_bc_logo.png';
import {useSelector} from '../../../state/utilities/use_selector';
import {Button, IconButton} from "@mui/material";
import HelpIcon from '@mui/icons-material/Help';

const Header: React.FC = () => {
	const bestName = useSelector(state => state.Auth.bestName);

	return (
		<header id="header" className={'header'}>
			<div className={'container'}>
				<Link to="/" className={'homeLink'}>
					<img src={GovLogo} alt={'BC Government Logo'} id="logo" />
					Wildlife Health Information System
				</Link>
				<nav className="profile">
					<li>
						<div className={'username'}>
							<Icon path={mdiAccountCircle} title="User Profile" size={1}></Icon>
							<span>{bestName}</span>
						</div>
					</li>
					<li>
						<Button className={'logout'} color="primary" onClick={() => keycloakInstance.logout()}>
							Log out
						</Button>
					</li>
					<li>
						<IconButton className={'help'} color="primary">
							<HelpIcon/>
						</IconButton>
					</li>
				</nav>
			</div>
		</header>
	);
};

export default Header;
