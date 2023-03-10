import React, {useEffect, useState} from 'react';
import GenerationLockWidget from '../../components/wildlifeIds/generate/GenerationLockWidget';
import {useAPI} from '../../hooks/useAPI';
import {Box, Button, InputAdornment, MenuItem, Paper, Select, Stack, TextField, Typography} from '@mui/material';
import '../../styles/inventory.scss';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import {useSelector} from '../../../state/utilities/use_selector';
import {useNavigate} from 'react-router-dom';
import TwoColumnForm from '../../components/wildlifeIds/generate/TwoColumnForm';
import {paperStyle} from '../../../state/style_constants';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {selectCodeTables} from '../../../state/reducers/code_tables';
import Loading from '../../components/util/Loading';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {useForm} from 'react-hook-form';
import ConfirmDialog from '../../components/wildlifeIds/generate/ConfirmDialog';
import CancelDialog from '../../components/wildlifeIds/generate/CancelDialog';

const Generate: React.FC = () => {
	const me = useSelector(state => state.Auth);
	const {purposes, status, regions, organizations, roles} = useSelector(state => state.CodeTables.tables);
	const {initialized: codeTablesInitialized} = useSelector(selectCodeTables);

	const api = useAPI();

	const navigate = useNavigate();
	const lockStatus = useSelector(state => state.GenerationLock);
	const [lockModalOpen, setLockModalOpen] = useState(false);

	useEffect(() => {
		if (lockStatus.initialized && !lockStatus.working && lockStatus.status && lockStatus.status.lockHolder && !lockStatus.status.lockHolder.isSelf) {
			setLockModalOpen(true);
		}
	}, [lockStatus, lockStatus.initialized, lockStatus.working]);

	const [generateStatus, setGenerateStatus] = useState({status: 'not yet called', message: ''});

	const [formState, setFormState] = useState({
		year: '2022',
		species: '',
		homeRegion: '',
		projectDetail: '',
		purpose: '',
		organization: '',
		status: 'UNASSIGNED',
		requesterFirstName: me.firstName,
		requesterLastName: me.lastName,
		requesterContactEmail: me.email,
		requesterContactPhone: '',
		requesterRegion: '',
		requesterOrganization: '',
		requesterRole: '',
		associatedProject: '',
		reason: '',
		phone: ''
	});

	//handle form error
	const {
		register,
		handleSubmit,
		control,
		formState: {errors}
	} = useForm({mode: 'onChange'});

	//year picker
	const [year, setYear] = React.useState<Date | null>(null);
	const [yearSelectError, setYearSelectError] = React.useState<string | null>(null);
	// const [yearSelectError, setYearSelectError] = useState(null);

	//update dialog
	const [openGenerateDialog, setGenerateDialog] = useState(false);
	const [openCancelDialog, setCancelDialog] = useState(false);
	const handleClickOpen = () => {
		setGenerateDialog(true);
	};
	const handleClose = () => {
		setGenerateDialog(false);
		setCancelDialog(false);
	};

	const validateYear = () => {
		if (!formState.year) {
			setYearSelectError('❗Enter the year');
			return false;
		}
		return true;
	};

	//handle direct
	const handleFormSubmit = () => {
		if (!validateYear()) return;

		api
			.generateIDs({
				quantity: parseInt(numOfIDs),
				year: formState.year,
				purpose: formState.purpose,
				species: formState.species,
				project: formState.associatedProject,
				homeRegion: formState.homeRegion,
				initialStatus: formState.status,
				projectDetail: formState.projectDetail,
				requester: {
					firstName: formState.requesterFirstName,
					lastName: formState.requesterLastName,
					region: formState.requesterRegion,
					organization: formState.organization,
					phoneNumber: formState.requesterContactPhone,
					email: formState.requesterContactEmail,
					role: formState.requesterRole
				}
			})
			.then(result => {
				setGenerateStatus({
					status: 'ok',
					message: JSON.stringify(result)
				});
			})
			.catch(err => {
				console.dir(err);
				setGenerateStatus({
					status: 'failed',
					message: JSON.stringify(err.response ? err.response.data : 'unknown')
				});
			});
	};

	//handle update
	const handleUpdate = event => {
		const currentState = formState;
		switch (event.target.name) {
			default:
				currentState[event.target.name] = event.target.value;
		}
	};

	//expand requester details
	const [RequesterDetailsExpand, setRequesterDetailsExpand] = useState(true);

	//handle submit
	const handleRequiredSubmit = () => {
		handleFormSubmit();
		handleClickOpen();
	};

	//get Number Of IDs
	const [numOfIDs, setNumOfIDs] = useState();
	const getNumberOfIDs = e => {
		setNumOfIDs(e.target.value);
	};

	if (!codeTablesInitialized) {
		return <Loading />;
	}
	const errorIconStyled = textField => {
		switch (textField) {
			case 'wlh_id':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>Enter the number of WLH IDs.</span>
					</Stack>
				);
				break;
			case 'wlh_id_value':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>Please enter a number between 1 - 100.</span>
					</Stack>
				);
				break;
			case 'year':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>Enter the year.</span>
					</Stack>
				);
				break;
			case 'year_value':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>Please enter a number between 2020 - 2099.</span>
					</Stack>
				);
				break;
			case 'purpose':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>Select the purpose.</span>
					</Stack>
				);
				break;
			case 'status':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>Select the status.</span>
					</Stack>
				);
				break;
			case 'firstName':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>Enter the first name.</span>
					</Stack>
				);
				break;
			case 'firstName_value':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>The first name must be at least 2 characters long.</span>
					</Stack>
				);
				break;
			case 'lastName':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>Enter the last name.</span>
					</Stack>
				);
				break;
			case 'lastName_value':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>The last name must be at least 2 characters long.</span>
					</Stack>
				);
				break;
			case 'phone':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>The phone format is (---)--- ----.</span>
					</Stack>
				);
				break;
			case 'email':
				return (
					<Stack direction="row" alignItems="center">
						<PriorityHighIcon sx={{fontSize: '14px'}} color="error" />
						<span>Invalid email address.</span>
					</Stack>
				);
				break;
		}
	};

	return (
		<Box className="generate_container">
			<Typography className="generate_headline">Generate WLH ID</Typography>
			<Typography className="generate_subtitle">Generate one or multiple WLH IDs by entering the information below.</Typography>
			<Paper sx={paperStyle}>
				<form onSubmit={handleSubmit(handleRequiredSubmit)}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<TwoColumnForm title={'WLH ID information'}>
							<TextField
								className="generate_textfield"
								id="wlh_id"
								name="wlh_id"
								label="Number of WLH IDs*"
								inputProps={{maxLength: 3}}
								{...register('wlh_id', {
									// required: errorIconStyled('wlh_id'),
									required: '❗Enter the number of WLH IDs.',
									min: {
										value: 1,
										// message: errorIconStyled('wlh_id_value')
										message: '❗Please enter a number between 1 - 100.'
									},
									max: {
										value: 100,
										// message: errorIconStyled('wlh_id_value')
										message: '❗Please enter a number between 1 - 100.'
									},
									pattern: {
										value: /^([0-9]{0,3})$/,
										// message: errorIconStyled('wlh_id_value')
										message: '❗Please enter a number between 1 - 100.'
									},
									onChange(e) {
										getNumberOfIDs(e);
									}
								})}
								error={!!errors?.wlh_id}
								helperText={errors.wlh_id ? errors.wlh_id.message : ''}
							/>
							<DatePicker
								views={['year']}
								label="Year*"
								value={year}
								minDate={new Date(2020, 1, 1)}
								maxDate={new Date(2099, 1, 1)}
								onError={(e, value) => {
									switch (e) {
										case 'minDate':
										case 'invalidDate':
										case 'maxDate':
											setYearSelectError('❗Please enter a number between 2020 - 2099.');
											break;
										case null:
											setYearSelectError(null);
											break;
									}
								}}
								onChange={y => {
									if (y) {
										setYear(y);
									}
								}}
								components={{
									OpenPickerIcon: ArrowDropDownIcon
								}}
								renderInput={params => (
									<TextField 
									className="generate_textfield" 
									name="year"
									error={!!errors?.yearSelectError} 
									helperText={yearSelectError} {...params} />
								)}
							/>

							<TextField
								className="generate_textfield"
								id="purpose"
								name="purpose"
								label="Purpose*"
								select
								{...register('purpose', {
									required: '❗Select the purpose.'
								})}
								error={!!errors?.purpose}
								helperText={errors.purpose ? errors.purpose.message : null}
								onChange={handleUpdate}
								onSelect={handleUpdate}
							>
								{purposes.codes.map(m => (
									<MenuItem key={m.value} value={m.value} selected={formState.purpose === m.value}>
										{m.displayed_value}
									</MenuItem>
								))}
							</TextField>

							<TextField
								className="generate_textfield"
								label="Species"
								id="species"
								defaultValue={formState.species}
								name="species"
								onChange={handleUpdate}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<AccountTreeOutlinedIcon />
										</InputAdornment>
									)
								}}
							/>
							<TextField
								className="generate_textfield"
								label="Associated Project"
								id="associatedProject"
								defaultValue={formState.associatedProject}
								name="associatedProject"
								onChange={handleUpdate}
							/>

							<TextField className="generate_textfield" label="Home Region" id="homeRegion" name="homeRegion" select onChange={handleUpdate}>
								{regions.codes.map(m => (
									<MenuItem key={m.value} value={m.value} selected={formState.homeRegion === m.value}>
										{m.displayed_value}
									</MenuItem>
								))}
							</TextField>

							<TextField
								className="generate_textfield"
								id="status"
								label="WLH ID Status*"
								name="status"
								select
								{...register('status', {
									// required: errorIconStyled('status')
									required:'❗Select the status.'
								})}
								error={!!errors?.status}
								helperText={errors.status ? errors.status.message : null}
								onChange={e => {
									setFormState({
										...formState,
										status: e.target.value
									});
								}}
							>
								{status.codes.map(m => (
									<MenuItem key={m.value} value={m.value}>
										{m.displayed_value}
									</MenuItem>
								))}
							</TextField>
						</TwoColumnForm>
					</LocalizationProvider>

					<TextField className="project_details" label="Project Details" multiline rows={3} onChange={handleUpdate} />

					<TwoColumnForm title={'Requester'}>
						<TextField
							className="generate_textfield"
							label="First Name*"
							id="firstName"
							name="firstName"
							{...register('firstName', {
								required: '❗Enter the first name.',
								// required: errorIconStyled('firstName'),
								pattern: {
									value: /^[\w-]{2,}$/,
									message: '❗The first name must be at least 2 characters long.'
									// message: errorIconStyled('firstName_value')
								}
							})}
							error={!!errors?.firstName}
							helperText={errors.firstName ? errors.firstName.message : null}
						/>

						<TextField
							className="generate_textfield"
							label="Last Name*"
							id="lastName"
							name="lastName"
							{...register('lastName', {
								required: '❗Enter the last name.',
								// required: errorIconStyled('lastName'),
								pattern: {
									value: /^[\w-]{2,}$/,
									message: '❗The last name must be at least 2 characters long.'
									// message: errorIconStyled('lastName_value')
								}
							})}
							error={!!errors?.lastName}
							helperText={errors.lastName ? errors.lastName.message : null}
						/>
					</TwoColumnForm>

					{RequesterDetailsExpand ? (
						<TwoColumnForm title={'Requester details'}>
							<TextField
								className="generate_textfield"
								select
								label="Region"
								id="requesterRegion"
								placeholder="Region"
								onSelect={handleUpdate}
								onChange={handleUpdate}
							>
								{regions.codes.map(m => (
									<MenuItem key={m.value} value={m.value} selected={formState.requesterRegion === m.value}>
										{m.displayed_value}
									</MenuItem>
								))}
							</TextField>
							<TextField
								className="generate_textfield"
								select
								label="Organization"
								id="requesterOrganization"
								placeholder="Organization"
								onSelect={handleUpdate}
							>
								{organizations.codes.map(m => (
									<MenuItem key={m.value} value={m.value} selected={formState.requesterOrganization === m.value}>
										{m.displayed_value}
									</MenuItem>
								))}
							</TextField>
							<TextField
								className="generate_textfield"
								label="Phone Number"
								placeholder="(---) --- ----"
								id="phone"
								name="phone"
								type='tel'
								defaultValue={formState.phone}
								{...register('phone', {
									pattern: {
										value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
										message: '❗The phone format is (---)--- ----.'
									}
								})}
								error={!!errors?.phone}
								helperText={errors.phone ? errors.phone.message : null}
							/>
							<TextField
								className="generate_textfield"
								label="Email"
								id="email"
								name="email"
								type='email'
								{...register('email', {
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: '❗Invalid email address.'
									}
								})}
								error={!!errors?.email}
								helperText={errors.email ? errors.email.message : null}
							/>
							<TextField className="generate_textfield" select label="Requester's Role" id="requesterRole" placeholder="Role" onSelect={handleUpdate}>
								{roles.codes.map(m => (
									<MenuItem key={m.value} value={m.value} selected={formState.requesterRole === m.value}>
										{m.displayed_value}
									</MenuItem>
								))}
							</TextField>
						</TwoColumnForm>
					) : (
						''
					)}

					<Button
						className="requester_details_btn"
						variant="outlined"
						onClick={() => {
							setRequesterDetailsExpand(!RequesterDetailsExpand);
						}}
					>
						{RequesterDetailsExpand ? 'Hide Requester Details' : 'Show Requester Details'}
					</Button>

					<ConfirmDialog openGenerateDialog={openGenerateDialog} handleClose={handleClose} navigate={navigate} numOfIDs={numOfIDs} />
					<CancelDialog openCancelDialog={openCancelDialog} handleClose={handleClose} navigate={navigate} setCancelDialog={setCancelDialog} />

					<Stack margin={'48px 125px 88px 0'} spacing={1} direction={'row'} justifyContent={'flex-end'}>
						<GenerationLockWidget />
						<Button type="submit" className="generate_submit_btn" variant={'contained'}>
							Generate
						</Button>
						<Button
							className="generate_submit_btn"
							variant={'outlined'}
							onClick={() => {
								setCancelDialog(true);
							}}
						>
							Cancel
						</Button>
					</Stack>
				</form>
			</Paper>
		</Box>
	);
};

export default Generate;
