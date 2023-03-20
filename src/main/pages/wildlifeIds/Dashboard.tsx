import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import '../../styles/dashboard.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';
import {useSelector} from '../../../state/utilities/use_selector';
import {LockModal} from '../../components/wildlifeIds/generate/LockModal';
import {Box, Button, Card, CardContent, CardHeader, Divider, IconButton, Typography, Link, Stack} from '@mui/material';

const Dashboard: React.FC = () => {
	const me = useSelector(state => state.Auth);
	const navigate = useNavigate();

	const reports = [
		{count: 1859, event: 'IDs Generated', discriminator: 'From last 7 days'},
		{count: 4501, event: 'ID Requests', discriminator: 'From 12 organizations'}
	];

	const actions = [
		{text: '10 recently generated IDs do not have detailed info', link: ''},
		{text: '10 recently generated IDs do not have detailed info', link: ''},
		{text: 'ID generation request from the NLS organization', link: ''},
		{text: '10 recently generated IDs do not have detailed info', link: ''},
		{text: '10 recently generated IDs do not have detailed info', link: ''},
		{text: '10 recently generated IDs do not have detailed info', link: ''}
	];

	const lockStatus = useSelector(state => state.GenerationLock);
	const [lockModalOpen, setLockModalOpen] = useState(false);

	const handleClose = () => {
		setLockModalOpen(false);
	};

	useEffect(() => {
		if (lockStatus.initialized && !lockStatus.working && lockStatus.status && lockStatus.status.lockHolder && !lockStatus.status.lockHolder.isSelf) {
			setLockModalOpen(true);
		}
	}, [lockStatus, lockStatus.initialized, lockStatus.working]);

	return (
		<Box className={'dash_grid'}>
			<LockModal open={lockModalOpen} close={handleClose} handleClose={setLockModalOpen}/>
			<Card className="dash_profile">
				<IconButton className="settingIcon">
					<SettingsIcon />
				</IconButton>
				<CardHeader className="profileTitle" title={'Profile'} />

				<CardContent className={'profile_card'}>
					<AccountCircleIcon className="userIcon" />
					<Box className={'userInfo'}>
						<PersonIcon />
						<Typography className="name">{me.bestName}</Typography>

						<Typography className="role">{me.roles.join(', ')}</Typography>

						<LocalPhoneIcon className="phoneIcon" />
						<Typography className="infoText">phone_placeholder</Typography>

						<EmailIcon className="emailIcon" />
						<Typography className="infoText">{me.email}</Typography>

						<BusinessIcon className="businessIcon" />
						<Typography className="infoText">org_placeholder</Typography>
					</Box>

					<Box className={'quick_access'}>
						<Divider variant="middle" className="divider1" />
						<Divider variant="middle" className="divider2" />
						<Typography className="quickAccessText">Quick Access</Typography>
						<Box className={'actions'}>
							<Box className="generateBtn">
								<IconButton
									onClick={() => {
										setLockModalOpen(true);
									}}
								>
									<AddCircleOutlineIcon />
								</IconButton>
								<p>Generate IDs</p>
							</Box>
							<Box className="searchBtn">
								<IconButton onClick={() => navigate('/wildlifeIds/inventory')}>
									<ManageSearchIcon />
								</IconButton>
								<p>Inventory</p>
							</Box>
							<Box className="actionBtn">
								<IconButton onClick={() => navigate('/wildlifeIds/actionManagement')}>
									<NotificationsNoneIcon />
								</IconButton>
								<p>Actions & Notifications</p>
							</Box>
						</Box>
					</Box>
				</CardContent>
			</Card>

			<Card className="dash_welcome">
				<CardHeader title={`Welcome, ${me.bestName}`} subheader={'There are a few actions that you can take listed in the following'} />

				<CardContent>
					<Box className={'welcome_buttons'}>
						<Button
							variant={'contained'}
							onClick={() => {
								navigate('/wildlifeIds/generate');
							}}
						>
							Generate Wildlife Health ID
						</Button>
						<Button variant={'contained'} onClick={() => navigate('/wildlifeIds/inventory')}>
							View WLH ID Inventory
						</Button>
						<Button disabled variant={'contained'}>
							Future Function
						</Button>
					</Box>
				</CardContent>
			</Card>

			<Card className="dash_actions" id="dash_actions">
				<Stack direction="row" spacing={2} className="actionTitle">
					<NotificationsIcon />
					<Link onClick={() => navigate('/wildlifeIds/actionManagement')}>{'Actions'}</Link>
				</Stack>

				<CardContent>
					<table>
						<tbody>
							{actions.map((action, i) => (
								<tr key={`actions-${i}`}>
									<td>{action.text}</td>
									<td>
										<a href={'#'}>View Details</a>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardContent>
			</Card>

			<Card className="dash_reports" id="dash_reports">
				<Stack direction="row" spacing={2} className="reportTitle">
					<FlagIcon />
					<Link>{'Reports'}</Link>
				</Stack>
				<CardContent>
					<table>
						<tbody>
							{reports.map((report, i) => (
								<tr key={`actions-${i}`}>
									<td>{report.count}</td>
									<td>{report.event}</td>
									<td>{report.discriminator}</td>
								</tr>
							))}
						</tbody>
					</table>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Dashboard;
