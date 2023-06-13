import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import '../../styles/dashboard.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CheckIcon from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedIcon from '@mui/icons-material/Speed';
import {useSelector} from '../../../state/utilities/use_selector';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	FormControlLabel,
	Grid,
	IconButton,
	MenuItem,
	Stack,
	Switch,
	TextField,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import {LocalizationProvider, MobileDatePicker, MobileTimePicker} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

const ActionManagement: React.FC = () => {
	const me = useSelector(state => state.Auth);
	const navigate = useNavigate();

	// const theme = useTheme();
	// const isMedium = useMediaQuery(theme.breakpoints.down('md'));

	const receivers = [
		{label: 'Shari', value: 'Shari'},
		{label: 'Cati', value: 'Cati'},
		{label: 'Maeve', value: 'Maeve'},
		{label: 'Sultana', value: 'Sultana'}
	];
	const [checked1, setChecked1] = useState(false);
	const toggleChecked1 = () => {
		setChecked1(prev => !prev);
	};
	const [checked2, setChecked2] = useState(false);
	const toggleChecked2 = () => {
		setChecked2(prev => !prev);
	};

	//handle blur
	const [requiredTitle, setRequiredTitle] = useState(false);
	const handleOnblur = e => {
		const value = e.target.value;
		if (value == '' || value == undefined || value == null) {
			setRequiredTitle(true);
		} else setRequiredTitle(false);
	};

	//submit dialog
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Grid container spacing={2} >
				<Grid item xs={12} md={3}>
					<Card className="actionManagement_profile">
						<IconButton className="settingIcon">
							<SettingsIcon />
						</IconButton>
						<CardHeader title={'Profile'} className="profileTitle" />

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
									<Grid container spacing={1}>
										<Grid item xs={4}>
											<IconButton className="generateBtn" onClick={() => navigate('/wildlifeIds/generate')}>
												<AddCircleOutlineIcon />
											</IconButton>
											<p>Generate IDs</p>
										</Grid>
										<Grid item xs={4}>
											<IconButton className="searchBtn" onClick={() => navigate('/wildlifeIds/inventory')}>
												<ManageSearchIcon />
											</IconButton>
											<p>Inventory</p>
										</Grid>
										<Grid item xs={4}>
											<IconButton className="actionBtn" onClick={() => navigate('/wildlifeIds')}>
												<SpeedIcon />
											</IconButton>
											<p>Dashboard</p>
										</Grid>
									</Grid>
								</Box>
							</Box>
						</CardContent>
					</Card>
				</Grid>
				<Grid item container xs={12} md={9}>
					<Card className="actionManagement_welcome">
						<CardHeader title={'Action & Notification Management'} subheader={'You may set some actions that you need reminders for them'} />
						<CardContent>
							<LocalizationProvider dateAdapter={AdapterDateFns}>
								<Grid item container spacing={4}>
									<Grid item xs={12}>
										<TextField
											className="action_inputs"
											label="Action Title"
											id="actionTitle"
											name="actionTitle"
											error={requiredTitle}
											onBlur={e => {
												handleOnblur(e);
											}}
											required
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											label="Date"
											type="date"
											className="action_inputs date"
											InputLabelProps={{
												shrink: true
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											label="Time"
											type="time"
											className="action_inputs"
											InputLabelProps={{
												shrink: true
											}}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField className="action_inputs" select label="Receiver" placeholder="Receiver" required>
											{receivers.map((m, i) => (
												<MenuItem key={i} value={m.value}>
													{m.label}
												</MenuItem>
											))}
										</TextField>
									</Grid>
									<Grid item xs={12}>
										<TextField className="action_inputs" label="Note (Optional)" multiline rows={3} />
									</Grid>
									<Grid item container direction={'row'} alignItems={'center'} xs={10} className='Notification'>
										<Grid item xs>
											<Typography>Notification Method (s)</Typography>
										</Grid>
										<Grid item xs>
											<FormControlLabel control={<Switch onChange={toggleChecked1} />} label="Dashboard" />
										</Grid>
										<Grid item xs>
											<FormControlLabel control={<Switch onChange={toggleChecked2} />} label="Email" />
										</Grid>
									</Grid>
								</Grid>

								<Button variant="contained" className="reminderBtn" onClick={handleClickOpen}>
									Set Reminder
								</Button>
							</LocalizationProvider>
						</CardContent>
					</Card>
				</Grid>
			</Grid>

			<Dialog className="set_reminder_dialog" open={open} onClose={handleClose}>
				<Box className="icon_container">
					<CheckIcon className="CheckIcon" />
				</Box>
				<DialogTitle>Notification Alert Saved!</DialogTitle>
				<DialogContent>You have successfully set a reminder.</DialogContent>
				<Divider variant="middle" />
				<DialogActions>
					<Button className="closeBtn" variant="contained" onClick={handleClose}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ActionManagement;
