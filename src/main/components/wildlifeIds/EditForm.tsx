import React, {useEffect, useState} from 'react';
import {
	Box,
	Button,
	Card,
	Checkbox,
	Collapse,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	IconButton,
	IconButtonProps,
	InputAdornment,
	MenuItem,
	Paper,
	Radio,
	RadioGroup,
	styled,
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
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {useSelector} from "../../../state/utilities/use_selector";
import {selectCodeTables} from "../../../state/reducers/code_tables";
import IdentifierEntry from './IdentifierEntry';
import LocationEntry from './LocationEntry';
import Expandable, {ExpansionOverrideEvent} from "../pageElements/Expandable";


const EditForm = ({wildlifeId}) => {

	const [validPurposes, setValidPurposes] = useState([]);
	const [validSex, setValidSex] = useState([]);
	const [validAgeClass, setValidAgeClass] = useState([]);
	const [validSingleIdStatus, setValidSingleIdStatus] = useState([]);
	const [validOrganization, setValidOrganization] = useState([]);

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


	const handleSubmit = () => {
	}

	const handleUpdate = () => {

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

	//update requester dialog
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
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
					<Box sx={{width: '1091px', margin: '48px auto'}}>
						<TextField
							sx={{width: '529px', marginTop: '8px'}}
							id='idStatus'
							label='WLH ID Status*'
							name='idStatus'
							select
							onChange={handleUpdate}
							onSelect={handleUpdate}
						>
							{validSingleIdStatus.map((m) => (
								<MenuItem key={m.value} value={m.value} selected={formState.purpose === m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							sx={{minWidth: '1091px', marginTop: '28px'}}
							label='Reason (Enter a reason why you are changing the WLH ID status)'
							id='reason'
							name='reason'
							multiline
							rows={3}
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

							<TableContainer component={Paper}>
								<Table>
									<TableHead>
										<TableRow className='tablehead'>
											<TableCell>Family</TableCell>
											<TableCell>Name</TableCell>
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
												<IconButton onClick={handleClickOpen}>
													<EditIcon color='primary'/>
												</IconButton>
												<IconButton>
													<DeleteIcon color='primary'/>
												</IconButton>
											</TableCell>

											<Dialog open={open} onClose={handleClose}>
												<DialogTitle>Update Requester</DialogTitle>
												<DialogContent sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
													<TextField
														sx={{m: 2, width: '40%'}}
														label='Submitter First Name'
														id='first_name'
														name='first_name'
														onChange={handleUpdate}
													/>
													<TextField
														sx={{m: 2, width: '40%'}}
														label='Submitter Last Name'
														id='last_name'
														name='last_name'
														onChange={handleUpdate}
													/>
													<TextField
														sx={{m: 2, width: '40%'}}
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
														sx={{m: 2, width: '40%'}}
														id='role-select'
														select
														label='Role'
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
														sx={{m: 2, width: '40%'}}
														label='Phone Number'
														id='phone'
														name='phone'
														onChange={handleUpdate}
													/>
													<TextField
														sx={{m: 2, width: '40%'}}
														label='Email'
														id='email'
														name='email'
														onChange={handleUpdate}
													/>
												</DialogContent>
												<DialogActions>
													<Button variant={'contained'} onClick={handleClose}>Update</Button>
													<Button variant={'outlined'} onClick={handleClose}>Cancel</Button>
												</DialogActions>
											</Dialog>
										</TableRow>
									</TableHead>
								</Table>
							</TableContainer>
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

						<Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginBlock: '20px'}}>
							<Typography variant='subtitle1' sx={{width: '18%', textAlign: 'center', margin: '0 35px'}}>
								Submitter (s)
							</Typography>
							<Box sx={{width: '60%', display: 'flex', flexDirection: 'column'}}>
								<FormGroup>
									<FormControlLabel control={<Checkbox onClick={handleSubmitterChecked}/>} label='Submitter is the same as the requester' sx={{width: '80%'}}/>
								</FormGroup>
								<TableContainer component={Paper} sx={{display: submitterChecked ? 'auto' : 'none'}}>
									<Table sx={{width: '100%'}} size='small'>
										<TableHead>
											<TableRow>
												<TableCell sx={{color: 'darkgrey'}}>Name</TableCell>
												<TableCell sx={{color: 'darkgrey'}}>Family</TableCell>
												<TableCell sx={{color: 'darkgrey'}}>Region</TableCell>
												<TableCell sx={{color: 'darkgrey'}}>Organization</TableCell>
												<TableCell align='center' sx={{color: 'darkgrey'}}>Role</TableCell>
												<TableCell sx={{color: 'darkgrey'}}>Phone</TableCell>
												<Box sx={{float: 'right'}}>
													<IconButton onClick={handleClickOpen}>
														<EditIcon color='primary'/>
													</IconButton>
													<IconButton>
														<DeleteIcon color='primary'/>
													</IconButton>

													<Dialog open={open} onClose={handleClose}>
														<DialogTitle>Update Requester</DialogTitle>
														<DialogContent sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
															<TextField
																sx={{m: 2, width: '40%'}}
																label='Submitter First Name'
																id='first_name'
																name='first_name'
																onChange={handleUpdate}
															/>
															<TextField
																sx={{m: 2, width: '40%'}}
																label='Submitter Last Name'
																id='last_name'
																name='last_name'
																onChange={handleUpdate}
															/>
															<TextField
																sx={{m: 2, width: '40%'}}
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
																sx={{m: 2, width: '40%'}}
																id='role-select'
																select
																label='Role'
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
																sx={{m: 2, width: '40%'}}
																label='Phone Number'
																id='phone'
																name='phone'
																onChange={handleUpdate}
															/>
															<TextField
																sx={{m: 2, width: '40%'}}
																label='Email'
																id='email'
																name='email'
																onChange={handleUpdate}
															/>
														</DialogContent>
														<DialogActions>
															<Button variant={'contained'} onClick={handleClose}>Update</Button>
															<Button variant={'outlined'} onClick={handleClose}>Cancel</Button>
														</DialogActions>
													</Dialog>
												</Box>
											</TableRow>
										</TableHead>
										<TableHead>
											<TableRow>
												<TableCell sx={{color: 'lightgray'}}>Sultana</TableCell>
												<TableCell sx={{color: 'lightgray'}}>Majid</TableCell>
											</TableRow>
										</TableHead>
									</Table>
								</TableContainer>
							</Box>
							<Button variant={'outlined'} sx={{margin: '10px', width: '20%'}} onClick={handleClickOpen}>
								+ Add Submitter
							</Button>
							<Dialog open={open} onClose={handleClose}>
								<DialogTitle>Update Requester</DialogTitle>
								<DialogContent sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
									<TextField
										sx={{m: 2, width: '40%'}}
										label='Submitter First Name'
										id='first_name'
										name='first_name'
										onChange={handleUpdate}
									/>
									<TextField
										sx={{m: 2, width: '40%'}}
										label='Submitter Last Name'
										id='last_name'
										name='last_name'
										onChange={handleUpdate}
									/>
									<TextField
										sx={{m: 2, width: '40%'}}
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
										sx={{m: 2, width: '40%'}}
										id='role-select'
										select
										label='Role'
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
										sx={{m: 2, width: '40%'}}
										label='Phone Number'
										id='phone'
										name='phone'
										onChange={handleUpdate}
									/>
									<TextField
										sx={{m: 2, width: '40%'}}
										label='Email'
										id='email'
										name='email'
										onChange={handleUpdate}
									/>
								</DialogContent>
								<DialogActions>
									<Button variant={'contained'} onClick={handleClose}>Update</Button>
									<Button variant={'outlined'} onClick={handleClose}>Cancel</Button>
								</DialogActions>
							</Dialog>
						</Box>
					</Box>
					<Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
						<Typography variant='subtitle1' sx={{width: '20%', textAlign: 'center', margin: '0 35px'}}>
							Samples
						</Typography>
						<Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
							<FormGroup sx={{width: '35%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%'}}>
								<p>Samples Were Collected?</p>
								<FormControlLabel control={<Switch onChange={toggleChecked1}/>} label={`${checked1 ? 'Yes' : 'No'}`}/>
								<p>Samples Sent for Testing?</p>
								<FormControlLabel control={<Switch onChange={toggleChecked2}/>} label={`${checked2 ? 'Yes' : 'No'}`}/>
								<p>Test Results Received?</p>
								<FormControlLabel control={<Switch onChange={toggleChecked3}/>} label={`${checked3 ? 'Yes' : 'No'}`}/>
							</FormGroup>
							<TextField
								sx={{m: 2, width: '85%'}}
								label='History (Max 500 Characters)'
								id='history'
								name='history'
								multiline
								rows={5}
								defaultValue={formState.requesterRegion}
								onChange={handleUpdate}
								inputProps={{maxLength: 500}}
							/>
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
							<Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
								<Typography variant='subtitle1' sx={{width: '20%', textAlign: 'center', margin: '0 35px'}}>
									Location (s)
								</Typography>
								<Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
									<Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
										<TextField
											sx={{m: 2, width: '40%'}}
											label='Date(DD-MM-YYYY)'
											id='date'
											name='date'
											onChange={handleUpdate}
											InputProps={{
												endAdornment: <InputAdornment position='end'><CalendarTodayIcon/></InputAdornment>,
											}}
										/>
										<TextField
											sx={{m: 2, width: '40%'}}
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
								</Box>
							</Box>

							<Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginBlock: '20px'}}>
								<Typography variant='subtitle1' sx={{width: '18%', textAlign: 'center', margin: '0 35px'}}>
									Submitter (s)
								</Typography>
								<Box sx={{width: '60%', display: 'flex', flexDirection: 'column'}}>
									<FormGroup>
										<FormControlLabel
											control={<Checkbox onClick={handleSubmitterChecked}/>}
											label='Submitter is the same as the requester'
											sx={{width: '80%'}}
										/>
									</FormGroup>
									<TableContainer component={Paper} sx={{display: submitterChecked ? 'auto' : 'none'}}>
										<Table sx={{width: '100%'}} size='small'>
											<TableHead>
												<TableRow>
													<TableCell sx={{color: 'darkgrey'}}>Name</TableCell>
													<TableCell sx={{color: 'darkgrey'}}>Family</TableCell>
													<TableCell sx={{color: 'darkgrey'}}>Region</TableCell>
													<TableCell sx={{color: 'darkgrey'}}>Organization</TableCell>
													<TableCell align='center' sx={{color: 'darkgrey'}}>Role</TableCell>
													<TableCell sx={{color: 'darkgrey'}}>Phone</TableCell>
													<Box sx={{float: 'right'}}>
														<IconButton onClick={handleClickOpen}>
															<EditIcon color='primary'/>
														</IconButton>
														<IconButton>
															<DeleteIcon color='primary'/>
														</IconButton>

														<Dialog open={open} onClose={handleClose}>
															<DialogTitle>Update Requester</DialogTitle>
															<DialogContent sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
																<TextField
																	sx={{m: 2, width: '40%'}}
																	label='Submitter First Name'
																	id='first_name'
																	name='first_name'
																	onChange={handleUpdate}
																/>
																<TextField
																	sx={{m: 2, width: '40%'}}
																	label='Submitter Last Name'
																	id='last_name'
																	name='last_name'
																	onChange={handleUpdate}
																/>
																<TextField
																	sx={{m: 2, width: '40%'}}
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
																	sx={{m: 2, width: '40%'}}
																	id='role-select'
																	select
																	label='Role'
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
																	sx={{m: 2, width: '40%'}}
																	label='Phone Number'
																	id='phone'
																	name='phone'
																	onChange={handleUpdate}
																/>
																<TextField
																	sx={{m: 2, width: '40%'}}
																	label='Email'
																	id='email'
																	name='email'
																	onChange={handleUpdate}
																/>
															</DialogContent>
															<DialogActions>
																<Button variant={'contained'} onClick={handleClose}>Update</Button>
																<Button variant={'outlined'} onClick={handleClose}>Cancel</Button>
															</DialogActions>
														</Dialog>
													</Box>
												</TableRow>
											</TableHead>
											<TableHead>
												<TableRow>
													<TableCell sx={{color: 'lightgray'}}>Sultana</TableCell>
													<TableCell sx={{color: 'lightgray'}}>Majid</TableCell>
												</TableRow>
											</TableHead>

										</Table>
									</TableContainer>
								</Box>
								<Button variant={'outlined'} sx={{margin: '10px', width: '20%'}} onClick={handleClickOpen}>
									+ Add Submitter
								</Button>
								<Dialog open={open} onClose={handleClose}>
									<DialogTitle>Update Requester</DialogTitle>
									<DialogContent sx={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
										<TextField
											sx={{m: 2, width: '40%'}}
											label='Submitter First Name'
											id='first_name'
											name='first_name'
											onChange={handleUpdate}
										/>
										<TextField
											sx={{m: 2, width: '40%'}}
											label='Submitter Last Name'
											id='last_name'
											name='last_name'
											onChange={handleUpdate}
										/>
										<TextField
											sx={{m: 2, width: '40%'}}
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
											sx={{m: 2, width: '40%'}}
											id='role-select'
											select
											label='Role'
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
											sx={{m: 2, width: '40%'}}
											label='Phone Number'
											id='phone'
											name='phone'
											onChange={handleUpdate}
										/>
										<TextField
											sx={{m: 2, width: '40%'}}
											label='Email'
											id='email'
											name='email'
											onChange={handleUpdate}
										/>
									</DialogContent>
									<DialogActions>
										<Button variant={'contained'} onClick={handleClose}>Update</Button>
										<Button variant={'outlined'} onClick={handleClose}>Cancel</Button>
									</DialogActions>
								</Dialog>
							</Box>
						</Box>
						<Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
							<Typography variant='subtitle1' sx={{width: '20%', textAlign: 'center', margin: '0 35px'}}>
								Samples
							</Typography>
							<Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
								<FormGroup sx={{width: '35%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%'}}>
									<p>Samples Were Collected?</p>
									<FormControlLabel control={<Switch onChange={toggleChecked1}/>} label={`${checked1 ? 'Yes' : 'No'}`}/>
									<p>Samples Sent for Testing?</p>
									<FormControlLabel control={<Switch onChange={toggleChecked2}/>} label={`${checked2 ? 'Yes' : 'No'}`}/>
									<p>Test Results Received?</p>
									<FormControlLabel control={<Switch onChange={toggleChecked3}/>} label={`${checked3 ? 'Yes' : 'No'}`}/>
								</FormGroup>
								<TextField
									sx={{m: 2, width: '85%'}}
									label='History (Max 500 Characters)'
									id='history'
									name='history'
									multiline
									rows={5}
									defaultValue={formState.requesterRegion}
									onChange={handleUpdate}
									inputProps={{maxLength: 500}}
								/>
							</Box>
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
