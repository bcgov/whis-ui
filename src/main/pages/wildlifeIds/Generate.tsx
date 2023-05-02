import React, {useEffect, useState} from 'react';
import GenerationLockWidget from '../../components/wildlifeIds/generate/GenerationLockWidget';
import {useAPI} from '../../hooks/useAPI';
import {Box, Button, FormGroup, Grid, MenuItem, Paper, Stack, TextField, Typography} from '@mui/material';
import '../../styles/inventory.scss';
import {useSelector} from '../../../state/utilities/use_selector';
import {useNavigate} from 'react-router-dom';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {selectCodeTables} from '../../../state/reducers/code_tables';
import Loading from '../../components/util/Loading';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {useForm} from 'react-hook-form';
import ConfirmGenerationDialog from '../../components/wildlifeIds/generate/ConfirmGenerationDialog';
import CancelDialog from '../../components/util/CancelDialog';
import ValidationError from '../../components/util/ValidationError';
import TaxonomySearch from "../../components/util/TaxonomySearch";

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
		year: null,
		species: '',
		homeRegion: '',
		projectDetail: '',
		purpose: '',
		organization: '',
		status: '',
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
		formState: {errors},
		clearErrors
	} = useForm({mode: 'onChange'});

	//year picker
	const [yearSelectError, setYearSelectError] = React.useState<string | null>(null);

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

	const handleFormSubmit = () => {
		if (yearSelectError || formState.year === null) {
			setYearSelectError('Year is a required field.');
			return;
		}

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
		setFormState({
			...formState,
			[event.target.name]: event.target.value
		});
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
		return <Loading/>;
	}

	return (
		<Box className="generate_container">
			<Typography variant={'h1'}>Generate WLH ID</Typography>
			<Typography variant={'h5'} className={'subtitle'}>Generate one or multiple WLH IDs by entering the information below.</Typography>
			<Paper className={'generation_paper'}>
				<form onSubmit={handleSubmit(handleRequiredSubmit)}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>

						<Grid container spacing={4}>


							<Grid item xs={12}>
								<Typography variant={'h3'}>{'WLH ID Information'}</Typography>
							</Grid>


							<Grid item xs={6}>
								<FormGroup>
									<TextField
										className="generate_textfield"
										id="wlh_id"
										name="wlh_id"
										label="Number of WLH IDs*"
										inputProps={{maxLength: 3}}
										{...register('wlh_id', {
											required: 'Enter the number of WLH IDs.',
											min: {
												value: 1,
												message: 'Please enter a number between 1 - 100.'
											},
											max: {
												value: 100,
												message: 'Please enter a number between 1 - 100.'
											},
											pattern: {
												value: /^([0-9]{0,3})$/,
												message: 'Please enter a number between 1 - 100.'
											},
											onChange(e) {
												getNumberOfIDs(e);
											}
										})}
										error={!!errors?.wlh_id}
									/>
									<ValidationError hidden={!errors?.wlh_id} message={errors.wlh_id?.message}/>
								</FormGroup>
							</Grid>

							<Grid item xs={6}>
								<FormGroup>
									<DatePicker
										views={['year']}
										label="Year*"
										value={formState.year}
										minDate={new Date(2020, 0, 1)}
										maxDate={new Date(2099, 0, 1)}
										onError={(e, value) => {
											switch (e) {
											case 'minDate':
											case 'invalidDate':
											case 'maxDate':
												setYearSelectError('Please enter a number between 2020 - 2099.');
												break;
											case null:
												setYearSelectError(null);
												break;
											}
										}}
										onChange={year => {
											if (year) {
												setFormState({...formState, year});
											}
										}}
										components={{
											OpenPickerIcon: ArrowDropDownIcon
										}}
										renderInput={params => <TextField  {...params} className="generate_textfield" name="year" error={yearSelectError !== null}/>}
									/>
									<ValidationError hidden={yearSelectError == null} message={yearSelectError}/>
								</FormGroup>
							</Grid>

							<Grid item xs={6}>
								<FormGroup>
									<TextField
										className="generate_textfield"
										id="purpose"
										name="purpose"
										label="Purpose*"
										select
										{...register('purpose', {
											required: 'Select the purpose.'
										})}
										error={!!errors?.purpose}
										onChange={e => {
											handleUpdate(e);
											clearErrors('purpose');
										}}
										value={formState.purpose}
									>
										{purposes.codes.map(m => (
											<MenuItem key={m.value} value={m.value}>
												{m.displayed_value}
											</MenuItem>
										))}
									</TextField>
									<ValidationError hidden={!errors?.purpose} message={errors?.purpose?.message}/>
								</FormGroup>
							</Grid>

							<Grid item xs={6}>
								<FormGroup>
									<TextField
										className="generate_textfield"
										id="status"
										label="WLH ID Status*"
										name="status"
										select
										value={formState.status}
										{...register('status', {
											required: 'Select the status.'
										})}
										error={!!errors?.status}
										onChange={e => {
											handleUpdate(e);
											clearErrors('status');
										}}
									>
										{status.codes.map(m => (
											<MenuItem key={m.value} value={m.value}>
												{m.displayed_value}
											</MenuItem>
										))}
									</TextField>
									<ValidationError hidden={!errors?.status} message={errors.status?.message}/>
								</FormGroup>
							</Grid>

							<Grid item xs={6}>
								<FormGroup>
									<TextField
										className="generate_textfield"
										label="Home Region"
										id="homeRegion"
										name="homeRegion"
										select
										onChange={handleUpdate}
										value={formState.homeRegion}
									>
										{regions.codes.map(m => (
											<MenuItem key={m.value} value={m.value}>
												{m.displayed_value}
											</MenuItem>
										))}
									</TextField>
								</FormGroup>

							</Grid>

							<Grid item xs={12}>

								<FormGroup>
									<TaxonomySearch
										className="species"
										value={formState.species}
										onValueChange={v => (setFormState({...formState, species: v}))}
									/>
								</FormGroup>
							</Grid>
							<Grid item xs={12}>
								<FormGroup>
									<TextField
										className="associated_proj"
										label="Associated Project"
										id="associatedProject"
										value={formState.associatedProject}
										name="associatedProject"
										onChange={handleUpdate}
									/>
								</FormGroup>
							</Grid>

							<Grid item xs={12}>
								<FormGroup>
									<TextField className="project_details" label="Project Details" multiline rows={3} onChange={handleUpdate}/>
								</FormGroup>
							</Grid>

							<Grid item xs={12}><Typography variant={'h3'}>Requester</Typography>
							</Grid>

							<Grid item xs={6}> <FormGroup>
								<TextField
									className="generate_textfield"
									label="First Name*"
									id="requesterFirstName"
									name="requesterFirstName"
									{...register('requesterFirstName', {
										required: 'Enter the first name.',
										pattern: {
											value: /^[\w- ]{2,}$/,
											message: 'The first name must be at least 2 characters long.'
										},
										onChange: handleUpdate
									})}
									error={!!errors?.requesterFirstName}
								/>
								<ValidationError hidden={!errors?.requesterFirstName} message={errors.requesterFirstName?.message}/>
							</FormGroup>
							</Grid>
							<Grid item xs={6}> <FormGroup>
								<TextField
									className="generate_textfield"
									label="Last Name*"
									id="requesterLastName"
									name="requesterLastName"
									{...register('requesterLastName', {
										required: 'Enter the last name.',
										pattern: {
											value: /^[\w- ]{2,}$/,
											message: 'The last name must be at least 2 characters long.'
										},
										onChange: handleUpdate
									})}
									error={!!errors?.requesterLastName}
								/>
								<ValidationError hidden={!errors?.requesterLastName} message={errors.requesterLastName?.message}/>
							</FormGroup>
							</Grid>

							{RequesterDetailsExpand ? (
								<>
									<Grid item xs={12}>
										<Typography variant={'h3'}>Requester Details</Typography>
									</Grid>
									<Grid item xs={6}>
										<FormGroup>
											<TextField
												className="generate_textfield"
												select
												label="Region"
												id="requesterRegion"
												name="requesterRegion"
												placeholder="Region"
												onChange={handleUpdate}
												value={formState.requesterRegion}
											>
												{regions.codes.map(m => (
													<MenuItem key={m.value} value={m.value}>
														{m.displayed_value}
													</MenuItem>
												))}
											</TextField>
										</FormGroup>
									</Grid>
									<Grid item xs={6}>
										<FormGroup>
											<TextField
												className="generate_textfield"
												select
												label="Organization"
												id="requesterOrganization"
												name="requesterOrganization"
												placeholder="Organization"
												onChange={handleUpdate}
												value={formState.requesterOrganization}
											>
												{organizations.codes.map(m => (
													<MenuItem key={m.value} value={m.value}>
														{m.displayed_value}
													</MenuItem>
												))}
											</TextField>
										</FormGroup>
									</Grid>
									<Grid item xs={6}>
										<FormGroup>
											<TextField
												className="generate_textfield"
												label="Phone Number"
												placeholder="(---) --- ----"
												id="requesterContactPhone"
												name="requesterContactPhone"
												value={formState.requesterContactPhone}
												type="tel"
												{...register('requesterContactPhone', {
													pattern: {
														value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
														message: 'The phone format is (---)--- ----.'
													},
													onChange: handleUpdate
												})}
												error={!!errors?.requesterContactPhone}
											/>
											<ValidationError hidden={!errors?.requesterContactPhone} message={errors.requesterContactPhone?.message}/>
										</FormGroup>
									</Grid>
									<Grid item xs={6}>
										<FormGroup>
											<TextField
												className="generate_textfield"
												label="Email"
												id="requesterContactEmail"
												name="requesterContactEmail"
												type="email"
												{...register('requesterContactEmail', {
													pattern: {
														value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
														message: 'Invalid email address.'
													},
													onChange: handleUpdate
												})}
												error={!!errors?.requesterContactEmail}
											/>
											<ValidationError hidden={!errors?.requesterContactEmail} message={errors.requesterContactEmail?.message}/>
										</FormGroup>
									</Grid>
									<Grid item xs={6}>
										<FormGroup>
											<TextField
												className="generate_textfield"
												select
												label="Requester's Role"
												id="requesterRole"
												name="requesterRole"
												placeholder="Role"
												onChange={handleUpdate}
												value={formState.requesterRole}
											>
												{roles.codes.map(m => (
													<MenuItem key={m.value} value={m.value} selected={formState.requesterRole === m.value}>
														{m.displayed_value}
													</MenuItem>
												))}
											</TextField>
										</FormGroup>
									</Grid>
								</>
							) : ''}

							<Grid item xs={12}>
								<Button
									className="requester_details_btn"
									variant="outlined"
									onClick={() => {
										setRequesterDetailsExpand(!RequesterDetailsExpand);
									}}
								>
									{RequesterDetailsExpand ? 'Hide Requester Details' : 'Show Requester Details'}
								</Button>

							</Grid>

							<Grid item xs={12}>

							</Grid>

							<ConfirmGenerationDialog openGenerateDialog={openGenerateDialog} handleClose={handleClose} navigate={navigate} numOfIDs={numOfIDs}/>
							<CancelDialog
								open={openCancelDialog}
								close={handleClose}
								acceptAction={() => {
									navigate('/wildlifeIds/');
								}}
								title={'Cancel WLH ID Generation'}
								content={'Are you sure you want to cancel? Changes you have made will not be saved.'}
							/>

							<Grid item xs={12}>
								<Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
									<GenerationLockWidget/>
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
							</Grid>
						</Grid>
					</LocalizationProvider>
				</form>
			</Paper>
		</Box>
	);
};

export default Generate;
