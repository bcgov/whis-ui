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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import SpeedIcon from '@mui/icons-material/Speed';
import {useSelector} from "../../../state/utilities/use_selector";
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Dialog,
	DialogActions,
	DialogContent,
	Divider,
	FormControlLabel,
	IconButton,
	InputAdornment,
	MenuItem,
	Stack,
	Switch,
	TextField,
	Typography
} from "@mui/material";
import {LocalizationProvider, MobileDatePicker, MobileTimePicker} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

const ActionManagement: React.FC = () => {
	const me = useSelector(state => state.Auth);
	const navigate = useNavigate();

	const [date, setDate] = useState(null);
	const [time, setTime] = useState(null);
	// const [toolTitle, setTitle] = useState(true);

	const receivers = [
		{label: 'Shari', value: 'Shari'},
		{label: 'Cati', value: 'Cati'},
		{label: 'Maeve', value: 'Maeve'},
		{label: 'Sultana', value: 'Sultana'},
	]
	const [checked1, setChecked1] = useState(false);
	const toggleChecked1 = () => {
		setChecked1((prev) => !prev);
	}
	const [checked2, setChecked2] = useState(false);
	const toggleChecked2 = () => {
		setChecked2((prev) => !prev);
	}

	//handle blur
	const [requiredTitle, setRequiredTitle] = useState(false);
	const handleOnblur = (e) => {
		const value = e.target.value;
		if (value == "" || value == undefined || value == null) {
			setRequiredTitle(true);
		} else
			setRequiredTitle(false);
	}

	//submit dialog
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	//date & time
	// const toolbarTitle = toolTitle ? "Select a date" : "Enter a Date";

	return (
		<Box sx={{width: 'inherit'}}>
			<Stack direction='row' spacing={1}>
				<Card sx={{borderRadius: '15px', boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 5px 0px', marginRight: '15px', width: '330px'}}>
					<IconButton
						sx={{
							position: 'absolute',
							left: 70,
							top: 68,
							fontSize: 'large'
						}}
					>
						<SettingsIcon/>
					</IconButton>
					<CardHeader
						title={'Profile'}
						titleTypographyProps={{sx: {paddingTop: '10px', color: '#666666', fontSize: '20px', fontFamily: 'BCSans-Bold'}}}
						sx={{textAlign: 'center', paddingTop: '30px'}}
					/>

					<CardContent className={'profile_card'}>

						<Box className='card_user_icon'>
							<AccountCircleIcon sx={{fontSize: '200px', color: 'rgb(26, 90, 150)'}}/>
						</Box>

						<Box className={'name'}>

							<PersonIcon color={'primary'}/><Typography sx={{fontSize: '16px'}}>{me.bestName}</Typography>

							<Typography className='role'>{me.roles.join(', ')}</Typography>

							<LocalPhoneIcon color={'primary'} sx={{marginBottom: '20px'}}/><Typography sx={{fontSize: '13px'}}>phone_placeholder</Typography>

							<EmailIcon color={'primary'} sx={{marginBottom: '20px'}}/><Typography sx={{fontSize: '13px'}}>{me.email}</Typography>

							<BusinessIcon color={'primary'} sx={{marginBottom: '20px'}}/><Typography sx={{fontSize: '13px'}}>org_placeholder</Typography>
						</Box>

						<Box className={'quick_access'} sx={{marginTop: '2rem'}}>
							<Divider variant='middle' sx={{position: 'relative', top: '-175px'}}/>
							<Divider variant='middle' sx={{marginBottom: '25px'}}/>
							<Typography sx={{marginBottom: '10px', fontSize: '16px'}}>
								Quick Access
							</Typography>
							<Box className={'actions'}>
								<Box className='generateBtn'>
									<IconButton className='generateBtn' onClick={() => navigate('/wildlifeIds/generate')}>
										<AddCircleOutlineIcon color={'primary'}/>
									</IconButton>
									<p>Generate IDs</p>
								</Box>
								<Box className='searchBtn'>
									<IconButton className='searchBtn'>
										<ManageSearchIcon color={'primary'}/>
									</IconButton>
									<p>Search IDs</p>
								</Box>
								<Box className='actionBtn'>
									<IconButton className='actionBtn' onClick={() => navigate('/wildlifeIds')}>
										<SpeedIcon color={'primary'}/>
									</IconButton>
									<p style={{left: '230px'}}>Dashboard</p>
								</Box>
							</Box>
						</Box>
					</CardContent>
				</Card>

				<Card sx={{borderRadius: '15px', boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 5px 0px', width: '850px'}}>
					<CardHeader
						title={'Action & Notification Management'}
						titleTypographyProps={{sx: {paddingTop: '10px', color: '#666666', fontSize: '20px', fontFamily: 'BCSans-Bold'}}}
						subheader={'You may set some actions that you need reminders for them'}
						subheaderTypographyProps={{variant: 'subtitle1', sx: {paddingTop: '15px', color: 'black'}}}
						sx={{padding: '30px 0px 10px 50px'}}
					/>
					<CardContent sx={{paddingLeft: '50px'}}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<Stack spacing={3}>
								<TextField
									sx={{width: '45%'}}
									label='Action Title'
									id='actionTitle'
									name='actionTitle'
									error={requiredTitle}
									onBlur={(e) => {
										handleOnblur(e)
									}}
									required
								/>
								<Box sx={{display: 'flex'}}>
									<MobileDatePicker
										label='Date'
										value={date}
										toolbarTitle='Select a date'
										componentsProps={{
											actionBar: {actions: ["clear", "today"]},
										}}
										closeOnSelect={true}
										onChange={(newValue) => {
											setDate(newValue);
										}}
										renderInput={(params) =>
											<TextField
												sx={{minWidth: '45%', marginRight: '50px'}}
												InputProps={{
													endAdornment: <InputAdornment position='end'><CalendarTodayIcon/></InputAdornment>,
												}}
												placeholder='mm/dd/yyyy'
												{...params}
											/>
										}
									/>
									<MobileTimePicker
										label='Time'
										value={time}
										onChange={(newValue) => {
											setTime(newValue);
										}}
										renderInput={(params) =>
											<TextField
												sx={{width: '45%'}}
												InputProps={{
													endAdornment: <InputAdornment position='end'><CalendarTodayIcon/></InputAdornment>,
												}}
												placeholder='hh:mm (a|p)m'
												{...params}
											/>}
									/>
								</Box>
								<TextField
									sx={{width: '45%'}}
									id='receiver'
									name='receiver'
									select
									label='Receiver (Optional)'
									placeholder='Receiver (Optional)'
								>
									{receivers.map((m, i) => (
										<MenuItem key={i} value={m.value}>
											{m.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									sx={{width: '97%'}}
									id='note'
									name='note'
									label='Note (Optional)'
									multiline
									rows={3}
									// onChange={handleUpdate}
								/>
								<Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'rgb(140, 140, 140)'}}>
									<Typography variant='subtitle1' sx={{marginRight: '15%'}}>Notification Method (s)</Typography>
									<FormControlLabel control={<Switch onChange={toggleChecked1}/>} label='Dashboard' sx={{marginRight: '8%', color: checked1 ? '#313132' : ''}}/>
									<FormControlLabel control={<Switch onChange={toggleChecked2}/>} label='Email' sx={{color: checked2 ? '#313132' : ''}}/>
								</Box>
							</Stack>
							<Button
								variant='contained'
								sx={{textTransform: 'capitalize', margin: '40px 20px 20px 0px', float: 'right'}}
								onClick={handleClickOpen}
							>
								Set Reminder
							</Button>
						</LocalizationProvider>

					</CardContent>

				</Card>
			</Stack>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					sx: {overflowY: 'inherit', width: '504px', height: '230px', borderRadius: '10px'}
				}}
			>
				<Box className='checkIcon'><CheckIcon sx={{position: 'relative', top: '17px', left: '17px', fontSize: '45px', color: '#EEF2F6',}}/></Box>
				<IconButton
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8
					}}
				>
					<CloseIcon/>
				</IconButton>
				<DialogContent sx={{margin: 'auto', padding: '0 24px', textAlign: 'center'}}>
					<p style={{color: '#666666', fontSize: '16px', margin: '5px 0'}}>You have successfully set a reminder</p>
				</DialogContent>
				<DialogActions sx={{margin: 'auto', marginBottom: '20px'}}>
					<Button className='okBtn' sx={{backgroundColor: '#3ADB76', color: '#EEF2F6', ":hover": {backgroundColor: '#3ADB76'}}}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default ActionManagement;
