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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {useSelector} from "../../../state/utilities/use_selector";
import {selectCodeTables} from "../../../state/reducers/code_tables";
import IdentifierEntry from './IdentifierEntry';
import LocationEntry from './LocationEntry';

//Expand form
interface ExpandMoreProps extends IconButtonProps {
	expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
	const {expand, ...other} = props;
	return <IconButton {...other} />;
})(({theme, expand}) => ({
	transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
	marginLeft: 'auto',
	transition: theme.transitions.create('transform', {
		duration: theme.transitions.duration.shortest,
	}),
}));


const EditForm = ({wildlifeId}) => {

	const [validPurposes, setValidPurposes] = useState([]);
	// const [validIdentifier, setValidIdentifier] = useState([]);
	// const [validLocation, setValidLocation] = useState([]);
	// const [validOrganization, setValidOrganization] = useState([]);

	const [validSex, setValidSex] = useState([]);
	const [validAgeClass, setValidAgeClass] = useState([]);

	const validOrganization = [
		{value: 'ONE', label: 'Organization 1'},
		{value: 'TWO', label: 'Organization 2'},
		{value: 'THREE', label: 'Organization 3'},
		{value: 'FOUR', label: 'Organization 4'}
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

	}, [tables]);

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

	const [expanded_purpose, setExpandedPurpose] = useState(false);
	const [expanded_WLD, setExpandedWLD] = useState(false);
	const [expanded_event, setExpandedEvent] = useState(false);
	const [expanded_newEvent, setExpandedNewEvent] = useState(false);

	const handleExpandClick = () => {
		setExpandedPurpose(!expanded_purpose);
		setShowDetail(!showDetail);
	};
	const handleExpandClick2 = () => {
		setExpandedWLD(!expanded_WLD);
		setShowDetail(!showDetail);
	};
	const handleExpandClick3 = () => {
		setExpandedEvent(!expanded_event);
		setShowDetail(!showDetail);
	};
	const handleExpandClick4 = () => {
		setExpandedNewEvent(!expanded_newEvent);
		setShowDetail(!showDetail);
	};
	const handleExpandAll = () => {
		setExpandedPurpose(true);
		setExpandedWLD(true);
		setExpandedEvent(true);
		setExpandedNewEvent(true);
		setShowDetail(false);
	};
	const handleCollapseAll = () => {
		setExpandedPurpose(false);
		setExpandedWLD(false);
		setExpandedEvent(false);
		setExpandedNewEvent(false);
		setShowDetail(true);
	};

	const handleSubmit = () => {
	}
	const handleUpdate = () => {
	}

	//Add new event
	const [newEvent, setNewEvent] = useState(false);
	const handleNewEvent = () => {
		setNewEvent(true);
	};

	//show details
	const [showDetail, setShowDetail] = useState(true);

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

		<Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
			<Typography variant={'h4'}>Update WLH ID</Typography><br/>
			<Box sx={{display: 'flex', width: '100%', justifyContent: 'space-between'}}>
				<p>Update the WLH ID details and add one or more events.</p>
				<Button variant={'contained'} sx={{height: '40px'}} onClick={handleNewEvent}>+ Add New Event</Button>
			</Box>
			<Paper sx={{width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center', padding: '30px'}}>
				<span>
					<p>General</p>
					<p>Information</p>
				</span>
				<span>
					<Typography variant='body2' color='text.secondary'>
						WLH ID Number
					</Typography>
					<Typography variant='body2' color='text.primary'>
						22-00001
					</Typography>
				</span>
				<span>
					<Typography variant='body2' color='text.secondary'>
						Creator
					</Typography>
					<Typography variant='body2' color='text.primary'>
						Jane Doe
					</Typography>
				</span>
				<span>
					<Typography variant='body2' color='text.secondary'>
						Generated Date
					</Typography>
					<Typography variant='body2' color='text.primary'>
						2022-03-05
					</Typography>
				</span>
				<span>
					<Typography variant='body2' color='text.secondary'>
						Status
					</Typography>
					<Typography variant='body2' color='text.white' className='assigned'>
						Assigned
					</Typography>
				</span>
			</Paper>
			<Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '60px'}}>
				<Button size='small' variant='outlined' onClick={handleExpandAll}>Expand All</Button>
				<Button size='small' variant='outlined' onClick={handleCollapseAll} sx={{marginLeft: '10px'}}>Collapse All</Button>
			</Box>
			<Card sx={{marginTop: '20px', width: '100%', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Box sx={{width: '85%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<Typography variant={'subtitle1'} sx={{width: '25%'}}>Purpose Update</Typography>
					<Box sx={{display: showDetail ? 'flex' : 'none', width: '100%', justifyContent: 'space-around'}}>
						<span>
							<Typography variant='body2' color='text.secondary'>
								Primary Purpose
							</Typography>
							<Typography variant='body2' color='text.primary'>
								Herd Health
							</Typography>
						</span>
						<span>
							<Typography variant='body2' color='text.secondary'>
								Requester
							</Typography>
							<Typography variant='body2' color='text.primary'>
								Sultana Majid
							</Typography>
						</span>
						<span>
							<Typography variant='body2' color='text.secondary'>
								Organization
							</Typography>
							<Typography variant='body2' color='text.primary'>
								Organization 1
							</Typography>
						</span>
					</Box>
				</Box>
				<ExpandMore
					expand={expanded_purpose}
					onClick={handleExpandClick}
					aria-expanded={expanded_purpose}
				>
					<KeyboardArrowDownIcon/>
				</ExpandMore>
			</Card>
			<Collapse in={expanded_purpose}>
				<Paper sx={{width: '100%', marginTop: '2px'}}>
					<Box sx={{display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'flex-end'}}>
						<TextField
							sx={{m: 2, width: '40%', marginTop: '40px'}}
							id='purpose1'
							select
							label='Primary Purpose'
							value={purpose}
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
							sx={{m: 2, width: '40%'}}
							id='purpose2'
							select
							label='Secondary Purpose'
							value={purpose}
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
							sx={{m: 2, width: '60%'}}
							label='Associated Project'
							id='associatedProject'
							defaultValue={formState.requesterRegion}
							name='associatedProject'
							onChange={handleUpdate}
						/>
						<TextField
							sx={{m: 2, width: '60%'}}
							label='Reason'
							id='reason'
							name='reason'
							multiline
							rows={5}
							defaultValue={formState.requesterRegion}
							onChange={handleUpdate}
						/>
					</Box>
					<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '15px'}}>
						<Typography variant='subtitle1' sx={{marginLeft: '10%'}}>
							Requester
						</Typography>
						<Box sx={{width: '61%', display: 'flex', flexDirection: 'column'}}>
							<TableContainer component={Paper}>
								<Table size='small'>
									<TableHead>
										<TableRow>
											<TableCell sx={{color: 'darkgrey'}}>Name</TableCell>
											<TableCell sx={{color: 'darkgrey'}}>Family</TableCell>
											<TableCell sx={{color: 'darkgrey'}}>Region</TableCell>
											<TableCell sx={{color: 'darkgrey'}}>Organization</TableCell>
											<TableCell align='right' sx={{color: 'darkgrey'}}>Role</TableCell>
											<TableCell sx={{color: 'darkgrey'}}>Phone</TableCell>
											<TableCell sx={{color: 'darkgrey'}}>Email</TableCell>
											<Box sx={{float: 'right', display: 'flex'}}>
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

					</Box>
					<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
						<Button
							variant={'contained'}
							sx={{m: 3, marginRight: '10px', width: '140px', height: '60px'}}
						>
							Update
						</Button>
						<Button
							variant={'outlined'}
							sx={{m: 3, width: '140px', height: '60px'}}
						>
							Cancel
						</Button>
					</Box>
				</Paper>
			</Collapse>


			<Card sx={{marginTop: '20px', width: '100%', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Box sx={{width: '85%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<Typography variant={'subtitle1'} sx={{width: '25%'}}>WLH ID 22-00001</Typography>
					<Box sx={{display: showDetail ? 'flex' : 'none', width: '100%', justifyContent: 'space-around'}}>
						<span>
							<Typography variant='body2' color='text.secondary'>
								Species
							</Typography>
							<Typography variant='body2' color='text.primary'>
								Animal 1
							</Typography>
						</span>
						<span>
							<Typography variant='body2' color='text.secondary'>
								Gender
							</Typography>
							<Typography variant='body2' color='text.primary'>
								Female
							</Typography>
						</span>
						<span>
							<Typography variant='body2' color='text.secondary'>
								Identifier
							</Typography>
							<Typography variant='body2' color='text.primary'>
								Identifier 1
							</Typography>
						</span>
					</Box>
				</Box>
				<ExpandMore
					expand={expanded_WLD}
					onClick={handleExpandClick2}
					aria-expanded={expanded_WLD}
				>
					<KeyboardArrowDownIcon/>
				</ExpandMore>
			</Card>
			<Collapse in={expanded_WLD}>
				<Paper sx={{width: '100%', marginTop: '2px', display: 'flex', flexDirection: 'column'}}>
					<Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
						<Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline', marginTop: '40px'}}>
							<Typography variant='subtitle1' sx={{width: '20%', textAlign: 'center', margin: '0 35px'}}>
								Identifier Type (s)
							</Typography>
							<Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
								<Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
									<TextField
										sx={{m: 2, width: '40%'}}
										label='Species'
										id='species'
										name='species'
										onChange={handleUpdate}
										InputProps={{
											endAdornment: <InputAdornment position='end'><AccountTreeOutlinedIcon/></InputAdornment>,
										}}
									/>
									<TextField
										sx={{m: 2, width: '40%'}}
										id='sex'
										select
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
								</Box>
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
					</Box>
					<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
						<Button
							variant={'contained'}
							sx={{m: 3, marginRight: '10px', width: '140px', height: '60px'}}
						>
							Update
						</Button>
						<Button
							variant={'outlined'}
							sx={{m: 3, width: '140px', height: '60px'}}
						>
							Cancel
						</Button>
					</Box>
				</Paper>
			</Collapse>
			<Card sx={{marginTop: '20px', width: '100%', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Box sx={{width: '85%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<Typography variant={'subtitle1'} sx={{width: '25%'}}>Event Update</Typography>
					<Box sx={{display: showDetail ? 'flex' : 'none', width: '100%', justifyContent: 'space-around'}}>
						<span>
							<Typography variant='body2' color='text.secondary'>
								Event type
							</Typography>
							<Typography variant='body2' color='text.primary'>
								Capture
							</Typography>
						</span>
						<span>
							<Typography variant='body2' color='text.secondary'>
								Date
							</Typography>
							<Typography variant='body2' color='text.primary'>
								03/05/2022
							</Typography>
						</span>
						<span>
							<Typography variant='body2' color='text.secondary'>
								Location
							</Typography>
							<Typography variant='body2' color='text.primary'>
								Zone 11111
							</Typography>
						</span>
					</Box>
				</Box>
				<ExpandMore
					expand={expanded_event}
					onClick={handleExpandClick3}
					aria-expanded={expanded_event}
				>
					<KeyboardArrowDownIcon/>
				</ExpandMore>
			</Card>
			<Collapse in={expanded_event}>
				<Paper sx={{width: '100%', marginTop: '2px', display: 'flex', flexDirection: 'column'}}>
					<Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
						<FormControl sx={{width: '30%', margin: '3% 0 0 7%'}}>
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
					<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
						<Button
							variant={'contained'}
							sx={{m: 3, marginRight: '10px', width: '140px', height: '60px'}}
						>
							Update
						</Button>
						<Button
							variant={'outlined'}
							sx={{m: 3, width: '140px', height: '60px'}}
						>
							Cancel
						</Button>
					</Box>
				</Paper>
			</Collapse>
			{/* Add new event */}
			<Box sx={{display: newEvent ? 'auto' : 'none'}}>
				<Card sx={{marginTop: '20px', width: '100%', padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
					<Box sx={{width: '85%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
						<Typography variant={'subtitle1'} sx={{width: '25%'}}>New Event</Typography>
						<Box sx={{display: showDetail ? 'flex' : 'none', width: '100%', justifyContent: 'space-around'}}>
							<span>
								<Typography variant='body2' color='text.secondary'>
									Event type
								</Typography>
								<Typography variant='body2' color='text.primary'>
									Capture
								</Typography>
							</span>
							<span>
								<Typography variant='body2' color='text.secondary'>
									Date
								</Typography>
								<Typography variant='body2' color='text.primary'>
									03/05/2022
								</Typography>
							</span>
							<span>
								<Typography variant='body2' color='text.secondary'>
									Location
								</Typography>
								<Typography variant='body2' color='text.primary'>
									Zone 11111
								</Typography>
							</span>
						</Box>
					</Box>
					<ExpandMore
						expand={expanded_newEvent}
						onClick={handleExpandClick4}
						aria-expanded={expanded_newEvent}
					>
						<KeyboardArrowDownIcon/>
					</ExpandMore>
				</Card>
				<Collapse in={expanded_newEvent}>
					<Paper sx={{width: '100%', marginTop: '2px', display: 'flex', flexDirection: 'column'}}>
						<Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
							<FormControl sx={{width: '30%', margin: '3% 0 0 7%'}}>
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
						<Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
							<Button
								variant={'contained'}
								sx={{m: 3, marginRight: '10px', width: '140px', height: '60px'}}
							>
								Update
							</Button>
							<Button
								variant={'outlined'}
								sx={{m: 3, width: '140px', height: '60px'}}
							>
								Cancel
							</Button>
						</Box>
					</Paper>
				</Collapse>
			</Box>
		</Box>
	);
};
export default EditForm;
