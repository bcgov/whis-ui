import React, { useEffect, useState } from 'react';
import GenerationLockWidget from "../../components/wildlifeIds/GenerationLockWidget";
import { useAPI } from "../../hooks/useAPI";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	InputAdornment,
	MenuItem,
	Paper,
	Stack,
	TextField,
	Typography
} from "@mui/material";
import '../../styles/inventory.scss';
import AddIcon from '@mui/icons-material/Add';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import { useSelector } from "../../../state/utilities/use_selector";
import { useNavigate } from "react-router-dom";
import TwoColumnForm from "../../components/wildlifeIds/TwoColumnForm";
import { paperStyle } from "../../../state/style_constants";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { selectCodeTables } from "../../../state/reducers/code_tables";
import Loading from "../../components/util/Loading";
import { LockModal } from "../../components/wildlifeIds/LockModal";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller, useForm } from "react-hook-form";

const Generate: React.FC = () => {

	const me = useSelector(state => state.Auth);
	const { purposes, regions, organizations, roles } = useSelector(state => state.CodeTables.tables);
	const { initialized: codeTablesInitialized } = useSelector(selectCodeTables);

	const api = useAPI();

	const navigate = useNavigate();
	const lockStatus = useSelector(state => state.GenerationLock);
	const [lockModalOpen, setLockModalOpen] = useState(false);

	useEffect(() => {
		if (lockStatus.initialized
			&& !lockStatus.working
			&& lockStatus.status
			&& lockStatus.status.lockHolder
			&& !lockStatus.status.lockHolder.isSelf) {
			setLockModalOpen(true);
		}
	}, [lockStatus, lockStatus.initialized, lockStatus.working]);

	const [generateStatus, setGenerateStatus] = useState({ status: 'not yet called', message: '' })

	const [formState, setFormState] = useState({
		quantity: 1,
		year: '2022',
		species: '',
		homeRegion: '',
		projectDetail: '',
		requesterFirstName: me.firstName,
		requesterLastName: me.lastName,
		requesterContactEmail: me.email,
		requesterContactPhone: '',
		requesterRegion: '',
		requesterOrganization: '',
		requesterRole: me.roles[0],
		associatedProject: '',
		reason: '',
		phone: ''
	});

	//handle form error
	const { register, handleSubmit, control, formState: { errors } } = useForm({ mode: "onChange" });


	//year picker
	const [year, setYear] = React.useState<Date | null>(null);
	const [value, setValue] = React.useState<Date | null>(null);

	//update dialog
	const [openGenerateDialog, setGenerateDialog] = useState(false);
	const [openCancelDialog, setCancelDialog] = useState(false);
	const handleClickOpen = () => {
		setGenerateDialog(true);
	};
	const handleClose = () => {
		// setAlertNumber(false);
		setGenerateDialog(false);
		setCancelDialog(false);
	};

	//handle direct
	const handleFormSubmit = () => {
		api.generateIDs({ quantity: formState.quantity }).then(result => {
			setGenerateStatus({
				status: 'ok',
				message: JSON.stringify(result)
			});
		}).catch(err => {
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
		setFormState(currentState);
		console.log(event.target.name + ":" + event.target.value);

	};

	const [showOptional, setShowOptional] = useState(false);
	const [OptionalButton, setOptionalButton] = useState(true);

	//handle submit
	const handleRequiredSubmit = () => {
		handleFormSubmit();
		handleClickOpen();
	};

	//get Number Of IDs
	const [numOfIDs, setNumOfIDs] = useState();
	const getNumberOfIDs = (e) => {
		setNumOfIDs(e.target.value);
	}

	if (!codeTablesInitialized) {
		return (<Loading />);
	}

	return (
		<>
			<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '32px' }}>Generate WLH ID</Typography>
			<Typography sx={{ marginBottom: '28px', fontSize: '16px', color: '#787f81' }}>Generate one or multiple WLH IDs by entering the information below.</Typography>

			<Paper sx={paperStyle}>
				{/* <LockModal open={lockModalOpen} /> */}
				{/* <form onSubmit={handleRequiredSubmit}> */}
				<form onSubmit={handleSubmit(handleRequiredSubmit)}>

					<LocalizationProvider dateAdapter={AdapterDateFns}>
						<TwoColumnForm title={'WLH ID information'}>
							<TextField
								sx={{ width: '100%' }}
								id="wlh_id"
								name="wlh_id"
								label="Number of WLH IDs*"
								type="tel"

								{...register("wlh_id", {
									required: "❗Enter the number of WLH IDs.",
									min: {
										value: 1,
										message: '❗Please enter a number between 1 - 100.'
									},
									max: {
										value: 100,
										message: '❗Please enter a number between 1 - 100.'
									},
									pattern: {
										value: /^([0-9]{0,3})$/,
										message: '❗Please enter a number between 1 - 100.',
									},
									onChange(e) {
										getNumberOfIDs(e);
									},
								})}
								error={!!errors?.wlh_id}
								helperText={errors.wlh_id ? errors.wlh_id.message : null}

							/>
							<DatePicker
								views={['year']}
								label="Year*"
								value={year}
								onChange={(y) => {
									setYear(y);
								}}
								components={{
									OpenPickerIcon: ArrowDropDownIcon
								}}
								renderInput={(params) => (
									<TextField {...params}
										sx={{ width: '100%' }}
										name="year"
										{...register("year", {
											required: "❗Enter the year.",
											min: {
												value: 1900,
												message: '❗Please enter a number between 1900 - 2099.'
											},
											max: {
												value: 2099,
												message: '❗Please enter a number between 1900 - 2099.'
											},

										})}
										error={!!errors?.year}
										helperText={errors.year ? errors.year.message : null}
									/>
								)}
							/>
							<>
								<TextField sx={{ width: '100%' }}
									id="purpose"
									label="Purpose*"
									name="purpose"
									select
									{...register("purpose", {
										required: "❗Select the purpose.",

									})}
									error={!!errors?.purpose}
									helperText={errors.purpose ? errors.purpose.message : null}
								>
									{purposes.codes.map((m, i) => (
										<MenuItem key={i} value={m.value}>
											{m.displayed_value}
										</MenuItem>
									))}
								</TextField>
							</>

							<TextField sx={{ width: '100%' }} label="Species"
								id="species"
								defaultValue={formState.species}
								name="species"
								onChange={handleUpdate}
								InputProps={{
									endAdornment: <InputAdornment position="end"><AccountTreeOutlinedIcon /></InputAdornment>,
								}}
							/>
							<TextField sx={{ width: '100%' }}
								label="Associated Project"
								id="associatedProject"
								defaultValue={formState.associatedProject}
								name="associatedProject"
								onChange={handleUpdate}
							/>

							<TextField sx={{ width: '100%' }}
								label="Home Region"
								id="homeRegion"
								// defaultValue={formState.reason}
								name="homeRegion"
								onChange={handleUpdate}
							/>

						</TwoColumnForm>
					</LocalizationProvider>

					<TwoColumnForm title={'Requester'}>

						<TextField
							sx={{ width: '100%' }}
							label="First Name*"
							id="firstName"
							name="firstName"
							{...register("firstName", {
								required: "❗Enter the first name.",
								pattern: {
									value: /^[a-zA-Z]{10,}$/,
									message: '❗The fisrt name is at least 10 charachters long.',
								},
							})}
							error={!!errors?.firstName}
							helperText={errors.firstName ? errors.firstName.message : null}
						/>

						<TextField
							sx={{ width: '100%' }}
							label="Last Name*"
							id="lastName"
							name="lastName"
							{...register("lastName", {
								required: "❗Enter the last name.",
								pattern: {
									value: /^[a-zA-Z]{10,}$/,
									message: '❗The last name is at least 10 charachters long.',
								},

							})}
							error={!!errors?.lastName}
							helperText={errors.lastName ? errors.lastName.message : null}
						/>
					</TwoColumnForm>

					<TextField sx={{ minWidth: '1078px', marginInline: '145px', marginTop: '32px' }}
						label="Project Detail"
						id="projectDetail"
						name="projectDetail"
						multiline
						rows={3}
						onChange={handleUpdate}
					/>
					<Box sx={{ display: showOptional ? 'auto' : 'none' }}>
						<TwoColumnForm title={'Requester details'}>
							<TextField
								sx={{ width: '100%' }}
								select
								label="Region"
								id="requesterRegion"
								placeholder='Region'
								onChange={handleUpdate}
							>
								{regions.codes.map((m, i) => (
									<MenuItem key={i} value={m.value}>
										{m.displayed_value}
									</MenuItem>
								))}
							</TextField>
							<TextField
								sx={{ width: '100%' }}
								select
								label="Organization"
								id="requesterOrganization"
								placeholder='Organization'
								onChange={handleUpdate}
							>
								{organizations.codes.map((m, i) => (
									<MenuItem key={i} value={m.value}>
										{m.displayed_value}
									</MenuItem>
								))}
							</TextField>
							<TextField
								sx={{ width: '100%' }}
								label="Phone Number (---) --- ---"
								id="phone"
								name="phone"
								defaultValue={formState.phone}
								{...register("phone", {
									pattern: {
										value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im,
										message: '❗The phone format is (---)--- ----.',
									},
									// validate: {
									// 	isUpper: (value) => /^[a-zA-Z]{16,}$/.test(value),
									// 	startsWithB: (value) => /^B/.test(value)
									// },

								})}
								error={!!errors?.phone}
								helperText={errors.phone ? errors.phone.message : null}
							/>
							<TextField
								sx={{ width: '100%' }}
								label="Email"
								id="email"
								name="email"
								{...register("email", {
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: '❗Invalid email address.'
									},
								})}
								error={!!errors?.email}
								helperText={errors.email ? errors.email.message : null}
							/>
							<TextField
								sx={{ width: '100%' }}
								select
								label="Requester's Role"
								id="requesterRole"
								placeholder="Role"
								onChange={handleUpdate}
							>
								{roles.codes.map((m, i) => (
									<MenuItem key={i} value={m.value}>
										{m.displayed_value}
									</MenuItem>
								))}
							</TextField>

						</TwoColumnForm>
					</Box>

					<Box sx={{ position: 'relative' }}>
						<Button
							sx={{ display: OptionalButton ? 'auto' : 'none', textTransform: 'capitalize', position: 'relative', margin: '28px 0 51px 0', left: '10.6%', fontSize: '16px' }}
							onClick={() => {
								setShowOptional(!showOptional);
								setOptionalButton(!OptionalButton);
							}} variant="outlined">
							<AddIcon color='primary' sx={{ marginRight: '8px' }} />Add Requester Details
						</Button>
						<Button
							sx={{ display: OptionalButton ? 'none' : 'auto', textTransform: 'capitalize', position: 'relative', margin: '24px 0 10px 0', left: '10.6%', fontSize: '16px' }}
							onClick={(e) => {
								setShowOptional(!showOptional);
								setOptionalButton(!OptionalButton);
								// resetDetails
								// setFormState(formState.year:'')
							}} variant="outlined">
							<DeleteForeverOutlinedIcon color='primary' sx={{ marginRight: '8px' }} />Remove Requester Details
						</Button>
					</Box>

					<Dialog
						open={openGenerateDialog}
						onClose={handleClose}
						PaperProps={{
							sx: { overflowY: 'inherit', width: '504px', height: '289px', borderRadius: '10px' }
						}}
					>
						<Box className='checkIcon'><CheckIcon sx={{ position: 'relative', top: '17px', left: '17px', fontSize: '45px', color: '#EEF2F6', }} /></Box>
						<IconButton
							onClick={handleClose}
							sx={{
								position: 'absolute',
								right: 8,
								top: 8
							}}
						>
							<CloseIcon />
						</IconButton>
						<DialogContent sx={{ margin: 'auto', padding: '0 24px', textAlign: 'center' }}>
							<p style={{ color: '#666666', fontSize: '15px' }}>You have generated {numOfIDs} WLH IDs: (range of numbers)</p>
							<p style={{ color: '#666666', fontSize: '15px', marginTop: '25px' }}>Would you like to add more details to these IDs?</p>
						</DialogContent>
						<DialogActions sx={{ margin: 'auto', marginBottom: '25px' }}>
							<Button onClick={() => {
								navigate('/wildlifeIds/edit/:id')
							}}
								sx={{
									width: '110px',
									height: '42px',
									borderRadius: '6px',
									marginRight: '10px',
									backgroundColor: 'rgb(58, 219, 118)',
									color: '#fff',
									fontSize: '16px',
									":hover": { backgroundColor: 'rgb(58, 219, 118)' }
								}}>YES</Button>
							<Button onClick={() => {
								navigate('/wildlifeIds')
							}}
								sx={{
									width: '110px',
									height: '42px',
									border: '1px solid rgb(134, 142, 150)',
									borderRadius: '6px',
									color: 'rgb(102, 102, 102)',
									fontSize: '16px',
									":hover": { backgroundColor: '#fff' }
								}}>Later</Button>
						</DialogActions>
					</Dialog>
					<Dialog
						open={openCancelDialog}
						onClose={handleClose}
						PaperProps={{
							sx: { overflowY: 'inherit', width: '504px', height: '289px', borderRadius: '10px' }
						}}
					>
						<Box className='alertIcon'><PriorityHighIcon sx={{ position: 'relative', top: '17px', left: '17px', fontSize: '45px', color: '#ffffff' }} /></Box>
						<IconButton
							onClick={handleClose}
							sx={{
								position: 'absolute',
								right: 8,
								top: 8
							}}
						>
							<CloseIcon />
						</IconButton>
						<DialogTitle sx={{ margin: '0 auto', padding: '0px', fontSize: '16px', color: '#666666' }}>Cancel WLH ID Generation</DialogTitle>
						<DialogContent sx={{ margin: 'auto', padding: '0 24px', textAlign: 'center' }}>
							<p style={{ color: '#313132', fontSize: '14px', margin: '25px 0 5px 0' }}>You have NOT generated any IDs! Are you sure you want</p>
							<p style={{ color: '#313132', fontSize: '14px', textAlign: 'left', margin: '0' }}> to leave this page?</p>
						</DialogContent>
						<DialogActions sx={{ margin: 'auto', marginBottom: '25px' }}>
							<Button onClick={() => {
								navigate('/wildlifeIds/')
							}}
								sx={{
									width: '110px',
									height: '42px',
									borderRadius: '6px',
									marginRight: '10px',
									backgroundColor: '#ffae00',
									color: '#fff',
									fontSize: '16px',
									":hover": { backgroundColor: '#ffae00' }
								}}>YES</Button>
							<Button onClick={() => { setCancelDialog(false) }}
								sx={{
									width: '110px',
									height: '42px',
									border: '1px solid rgb(134, 142, 150)',
									borderRadius: '6px',
									color: 'rgb(102, 102, 102)',
									fontSize: '16px',
									":hover": { backgroundColor: '#fff' }
								}}>NO</Button>
						</DialogActions>
					</Dialog>


					<Stack spacing={2} direction={"row"} alignItems={'flex-end'} justifyContent={'flex-end'} sx={{ paddingRight: '145px', marginBottom: '88px' }}>
						<GenerationLockWidget />
						<Button type='submit' sx={{ textTransform: 'capitalize', width: '130px' }} variant={'contained'}>Generate</Button>
						<Button
							sx={{ textTransform: 'capitalize', width: '130px' }}
							variant={'outlined'}
							onClick={() => { setCancelDialog(true) }}
						>
							Cancel
						</Button>
					</Stack>
				</form>
			</Paper>
		</>
	);
};

export default Generate;
