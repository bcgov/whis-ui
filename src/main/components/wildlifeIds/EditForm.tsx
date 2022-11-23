import React, {useEffect, useState} from 'react';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	IconButton,
	InputAdornment,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
	Switch,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography
} from "@mui/material";
import '../../styles/updateID.scss';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {useSelector} from "../../../state/utilities/use_selector";
import {selectCodeTables} from "../../../state/reducers/code_tables";
import StatusForm from './StatusForm';
import IdentifierEntry from './IdentifierEntry';
import LocationEntry from './LocationEntry';
import Expandable, {ExpansionOverrideEvent} from "../pageElements/Expandable";


const EditForm = ({wildlifeId}) => {

	const [validPurposes, setValidPurposes] = useState([]);
	const [validSex, setValidSex] = useState([]);
	const [validAgeClass, setValidAgeClass] = useState([]);
	const [validSingleIdStatus, setValidSingleIdStatus] = useState([]);
	const [validOrganization, setValidOrganization] = useState([]);

	//@todo codetable this
	const validRole = [
		{value: 'HUNTER', label: 'Hunter'},
		{value: 'TRAPPER', label: 'Trapper'},
		{value: 'CONSERVATION_OFFICER', label: 'Conservation Officer'},
		{value: 'WILDLIFE_BIOLOGIST', label: 'Wildlife Biologist'},
		{value: 'PUBLIC', label: 'Public'},
		{value: 'OTHER', label: 'Other'}
	];

	function codeToSelect(table: string): { label: string, value: string }[] {
		return tables[table].codes.map(c => ({
			value: c.value,
			label: c.displayed_value
		}));
	}

	const {tables, initialized: codeTablesInitialized} = useSelector(selectCodeTables);
	useEffect(() => {
		if (!codeTablesInitialized) {
			return;
		}
		setValidAgeClass(codeToSelect('animal_age'));
		setValidSex(codeToSelect('animal_gender'))
		setValidPurposes(codeToSelect('wlh_id_purpose'));
		setValidOrganization(codeToSelect('organizations'));
		setValidSingleIdStatus(codeToSelect('status'));

	}, [tables, codeTablesInitialized]);

	const [formState, setFormState] = useState({
		quantity: 1,
		year: '2022',
		purpose: 'UNKNOWN',
		species: '',
		identifier: '+ Add Identifier Types',
		other_identifier: '',
		organization: '',
		requesterRegion: '',
		associatedProject: '',
		reason: '',
		location: '+ Add Location'
	});

	const [checked1, setSamplesChecked1] = useState(false);
	const [checked2, setSamplesChecked2] = useState(false);
	const [checked3, setSamplesChecked3] = useState(false);


	const [organization, setOrganization] = useState('');
	const [role, setRole] = useState('');
	const [purpose, setPurpose] = useState(formState.purpose);
	const [sex, setSex] = useState('');
	const [ageClass, setAgeClass] = useState('');
	const [eventType, setEventType] = useState('');
	const [identifierOptions, setIdentifierOption] = useState([
		{value: '', label: ''},
	]);
	const [locationOptions, setLocationOption] = useState([
		{value: '', label: ''},
	]);

	const [expansionEvent, setExpansionEvent] = useState<ExpansionOverrideEvent>({
		event: 'none',
		id: 0
	});

	const handleSubmit = (e) => {

	}
	const handleUpdate = (e) => {

	}


	//Add new event
	const [newEvent, setNewEvent] = useState(false);
	const handleNewEvent = () => {
		setNewEvent(true);
	};

	//Submitter Checked
	const [submitterChecked, setSubmitterChecked] = useState(false);
	const handleSubmitterChecked = () => {
		setSubmitterChecked(!submitterChecked);
	};

	//edit requester dialog
	const [openEditRequester, setOpenEditRequester] = useState(false);
	const handleOpenEditRequester = () => {
		setOpenEditRequester(true);
	};
	const handleCloseEditRequester = () => {
		setOpenEditRequester(false);
	};
	//add requester dialog
	const [openAddRequester, setOpenAddRequester] = useState(false);
	const handleOpenAddRequester = () => {
		setOpenAddRequester(true);
	};
	const handleCloseAddRequester = () => {
		setOpenAddRequester(false);
	};

	//requester delete confirmation
	const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
	const handleDeleteConfirmation = () => {
		setDeleteConfirmation(true);
	};
	const handleCloseDeleteConfirmation = () => {
		setDeleteConfirmation(false);
	};

	//handle identifier options
	const handleSelectIdentifier = (index, e) => {
		const values = [...identifierOptions];
		values[index][e.target.value] = e.target.value;
		setIdentifierOption(values);
	}
	const handleAddIdentifier = (index) => {
		if (index === (identifierOptions.length - 1)) {
			setIdentifierOption([...identifierOptions, {value: '', label: ''}])
		}
	}

	//handle location options
	const handleSelectLocation = (index, e) => {
		const values = [...locationOptions];
		values[index][e.target.value] = e.target.value;
		setLocationOption(values);
	}
	const handleAddLocation = (index) => {
		if (index === (locationOptions.length - 1)) {
			setLocationOption([...locationOptions, {value: '', label: ''}])
		}
	}

	//Samples Checked
	const toggleChecked1 = () => {
		setSamplesChecked1((prev) => !prev);
	};
	const toggleChecked2 = () => {
		setSamplesChecked2((prev) => !prev);
	};
	const toggleChecked3 = () => {
		setSamplesChecked3((prev) => !prev);
	};

	return (
		<Box className='container'>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Box>
					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '32px'}}>WLH ID [Number]</Typography>
					<Typography sx={{marginBottom: '28px', fontSize: '16px', color: '#787f81'}}>Update the WLH ID details and events.</Typography>
				</Box>

				<Button variant={'contained'} sx={{height: '41px', textTransform: 'capitalize', fontSize: '14px', marginRight: '8px'}} onClick={handleNewEvent}>+ Add
					New Event</Button>

			</Box>

			<Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '70px', margin: '70px 8px 0 0'}}>
				<Button variant='outlined' className='expand_btn' onClick={() => {
					setExpansionEvent({event: 'expandAll', id: expansionEvent.id + 1});
				}}>Expand All</Button>
				<Button variant='outlined' className='expand_btn' onClick={() => {
					setExpansionEvent({event: 'collapseAll', id: expansionEvent.id + 1});
				}
				} sx={{marginLeft: '8px'}}>Collapse All</Button>
			</Box>

			<Expandable expansionEvent={expansionEvent}>
				<Expandable.Title>
					<span>
						<Typography sx={{fontSize: '18px'}}>Status</Typography>
						<Typography className='unassigned' sx={{color: 'white', fontSize: '13px'}} variant='subtitle1'>
						Unassigned
						</Typography>
					</span>
					<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
						<span>
							<Typography variant='body2'>
							WLH ID Number
							</Typography>
							<Typography variant='body1'>
							22-00001
							</Typography>
						</span>
						<span>
							<Typography variant='body2'>
							WLH ID Genrated  Date
							</Typography>
							<Typography variant='body1'>
							21-01-2021
							</Typography>
						</span>
						<span>
							<Typography variant='body2'>
							WLH ID Creator
							</Typography>
							<Typography variant='body1'>
							Jane Hill
							</Typography>
						</span>
					</Box>
				</Expandable.Title>
				<Expandable.Detail>
					<StatusForm
						handleUpdate={(e) => {
						}}
						IdStatus={'RETIRED'}
					/>

					<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
						<Button
							variant={'contained'}
							className='update_btn'
						>
							Update
						</Button>
						<Button
							variant={'outlined'}
							className='update_btn'
						>
							Cancel
						</Button>
					</Box>
				</Expandable.Detail>
			</Expandable>

			<Expandable expansionEvent={expansionEvent}>
				<Expandable.Title>
					<span>
						<Typography sx={{fontSize: '18px', width: '90px'}}>Purpose</Typography>
					</span>
					<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
						<span>
							<Typography variant='body2'>
							Primary Purpose
							</Typography>
							<Typography variant='body1'>
							Herd Health
							</Typography>
						</span>
						<span>
							<Typography variant='body2'>
							Requester
							</Typography>
							<Typography variant='body1'>
							Sultana Majid
							</Typography>
						</span>
						<span>
							<Typography variant='body2'>
							Organization
							</Typography>
							<Typography variant='body1'>
							Organization 1
							</Typography>
						</span>
					</Box>
				</Expandable.Title>
				<Expandable.Detail>
					<Box sx={{width: '1091px', margin: '0 auto'}}>
						<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '32px 0 21px 0'}}>WLH ID information</Typography>
						<TextField
							sx={{width: '529px'}}
							id='purpose1'
							select
							label='Primary Purpose'
							// value={purpose}
							onChange={(e) => {
								setPurpose(e.target.value);
							}}
						>
							{validPurposes.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							sx={{width: '529px', marginLeft: '32px'}}
							id='purpose2'
							select
							label='Secondary Purpose'
							// value={purpose}
							onChange={(e) => {
								setPurpose(e.target.value);
							}}
						>
							{validPurposes.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>

						<TextField
							sx={{minWidth: '1091px', marginTop: '32px'}}
							label='Associated Project'
							id='associatedProject'
							name='associatedProject'
							onChange={handleUpdate}
						/>
						<TextField
							sx={{minWidth: '1091px', marginTop: '32px'}}
							label='Project Details'
							id='projectDetails'
							name='projectDetails'
							multiline
							rows={3}
							onChange={handleUpdate}
						/>

						<Box className='requester'>
							<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '32px 0 21px 0'}}>
								Requester(1)
							</Typography>

							<Button variant={'outlined'} sx={{marginTop: '7px', width: '128px', height: '32px', fontSize: '14px', padding: '0', textTransform: 'capitalize'}}
								onClick={handleOpenAddRequester}
							>
								+ Add Requester
							</Button>
							<Dialog
								open={openAddRequester}
								onClose={handleCloseAddRequester}
								maxWidth={false}
								PaperProps={{
									sx: {width: '975px', maxHeight: '432px'}
								}}
							>
								<IconButton
									onClick={handleCloseAddRequester}
									sx={{
										position: 'absolute',
										right: 8,
										top: 8
									}}
								>
									<CloseIcon/>
								</IconButton>
								<DialogTitle sx={{fontSize: '18px', fontFamily: 'BCSans-Bold', padding: '59px 0 5px 31px'}}>Add Requester</DialogTitle>
								<DialogContent sx={{display: 'block', padding: ' 0 15px'}}>
									<TextField
										className='requesterFormInput'
										label='First Name'
										id='first_name'
										name='first_name'
										required
										onChange={handleUpdate}
									/>
									<TextField
										className='requesterFormInput'
										label='Last Name'
										id='last_name'
										name='last_name'
										required
										onChange={handleUpdate}
									/>
									<TextField
										className='requesterFormInput'
										id='organization-select'
										select
										label='Organization'
										value={organization}
										onChange={(e) => {
											setOrganization(e.target.value);
										}}
									>
										{validOrganization.map((m, i) => (
											<MenuItem key={i} value={m.value}>
												{m.label}
											</MenuItem>
										))}
									</TextField>
									<TextField
										className='requesterFormInput'
										id='role-select'
										select
										label='Role'
										value={role}
										onChange={(e) => {
											setRole(e.target.value);
										}}
									>
										{validRole.map((m, i) => (
											<MenuItem key={i} value={m.value}>
												{m.label}
											</MenuItem>
										))}
									</TextField>
									<TextField
										className='requesterFormInput'
										label='Phone Number'
										id='phone'
										name='phone'
										onChange={handleUpdate}
									/>
									<TextField
										className='requesterFormInput'
										label='Email'
										id='email'
										name='email'
										onChange={handleUpdate}
									/>
								</DialogContent>
								<DialogActions sx={{padding: '29px 32px 32px 0'}}>
									<Button variant={'contained'} onClick={handleCloseAddRequester} className='requesterFormBtn'>Add</Button>
									<Button variant={'outlined'} onClick={handleCloseAddRequester} className='requesterFormBtn' sx={{marginLeft: '11px'}}>Cancel</Button>
								</DialogActions>
							</Dialog>
						</Box>
					</Box>
					<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
						<Button
							variant={'contained'}
							className='update_btn'
						>
							Update
						</Button>
						<Button
							variant={'outlined'}
							className='update_btn'
						>
							Cancel
						</Button>
					</Box>
				</Expandable.Detail>
			</Expandable>


			<Expandable expansionEvent={expansionEvent}>
				<Expandable.Title>
					<span>
						<Typography sx={{fontSize: '18px'}}>Animal Details</Typography>
					</span>
					<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
						<span>
							<Typography variant='body2'>
							Species
							</Typography>
							<Typography variant='body1'>
							Moose
							</Typography>
						</span>
						<span>
							<Typography variant='body2'>
							Gender
							</Typography>
							<Typography variant='body1'>
							Female
							</Typography>
						</span>
						<span>
							<Typography variant='body2'>
							Home Region
							</Typography>
							<Typography variant='body1'>
							Home Region1
							</Typography>
						</span>
					</Box>
				</Expandable.Title>
				<Expandable.Detail>
					<Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
						<Box sx={{width: '1091px', margin: '0 auto'}}>

							<TextField
								sx={{minWidth: '1091px', marginTop: '57px'}}
								label='Species'
								id='species'
								name='species'
								InputProps={{
									endAdornment: <InputAdornment position='end'><AccountTreeOutlinedIcon/></InputAdornment>,
								}}
								onChange={handleUpdate}
							/>

							<TextField
								sx={{width: '529px', marginRight: '32px', marginTop: '32px'}}
								label='Home Region'
								id='homeRegion'
								onChange={handleUpdate}
							/>
							<TextField
								select
								sx={{width: '529px', marginTop: '32px'}}
								id='sex'
								label='Sex'
								value={sex}
								onChange={(e) => {
									setSex(e.target.value);
								}}
							>
								{validSex.map((m, i) => (
									<MenuItem key={i} value={m.value}>
										{m.label}
									</MenuItem>
								))}
							</TextField>
							{identifierOptions.map((identifierOption, index) => (
								<div>
									<Box sx={{display: 'flex', flexDirection: 'column'}} key={index}>
										<IdentifierEntry
											key={index}
											handleUpdate={(e) => {
												handleSelectIdentifier(index, e);
												handleAddIdentifier(index);
											}}
											handleDelete={() => {
												console.log("delete");
											}}
										/>
									</Box>
								</div>
							))}
						</Box>
					</Box>
					<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
						<Button
							variant={'contained'}
							className='update_btn'
						>
							Update
						</Button>
						<Button
							variant={'outlined'}
							className='update_btn'
						>
							Cancel
						</Button>
					</Box>
				</Expandable.Detail>
			</Expandable>

			<Expandable expansionEvent={expansionEvent}>
				<Expandable.Title>	<span>
					<Typography sx={{fontSize: '18px', width: '90px'}}>Event</Typography>
				</span>
				<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
					<span>
						<Typography variant='body2'>
							Event type
						</Typography>
						<Typography variant='body1'>
							Capture
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Date
						</Typography>
						<Typography variant='body1'>
							21-01-2021
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Location
						</Typography>
						<Typography variant='body1'>
							ZoneZone Zone 1
						</Typography>
					</span>
				</Box>
				</Expandable.Title>
				<Expandable.Detail>
					<Box sx={{width: '1091px', margin: '0 auto'}}>
						<FormControl sx={{width: '380px', marginTop: '62px'}}>
							<FormLabel>Event Type</FormLabel>
							<RadioGroup
								row
								aria-labelledby='demo-controlled-radio-buttons-group'
								name='controlled-radio-buttons-group'
								value={eventType}
								onChange={(e) => {
									setEventType(e.target.value);
								}}
							>
								<FormControlLabel value='capture' control={<Radio/>} label='Capture'/>
								<FormControlLabel value='mortality' control={<Radio/>} label='Mortality'/>
								<FormControlLabel value='recapture' control={<Radio/>} label='Recapture'/>
							</RadioGroup>
						</FormControl>

						<Box sx={{width: 'inherit', display: 'flex', flexDirection: 'row', marginTop: '37px'}}>
							<TextField
								sx={{width: '529px'}}
								label='Event Start Date(DD-MM-YYYY)'
								id='date'
								name='date'
								onChange={handleUpdate}
								InputProps={{
									endAdornment: <InputAdornment position='end'><CalendarTodayIcon/></InputAdornment>,
								}}
							/>
							<TextField
								sx={{width: '529px', marginLeft: '32px'}}
								id='ageClass'
								select
								label='Age Class'
								value={ageClass}
								onChange={(e) => {
									setAgeClass(e.target.value);
								}}
							>
								{validAgeClass.map((m, i) => (
									<MenuItem key={i} value={m.value}>
										{m.label}
									</MenuItem>
								))}
							</TextField>
						</Box>

						<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '49px 0 0 0'}}>Location</Typography>
						{locationOptions.map((locationOption, index) => (
							<div>
								<Box sx={{display: 'flex', flexDirection: 'column'}} key={index}>
									<LocationEntry
										key={index}
										handleUpdate={(e) => {
											handleSelectLocation(index, e);
											handleAddLocation(index);
										}}
										handleDelete={() => {
											console.log("delete");
										}}
									/>
								</Box>
							</div>
						))}

						<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '100px 0 0 0'}}>Submitter</Typography>
						<FormGroup sx={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
							<Typography sx={{fontSize: '16px', margin: '16px 50px 20px 0', color: '#868e96'}}>Is submitter same as the requester?</Typography>
							<FormControlLabel control={<Switch onClick={handleSubmitterChecked}/>} label={`${submitterChecked ? 'Yes' : 'No'}`}/>
						</FormGroup>

						<TableContainer component={Paper} sx={{display: submitterChecked ? 'auto' : 'none'}}>
							<Table>
								<TableHead>
									<TableRow className='tablehead'>
										<TableCell>Name</TableCell>
										<TableCell>Family</TableCell>
										<TableCell>Region</TableCell>
										<TableCell>Organization</TableCell>
										<TableCell>Role</TableCell>
										<TableCell>Phone</TableCell>
										<TableCell>Email</TableCell>
										<TableCell>Action</TableCell>

									</TableRow>
								</TableHead>
								<TableHead>
									<TableRow>
										<TableCell>Sultana</TableCell>
										<TableCell>Majid</TableCell>
										<TableCell></TableCell>
										<TableCell></TableCell>
										<TableCell></TableCell>
										<TableCell></TableCell>
										<TableCell></TableCell>
										<TableCell>
											<IconButton onClick={handleOpenEditRequester}>
												<EditIcon color='primary'/>
											</IconButton>
											<IconButton onClick={handleDeleteConfirmation}>
												<DeleteIcon color='primary'/>
											</IconButton>
										</TableCell>
										<Dialog
											open={DeleteConfirmation}
											onClose={handleCloseDeleteConfirmation}
											maxWidth={false}
											PaperProps={{
												sx: {width: '615px', maxHeight: '279px', height: '279px'}
											}}
										>
											<IconButton
												onClick={handleCloseDeleteConfirmation}
												sx={{
													position: 'absolute',
													right: 8,
													top: 8
												}}
											>
												<CloseIcon/>
											</IconButton>
											<DialogTitle sx={{fontSize: '18px', fontFamily: 'BCSans-Bold', padding: '47px 0 35px 39px'}}>
												{"Delete Confirmation"}
											</DialogTitle>
											<DialogContent sx={{padding: '40px 39px', fontSize: '16px'}}>
												Are you sure you want to delete this requester?<br/>
												There is no Undo for this action.
											</DialogContent>
											<DialogActions sx={{padding: '0 32px 48px 0'}}>
												<Button variant={'contained'} onClick={handleCloseDeleteConfirmation} className='requesterFormBtn'
													sx={{backgroundColor: '#d8292f'}}>Delete</Button>
												<Button variant={'outlined'} onClick={handleCloseDeleteConfirmation} className='requesterFormBtn'
													sx={{marginLeft: '11px'}}>Cancel</Button>
											</DialogActions>
										</Dialog>

										<Dialog
											open={openEditRequester}
											onClose={handleCloseEditRequester}
											maxWidth={false}
											PaperProps={{
												sx: {width: '975px', maxHeight: '432px'}
											}}
										>
											<IconButton
												onClick={handleCloseEditRequester}
												sx={{
													position: 'absolute',
													right: 8,
													top: 8
												}}
											>
												<CloseIcon/>
											</IconButton>
											<DialogTitle sx={{fontSize: '18px', fontFamily: 'BCSans-Bold', padding: '59px 0 5px 31px'}}>Update Requester</DialogTitle>
											<DialogContent sx={{display: 'block', padding: ' 0 15px'}}>
											</DialogContent>
										</Dialog>


									</TableRow>
								</TableHead>
							</Table>
						</TableContainer>

						<Button variant={'outlined'} sx={{
							width: '128px',
							height: '32px',
							fontSize: '14px',
							padding: '0',
							textTransform: 'capitalize',
							display: submitterChecked ? 'none' : 'auto'
						}}
						onClick={handleOpenAddRequester}
						>
							+ Add Submitter
						</Button>

						<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '35px 0 16px 0'}}>Samples</Typography>

						<FormGroup sx={{width: '400px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
							<Typography variant='body1' sx={{color: '#868e96'}}>Samples Were Collected?</Typography>
							<FormControlLabel control={<Switch onChange={toggleChecked1}/>} label={`${checked1 ? 'Yes' : 'No'}`}/>
							<Typography variant='body1' sx={{color: '#868e96'}}>Samples Sent for Testing?</Typography>
							<FormControlLabel control={<Switch onChange={toggleChecked2}/>} label={`${checked2 ? 'Yes' : 'No'}`}/>
							<Typography variant='body1' sx={{color: '#868e96'}}>Test Results Received?</Typography>
							<FormControlLabel control={<Switch onChange={toggleChecked3}/>} label={`${checked3 ? 'Yes' : 'No'}`}/>
						</FormGroup>

						<TextField
							sx={{width: '1079px', marginTop: '29px'}}
							label='History (Max 500 Characters)'
							id='history'
							name='history'
							multiline
							rows={5}
							onChange={handleUpdate}
							inputProps={{maxLength: 500}}
						/>

					</Box>

					<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
						<Button
							variant={'contained'}
							className='update_btn'
						>
							Update
						</Button>
						<Button
							variant={'outlined'}
							className='update_btn'
							onClick={handleNewEvent}
						>
							Add New Event
						</Button>
						<Button
							variant={'outlined'}
							className='update_btn'
						>
							Cancel
						</Button>
					</Box>
				</Expandable.Detail>
			</Expandable>

			{newEvent &&
				<Expandable expansionEvent={expansionEvent}>
					<Expandable.Title>
						<span>
							<Typography sx={{fontSize: '18px', width: '90px'}}>New Event</Typography>
						</span>
					</Expandable.Title>
					<Expandable.Detail>
						<Box sx={{width: '1091px', margin: '0 auto'}}>
							<FormControl sx={{width: '380px', marginTop: '62px'}}>
								<FormLabel>Event Type</FormLabel>
								<RadioGroup
									row
									aria-labelledby='demo-controlled-radio-buttons-group'
									name='controlled-radio-buttons-group'
									value={eventType}
									onChange={(e) => {
										setEventType(e.target.value);
									}}
								>
									<FormControlLabel value='capture' control={<Radio/>} label='Capture'/>
									<FormControlLabel value='mortality' control={<Radio/>} label='Mortality'/>
									<FormControlLabel value='recapture' control={<Radio/>} label='Recapture'/>
									<FormControlLabel value='release' control={<Radio/>} label='Release'/>
								</RadioGroup>
							</FormControl>

							<TextField
								sx={{width: '529px', marginTop: '24px'}}
								id='ageClass'
								select
								label='Age Class'
								value={ageClass}
								onChange={(e) => {
									setAgeClass(e.target.value);
								}}
							>
								{validAgeClass.map((m, i) => (
									<MenuItem key={i} value={m.value}>
										{m.label}
									</MenuItem>
								))}
							</TextField>

							<Box sx={{width: 'inherit', display: 'flex', flexDirection: 'row', marginTop: '24px'}}>
								<TextField
									sx={{width: '529px'}}
									label='Event Start Date(DD-MM-YYYY)'
									id='start_date'
									name='start_date'
									onChange={handleUpdate}
									InputProps={{
										endAdornment: <InputAdornment position='end'><CalendarTodayIcon/></InputAdornment>,
									}}
								/>
								<TextField
									sx={{width: '529px', marginLeft: '32px'}}
									label='Event End Date(DD-MM-YYYY)'
									id='end_date'
									name='end_date'
									onChange={handleUpdate}
									InputProps={{
										endAdornment: <InputAdornment position='end'><CalendarTodayIcon/></InputAdornment>,
									}}
								/>
							</Box>

							<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '49px 0 0 0'}}>Location</Typography>
							{locationOptions.map((locationOption, index) => (
								<div>
									<Box sx={{display: 'flex', flexDirection: 'column'}} key={index}>
										<LocationEntry
											key={index}
											handleUpdate={(e) => {
												handleSelectLocation(index, e);
												handleAddLocation(index);
											}}
											handleDelete={() => {
												console.log("delete");
											}}
										/>
									</Box>
								</div>
							))}

							<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '100px 0 0 0'}}>Submitter</Typography>
							<FormGroup sx={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
								<Typography sx={{fontSize: '16px', margin: '16px 50px 20px 0', color: '#868e96'}}>Is submitter same as the requester?</Typography>
								<FormControlLabel control={<Switch onClick={handleSubmitterChecked}/>} label={`${submitterChecked ? 'Yes' : 'No'}`}/>
							</FormGroup>

							<TableContainer component={Paper} sx={{display: submitterChecked ? 'auto' : 'none'}}>
								<Table>
									<TableHead>
										<TableRow className='tablehead'>
											<TableCell>Name</TableCell>
											<TableCell>Family</TableCell>
											<TableCell>Region</TableCell>
											<TableCell>Organization</TableCell>
											<TableCell>Role</TableCell>
											<TableCell>Phone</TableCell>
											<TableCell>Email</TableCell>
											<TableCell>Action</TableCell>

										</TableRow>
									</TableHead>
									<TableHead>
										<TableRow>
											<TableCell>Sultana</TableCell>
											<TableCell>Majid</TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
											<TableCell>
												<IconButton onClick={handleOpenEditRequester}>
													<EditIcon color='primary'/>
												</IconButton>
												<IconButton onClick={handleDeleteConfirmation}>
													<DeleteIcon color='primary'/>
												</IconButton>
											</TableCell>
										</TableRow>
									</TableHead>
								</Table>
							</TableContainer>

							<Button variant={'outlined'} sx={{
								width: '128px',
								height: '32px',
								fontSize: '14px',
								padding: '0',
								textTransform: 'capitalize',
								display: submitterChecked ? 'none' : 'auto'
							}}
							onClick={handleOpenAddRequester}
							>
								+ Add Submitter
							</Button>

							<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '35px 0 16px 0'}}>Samples</Typography>

							<FormGroup sx={{width: '400px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
								<Typography variant='body1' sx={{color: '#868e96'}}>Samples Were Collected?</Typography>
								<FormControlLabel control={<Switch onChange={toggleChecked1}/>} label={`${checked1 ? 'Yes' : 'No'}`}/>
								<Typography variant='body1' sx={{color: '#868e96'}}>Samples Sent for Testing?</Typography>
								<FormControlLabel control={<Switch onChange={toggleChecked2}/>} label={`${checked2 ? 'Yes' : 'No'}`}/>
								<Typography variant='body1' sx={{color: '#868e96'}}>Test Results Received?</Typography>
								<FormControlLabel control={<Switch onChange={toggleChecked3}/>} label={`${checked3 ? 'Yes' : 'No'}`}/>
							</FormGroup>

							<TextField
								sx={{width: '1079px', marginTop: '29px'}}
								label='History (Max 500 Characters)'
								id='history'
								name='history'
								multiline
								rows={5}
								onChange={handleUpdate}
								inputProps={{maxLength: 500}}
							/>
						</Box>
						<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
							<Button
								variant={'contained'}
								className='update_btn'
							>
								Save
							</Button>
							<Button
								variant={'outlined'}
								className='update_btn'
							>
								Add New Event
							</Button>
							<Button
								variant={'outlined'}
								className='update_btn'
							>
								Cancel
							</Button>
						</Box>
					</Expandable.Detail>
				</Expandable>
			}
		</Box>
	);
};
export default EditForm;
