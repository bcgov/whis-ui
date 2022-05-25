import React from 'react';
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
import {useSelector} from "../../../state/utilities/use_selector";
import {Box, Button, Card, CardContent, CardHeader, Typography} from "@mui/material";


const Dashboard: React.FC = () => {
	const me = useSelector(state => state.Auth);
	const navigate = useNavigate();

	const reports = [
		{count: 1859, event: 'IDs Generated', discriminator: 'From last 7 days'},
		{count: 45, event: 'ID Requests', discriminator: 'From 12 organizations'}
	];

	const actions = [
		{text: '10 recently generated IDs do not have detailed info', link: ''},
		{text: '10 recently generated IDs do not have detailed info', link: ''},
		{text: 'ID generation request from the NLS organization', link: ''},
		{text: '10 recently generated IDs do not have detailed info', link: ''},
		{text: '10 recently generated IDs do not have detailed info', link: ''},
		{text: '10 recently generated IDs do not have detailed info', link: ''}
	];

	return (
		<Box className={'dash_grid'}>
			<Card sx={{gridArea: 'profile', gridRow: 'span 2'}}>
				<CardHeader title={'Profile'} sx={{textAlign: 'center'}}/>

				<CardContent className={'profile_card'}>

					<Box className='card_user_icon'>
						<AccountCircleIcon color={'primary'} sx={{fontSize: '140px'}}/>
					</Box>

					<Box className={'name'}>

						<PersonIcon color={'primary'}/><Typography>{me.bestName}</Typography>

						<Typography color='textSecondary' sx={{gridColumn: '2', paddingBottom: '1.5rem'}}>{me.roles.join(', ')}</Typography>

						<LocalPhoneIcon color={'primary'}/>
						phone_placeholder

						<EmailIcon color={'primary'}/>
						{me.email}

						<BusinessIcon color={'primary'}/>
						org_placeholder
					</Box>

					<Box className={'quick_access'} sx={{marginTop: '2rem'}}>

						<Typography variant={'h6'}>
							Quick Access
						</Typography>
						<Box className={'actions'}>
							<AddCircleOutlineIcon color={'primary'}/>
							<ManageSearchIcon color={'primary'}/>
							<NotificationsNoneIcon color={'primary'}/>
						</Box>
					</Box>
				</CardContent>
			</Card>


			<Card sx={{gridArea: 'welcome',}}>

				<CardHeader title={`Welcome, ${me.bestName}`}
										subheader={'Here are a few actions that you can take...'}/>

				<CardContent>
					<Box className={'welcome_buttons'}>
						<Button variant={'contained'} onClick={() => navigate('generate')}>Generate Wildlife Health ID</Button>
						<Button variant={'contained'} onClick={() => navigate('list')}>View WLH ID Inventory</Button>
						<Button disabled variant={'contained'}>Future Function</Button>
					</Box>
				</CardContent>
			</Card>

			<Card sx={{gridArea: 'actions'}}>
				<CardHeader avatar={<NotificationsIcon color={'primary'}/>} title={'Actions'}/>
				<CardContent>
					<table>
						<tbody>
						{actions.map((action, i) => (
							<tr key={`actions-${i}`}>
								<td>{action.text}</td>
								<td style={{textAlign: 'right'}}><a href={'#'}>View Details</a></td>
							</tr>
						))}
						</tbody>
					</table>
				</CardContent>
			</Card>

			<Card sx={{gridArea: 'reports'}}>
				<CardHeader title={'Reports'} avatar={<FlagIcon color={'primary'}/>}/>
				<CardContent>
					<table>
						<tbody>
						{reports.map((report, i) => (
							<tr key={`actions-${i}`}>
								<td style={{textAlign: 'right'}}>{report.count}</td>
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
