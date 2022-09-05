import React from 'react';
import { useNavigate } from 'react-router-dom';

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
import { useSelector } from "../../../state/utilities/use_selector";
import { Box, Button, Card, CardContent, CardHeader, Divider, IconButton, Typography, Link, Stack } from "@mui/material";


const Dashboard: React.FC = () => {
	const me = useSelector(state => state.Auth);
	const navigate = useNavigate();

	const reports = [
		{ count: 1859, event: 'IDs Generated', discriminator: 'From last 7 days' },
		{ count: 45, event: 'ID Requests', discriminator: 'From 12 organizations' }
	];

	const actions = [
		{ text: '10 recently generated IDs do not have detailed info', link: '' },
		{ text: '10 recently generated IDs do not have detailed info', link: '' },
		{ text: 'ID generation request from the NLS organization', link: '' },
		{ text: '10 recently generated IDs do not have detailed info', link: '' },
		{ text: '10 recently generated IDs do not have detailed info', link: '' },
		{ text: '10 recently generated IDs do not have detailed info', link: '' }
	];

	return (
		<Box className={'dash_grid'}>
			<Card sx={{ gridArea: 'profile', gridRow: 'span 2', borderRadius: '15px', boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 5px 0px' }}>
				<IconButton
					sx={{
						position: 'absolute',
						left: 70,
						top: 68,
						fontSize: 'large'
					}}
				>
					<SettingsIcon />
				</IconButton>
				<CardHeader
					title={'Profile'}
					titleTypographyProps={{ sx: { paddingTop: '10px', color: '#666666' } }}
					sx={{ textAlign: 'center', paddingTop: '30px' }}
				/>

				<CardContent className={'profile_card'}>

					<Box className='card_user_icon'>
						<AccountCircleIcon color={'primary'} sx={{ fontSize: '140px' }} />
					</Box>

					<Box className={'name'}>

						<PersonIcon color={'primary'} /><Typography>{me.bestName}</Typography>

						<Typography color='textSecondary' sx={{ gridColumn: '2', paddingBottom: '1.5rem' }}>{me.roles.join(', ')}</Typography>

						<LocalPhoneIcon color={'primary'} sx={{ marginBottom: '20px' }} /><Typography variant='subtitle2'>phone_placeholder</Typography>

						<EmailIcon color={'primary'} sx={{ marginBottom: '20px' }} /><Typography variant='subtitle2'>{me.email}</Typography>

						<BusinessIcon color={'primary'} sx={{ marginBottom: '20px' }} /><Typography variant='subtitle2'>org_placeholder</Typography>
					</Box>

					<Box className={'quick_access'} sx={{ marginTop: '2rem' }}>
						<Divider variant="middle" sx={{ position: 'relative', top: '-175px' }} />
						<Divider variant="middle" sx={{ marginBottom: '25px' }} />
						<Typography variant={'h6'} sx={{ marginBottom: '10px' }}>
							Quick Access
						</Typography>
						<Box className={'actions'}>
							<IconButton>
								<AddCircleOutlineIcon color={'primary'} />
							</IconButton>
							<IconButton>
								<ManageSearchIcon color={'primary'} />
							</IconButton>
							<IconButton>
								<NotificationsNoneIcon color={'primary'} />
							</IconButton>
						</Box>
					</Box>
				</CardContent>
			</Card>
			
			<Card sx={{ gridArea: 'welcome', borderRadius: '15px', boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 5px 0px' }}>

				<CardHeader
					title={`Welcome, ${me.bestName}`}
					titleTypographyProps={{ sx: { paddingTop: '10px', color: '#666666' } }}
					subheaderTypographyProps={{ variant: 'subtitle1', sx: { paddingTop: '10px', color: 'black' } }}
					subheader={'Here are a few actions that you can take...'}
					sx={{ padding: '30px 0px 10px 40px' }}
				/>

				<CardContent>
					<Box className={'welcome_buttons'}>
						<Button variant={'contained'}
							onClick={() => navigate('generate')}
						>
							Generate Wildlife Health ID
						</Button>
						<Button variant={'contained'} onClick={() => navigate('list')}>View WLH ID Inventory</Button>
						<Button disabled variant={'contained'}>Future Function</Button>
					</Box>
				</CardContent>
			</Card>

			<Card sx={{ gridArea: 'actions', borderRadius: '15px', boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 5px 0px' }}>
				<Stack direction="row" spacing={2} sx={{ padding: '20px 50px 10px 40px', alignItems: 'center' }}>
					<NotificationsIcon color={'primary'} />
					<Link onClick={() => navigate('actionManagement')} sx={{ cursor: 'pointer', textDecoration: 'none', fontSize:'20px' }}>{'Actions'}</Link>
				</Stack>

				<CardContent sx={{ paddingLeft: '40px' }}>
					<table>
						<tbody>
							{actions.map((action, i) => (
								<tr key={`actions-${i}`}>
									<td>{action.text}</td>
									<td style={{ textAlign: 'right', paddingLeft: '40px' }}><a href={'#'}>View Details</a></td>
								</tr>
							))}
						</tbody>
					</table>
				</CardContent>
			</Card>

			<Card sx={{ gridArea: 'reports', borderRadius: '15px', boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 5px 0px' }}>
				<Stack direction="row" spacing={2} sx={{ padding: '20px 50px 10px 40px', alignItems: 'center' }}>
					<FlagIcon color={'primary'} />
					<Link sx={{ cursor: 'pointer', textDecoration: 'none', fontSize:'20px' }}>{'Reports'}</Link>
				</Stack>
				<CardContent sx={{ paddingLeft: '40px' }}>
					<table>
						<tbody>
							{reports.map((report, i) => (
								<tr key={`actions-${i}`}>
									<td style={{ textAlign: 'right' }}>{report.count}</td>
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
