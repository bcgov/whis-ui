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
					<SettingsIcon className='setting'/>
				</IconButton>
				<CardHeader
					title={'Profile'}
					titleTypographyProps={{ sx: { paddingTop: '10px', color: '#666666', fontSize: '20px', fontFamily: 'BCSans-Bold' } }}
					sx={{ textAlign: 'center', paddingTop: '30px' }}
				/>

				<CardContent className={'profile_card'}>

					<Box className='card_user_icon'>
						<AccountCircleIcon sx={{ fontSize: '200px' }} />
					</Box>

					<Box className={'name'}>

						<PersonIcon /><Typography sx={{ fontSize: '16px' }}>{me.bestName}</Typography>

						<Typography className='role' >{me.roles.join(', ')}</Typography>

						<LocalPhoneIcon sx={{ marginBottom: '20px' }} /><Typography sx={{ fontSize: '13px' }}>phone_placeholder</Typography>

						<EmailIcon sx={{ marginBottom: '20px' }} /><Typography sx={{ fontSize: '13px' }}>{me.email}</Typography>

						<BusinessIcon sx={{ marginBottom: '20px' }} /><Typography sx={{ fontSize: '13px' }}>org_placeholder</Typography>
					</Box>

					<Box className={'quick_access'} sx={{ marginTop: '2rem' }}>
						<Divider variant="middle" sx={{ position: 'relative', top: '-175px' }} />
						<Divider variant="middle" sx={{ marginBottom: '25px' }} />
						<Typography sx={{ marginBottom: '10px', fontSize: '16px' }}>
							Quick Access
						</Typography>
						<Box className={'actions'}>
							<Box className='generateBtn'>
								<IconButton className='generateBtn' onClick={() => navigate('/wildlifeIds/generate')}>
									<AddCircleOutlineIcon />
								</IconButton>
								<p>Generate IDs</p>
							</Box>
							<Box className='searchBtn'>
								<IconButton className='searchBtn'>
									<ManageSearchIcon />
								</IconButton>
								<p>Search IDs</p>
							</Box>
							<Box className='actionBtn'>
								<IconButton className='actionBtn' onClick={() => navigate('actionManagement')} >
									<NotificationsNoneIcon />
								</IconButton>
								<p>Actions & Notifications</p>
							</Box>
						</Box>
					</Box>
				</CardContent>
			</Card>

			<Card sx={{ gridArea: 'welcome', borderRadius: '15px', boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 5px 0px' }}>

				<CardHeader
					title={`Welcome, ${me.bestName}`}
					titleTypographyProps={{ sx: { paddingTop: '10px', color: '#666666', fontSize: '20px', fontFamily: 'BCSans-Bold' } }}
					subheaderTypographyProps={{ variant: 'subtitle1', sx: { paddingTop: '20px', color: '#313132' } }}
					subheader={'There are a few actions that you can take listed in the following'}
					sx={{ padding: '30px 0px 10px 35px' }}
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

			<Card className='action_area' sx={{ gridArea: 'actions', borderRadius: '15px', boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 5px 0px' }}>
				<Stack direction="row" spacing={2} sx={{ padding: '30px 50px 10px 30px', alignItems: 'center' }}>
					<NotificationsIcon sx={{fontSize:'30px'}}/>
					<Link onClick={() => navigate('actionManagement')} sx={{ cursor: 'pointer', textDecoration: 'none', fontSize: '20px', fontFamily: 'BCSans-Bold' }}>{'Actions'}</Link>
				</Stack>

				<CardContent sx={{ paddingLeft: '33px' }}>
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
				<Stack direction="row" spacing={2} sx={{ padding: '30px 50px 10px 30px', alignItems: 'center' }}>
					<FlagIcon sx={{fontSize:'30px'}}/>
					<Link sx={{ cursor: 'pointer', textDecoration: 'none', fontSize: '20px', fontFamily: 'BCSans-Bold' }}>{'Reports'}</Link>
				</Stack>
				<CardContent sx={{ paddingLeft: '33px' }}>
					<table>
						<tbody>
							{reports.map((report, i) => (
								<tr key={`actions-${i}`}>
									<td style={{ textAlign: 'right', color: '#FCBA19' }}>{report.count}</td>
									<td>{report.event}</td>
									<td style={{ fontSize: '12px', color: '#495057' }}>{report.discriminator}</td>
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
