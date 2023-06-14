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
import ConfirmGenerationDialog from '../../components/wildlifeIds/generate/GenerationSuccessDialog';
import CancelDialog from '../../components/util/CancelDialog';
import ValidationError from '../../components/util/ValidationError';
import TaxonomySearch from '../../components/util/TaxonomySearch';
import Debug from '../../components/util/Debug';
import {useDispatch} from 'react-redux';
import {WILDLIFE_HEALTH_ID_GENERATE_REQUEST} from '../../../state/actions';
import GenerationFailureDialog from '../../components/wildlifeIds/generate/GenerationFailureDialog';
import ContactAutofill from "../../components/contact/ContactAutofill";
import ContactDisplay from "../../components/contact/ContactDisplay";
import NewContactComponent from "../../components/contact/NewContactComponent";

const Generate: React.FC = () => {
	const {purpose: purposes, region: regions} = useSelector(state => state.CodeTables.tables);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {initialized: codeTablesInitialized} = useSelector(selectCodeTables);
	const {generate: generationState} = useSelector(state => state.WildlifeHealthId);
	const [generationSerial, setGenerationSerial] = useState(null);
	const [generationResult, setGenerationResult] = useState(null);
	const [working, setWorking] = useState(false);

	useEffect(() => {
		if (generationSerial === null) {
			setGenerationResult(null);
			setWorking(false);
			return;
		}

		const foundGenerationRequest = generationState.find(p => p.serial === generationSerial);
		if (foundGenerationRequest == null) {
			return;
		}

		if (working && !foundGenerationRequest.working) {
			// we were working and now we're not. check result
			setWorking(false);

			if (foundGenerationRequest.error) {
				setOpenFailureDialog(true);
			} else {
				setGenerationResult(foundGenerationRequest.data);
				setOpenOpenSuccessDialog(true);
			}
		}
	}, [generationSerial, generationState]);

	const validInitialStatuses = ['UNASSIGNED', 'ASSIGNED'];

	const [formState, setFormState] = useState({
		species: null,
		region: '',
		projectDetail: '',
		purpose: '',
		status: '',
		requester: null,
		project: '',
		selectedDate: null
	});

	const [generationRequest, setGenerationRequest] = useState(null);
	useEffect(() => {
		setGenerationRequest({
			quantity: parseInt(idQuantity),
			year: formState.selectedDate ? formState.selectedDate.getFullYear() : null,
			purpose: formState.purpose,
			species: formState.species?.id ? parseInt(formState.species.id) : null,
			project: formState.project,
			region: formState.region,
			initialStatus: formState.status,
			projectDetail: formState.projectDetail,
			requester: formState.requester?.id || null
		});
	}, [formState]);

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
	const [openSuccessDialog, setOpenOpenSuccessDialog] = useState(false);
	const [openFailureDialog, setOpenFailureDialog] = useState(false);
	const [openCancelDialog, setCancelDialog] = useState(false);

	const handleClose = () => {
		setOpenOpenSuccessDialog(false);
		setCancelDialog(false);
		setOpenFailureDialog(false);
	};

	//handle update
	const handleUpdate = event => {
		setFormState({
			...formState,
			[event.target.name]: event.target.value
		});
	};

	//handle submit
	const handleRequiredSubmit = () => {
		if (yearSelectError || formState.selectedDate === null) {
			setYearSelectError('Year is a required field.');
			return;
		}

		const serial = `gen-${new Date().getTime()}`;

		setGenerationSerial(serial);
		setWorking(true);

		dispatch({
			type: WILDLIFE_HEALTH_ID_GENERATE_REQUEST,
			payload: {
				serial,
				request: generationRequest
			}
		});
	};

	//get Number Of IDs
	const [idQuantity, setIdQuantity] = useState(null);

	if (!codeTablesInitialized) {
		return <Loading/>;
	}

	return (
		<Box className="generate_container">
			<Typography variant="h1">Generate WLH ID</Typography>
			<Typography variant="h6" className={'subtitle'}>
				Generate one or multiple WLH IDs by entering the information below.
			</Typography>

			<Paper className={'generation_paper'}>
				<form onSubmit={handleSubmit(handleRequiredSubmit)}>
					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<Grid container columns={{xs: 4, md: 12}} spacing={4}>
							<Grid item xs={12} md={12}>
								<Typography variant={'h3'}>{'WLH ID Information'}</Typography>
							</Grid>
							<Grid item xs={12} md={6}>
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
												setIdQuantity(e.target.value);
											}
										})}
										error={!!errors?.wlh_id}
									/>
									<ValidationError hidden={!errors?.wlh_id} message={errors.wlh_id?.message}/>
								</FormGroup>
							</Grid>

							<Grid item xs={12} md={6}>
								<FormGroup>
									<DatePicker
										views={['year']}
										label="Year*"
										value={formState.selectedDate}
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
										onChange={d => {
											if (d) {
												setFormState({...formState, selectedDate: d});
											}
										}}
										components={{
											OpenPickerIcon: ArrowDropDownIcon
										}}
										renderInput={params => <TextField {...params} className="generate_textfield" name="year" error={yearSelectError !== null}/>}
									/>
									<ValidationError hidden={yearSelectError == null} message={yearSelectError}/>
								</FormGroup>
							</Grid>

							<Grid item xs={12} md={6}>
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
											<MenuItem key={m.code} value={m.code}>
												{m.name}
											</MenuItem>
										))}
									</TextField>
									<ValidationError hidden={!errors?.purpose} message={errors?.purpose?.message}/>
								</FormGroup>
							</Grid>

							<Grid item xs={12} md={6}>
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
										{validInitialStatuses.map(m => (
											<MenuItem key={m} value={m}>
												{m}
											</MenuItem>
										))}
									</TextField>
									<ValidationError hidden={!errors?.status} message={errors.status?.message}/>
								</FormGroup>
							</Grid>

							<Grid item xs={12} md={6}>
								<FormGroup>
									<TextField label="Home Region" id="region" name="region" select onChange={handleUpdate} value={formState.region}>
										{regions.codes.map(m => (
											<MenuItem key={m.code} value={m.code}>
												{m.name}
											</MenuItem>
										))}
									</TextField>
								</FormGroup>
							</Grid>

							<Grid item xs={4} md={12}>
								<FormGroup>
									<TaxonomySearch className="species" value={formState.species} onValueChange={v => {
										setFormState({...formState, species: v})
									}}/>
								</FormGroup>
							</Grid>


							<Grid item xs={3} md={9}>
								<FormGroup>
									<ContactAutofill className="contact" label='Requester' value={formState.requester}
																	 onValueChange={v => {
																		 setFormState({...formState, requester: v});
																	 }}/>
								</FormGroup>
							</Grid>

							<Grid item xs={1} md={3}>
								<NewContactComponent createHandler={(contact) => {
									setFormState({
										...formState, requester: {
											...contact,
											label: "New Contact"
										}
									});
								}
								}/>
							</Grid>

							{formState.requester && <Grid item xs={12} sx={{overflow: 'auto'}}><ContactDisplay contact={formState.requester.document}/></Grid>}

							<Grid item xs={12} md={12}>
								<FormGroup>
									<TextField label="Associated Project" id="project" value={formState.project} name="project" onChange={handleUpdate}/>
								</FormGroup>
							</Grid>

							<Grid item xs={12} md={12}>
								<FormGroup>
									<TextField label="Project Details" name="projectDetail" value={formState.projectDetail} multiline rows={3} onChange={handleUpdate}/>
								</FormGroup>
							</Grid>

							<ConfirmGenerationDialog open={openSuccessDialog} handleClose={handleClose} createdIDs={generationResult}/>

							<GenerationFailureDialog open={openFailureDialog} handleClose={handleClose}/>

							<CancelDialog
								open={openCancelDialog}
								close={handleClose}
								acceptAction={() => {
									navigate('/wildlifeIds/');
								}}
								title={'Cancel WLH ID Generation'}
								content={'Are you sure you want to cancel? Changes you have made will not be saved.'}
							/>

							<Grid item xs={12} md={12}>
								<Stack direction={'row'} spacing={1} justifyContent={'flex-end'}>
									<GenerationLockWidget/>
									<Button type="submit" className="generate_submit_btn" variant={'contained'} disabled={working}>
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

							<Debug item={formState}></Debug>
							<Debug item={generationRequest}></Debug>
						</Grid>
					</LocalizationProvider>
				</form>
			</Paper>
		</Box>
	);
};

export default Generate;
