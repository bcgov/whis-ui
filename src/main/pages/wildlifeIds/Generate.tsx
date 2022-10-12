import React, {useEffect, useState} from 'react';
import GenerationLockWidget from "../../components/wildlifeIds/GenerationLockWidget";
import {useAPI} from "../../hooks/useAPI";
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
import {useSelector} from "../../../state/utilities/use_selector";
import {useNavigate} from "react-router-dom";
import TwoColumnForm from "../../components/wildlifeIds/TwoColumnForm";
import OneColumnForm from "../../components/wildlifeIds/OneColumnForm";
import {paperStyle} from "../../../state/style_constants";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {selectCodeTables} from "../../../state/reducers/code_tables";
import Loading from "../../components/util/Loading";
import {LockModal} from "../../components/wildlifeIds/LockModal";
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';

const Generate: React.FC = () => {

	const me = useSelector(state => state.Auth);
	const {purposes, regions, organizations, roles} = useSelector(state => state.CodeTables.tables);
	const {initialized: codeTablesInitialized} = useSelector(selectCodeTables);

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

	const [generateStatus, setGenerateStatus] = useState({status: 'not yet called', message: ''})

	const [formState, setFormState] = useState({
		quantity: 1,
		year: '2022',
		// purpose: 'PURPOSE',
		species: '',
		requesterFirstName: me.firstName,
		requesterLastName: me.lastName,
		requesterContactEmail: me.email,
		requesterContactPhone: '',
		requesterRegion: '',
		requesterOrganization: '',
		requesterRole: me.roles[0],
		associatedProject: '',
		reason: ''
	});

	//date picker
	const [value, setValue] = useState(null);

	//update dialog
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setAlertNumber(false);
		setOpen(false);
	};

	//handle direct
	const handleSubmit = () => {
		api.generateIDs({quantity: formState.quantity}).then(result => {
			setGenerateStatus({
				status: 'ok',
				message: JSON.stringify(result)
			});
			// navigate('/wildlifeIds/list');
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

	//handle submit
	const handleRequiredSubmit = (e) => {
		e.preventDefault();
		handleSubmit();
		handleClickOpen();
	};

	//id number out of range
	const handleOutofRange = (e) => {
		const idNumber = e.target.value;
		if (idNumber > 100) {
			setAlertNumber(!alertNumber);
		}
	}

	const [alertNumber, setAlertNumber] = useState(false);
	const [showOptional, setShowOptional] = useState(false);
	const [OptionalButton, setOptionalButton] = useState(true);

	//handle required input
	const inputInitState = {year: false, wlh_id: false, purpose: false, firstName: false, lastName: false};
	const [inputsState, setinputState] = useState(inputInitState);

	//handle required onblur
	const handleOnblur = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		if (value == "" || value == undefined || value == null) {
			switch (name) {
			case "year":
				setinputState(state => ({...inputsState, year: true}));
				break;
			case "wlh_id":
				setinputState(state => ({...inputsState, wlh_id: true}));
				break;
			case "purpose":
				setinputState(state => ({...inputsState, purpose: true}));
				break;
			case "requesterFirstName":
				setinputState(state => ({...inputsState, firstName: true}));
				break;
			case "requesterLastName":
				setinputState(state => ({...inputsState, lastName: true}));
				break;
			default:
				break;
			}
		} else {
			switch (name) {
			case "year":
				setinputState(state => ({...inputsState, year: false}));
				break;
			case "wlh_id":
				setinputState(state => ({...inputsState, wlh_id: false}));
				break;
			case "purpose":
				setinputState(state => ({...inputsState, purpose: false}));
				break;
			case "requesterFirstName":
				setinputState(state => ({...inputsState, firstName: false}));
				break;
			case "requesterLastName":
				setinputState(state => ({...inputsState, lastName: false}));
				break;
			default:
				break;
			}
		}
	}


	if (!codeTablesInitialized) {
		return (<Loading/>);
	}

	return (
		<Paper sx={paperStyle}>
			<LockModal open={lockModalOpen}/>

			<form onSubmit={handleRequiredSubmit}>

				<Typography fontFamily={'BCSans-Bold'} sx={{margin: '10px', fontSize: '32px'}}>Generate WLH ID</Typography>
				<Typography sx={{margin: '0 0 50px 12px'}}>Generate one or multiple WLH IDs by entering the information below.</Typography>
				<hr/>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<TwoColumnForm title={'WLH ID information'}>


						<DatePicker
							views={['year']}
							label='Year *'
							value={value}
							components={{
								OpenPickerIcon: ArrowDropDownIcon
							}}
							onChange={(newValue) => {
								setValue(newValue);
							}}
							renderInput={(params) =>
								<TextField
									sx={{width: '100%'}}
									placeholder='yyyy'
									{...params}
								/>}
						/>

						<TextField
							sx={{width: '100%'}}
							label='Number of WLH IDs'
							id='wlh_id'
							name='wlh_id'
							type='tel'
							error={inputsState.wlh_id}
							inputProps={{maxLength: 3}}
							onChange={(e) => {
								handleOutofRange(e)
							}}
							onBlur={(e) => {
								handleOnblur(e)
							}}
							required
						/>
						<>
							<TextField
								sx={{width: '100%'}}
								id='purpose'
								name='purpose'
								select
								label='Purpose'
								placeholder='Purpose*'
								error={inputsState.purpose}
								onBlur={(e) => {
									handleOnblur(e)
								}}
								required
							>
								{purposes.codes.map((m, i) => (
									<MenuItem key={i} value={m.value}>
										{m.displayed_value}
									</MenuItem>
								))}
							</TextField>
							<Dialog
								open={alertNumber} onClose={handleClose}
								PaperProps={{
									sx: {overflowY: 'inherit', width: '504px', height: '230px', borderRadius: '10px'}
								}}
							>
								<DialogTitle fontFamily={'BCSans-Bold'}>Error</DialogTitle>
								<DialogContent sx={{margin: '40px auto', fontSize: '16px'}}>
									Please enter a number between 1 - 100.
								</DialogContent>
								<DialogActions>
									<Button variant={'contained'} onClick={handleClose} sx={{width: '85px'}}>OK</Button>
									<Button variant={'outlined'} onClick={handleClose} sx={{width: '85px'}}>Cancel</Button>
								</DialogActions>
							</Dialog>
						</>

						<TextField
							sx={{width: '100%'}} label='Species'
							id='species'
							defaultValue={formState.species}
							name='species'
							onChange={handleUpdate}
							InputProps={{
								endAdornment: <InputAdornment position='end'><AccountTreeOutlinedIcon/></InputAdornment>,
							}}
						/>

					</TwoColumnForm>
				</LocalizationProvider>
				<OneColumnForm>
					<TextField
						sx={{width: '100%'}}
						label='Associated Project'
						id='associatedProject'
						defaultValue={formState.associatedProject}
						name='associatedProject'
						onChange={handleUpdate}
					/>

					<TextField
						sx={{width: '100%'}}
						label='Reason'
						id='reason'
						defaultValue={formState.reason}
						name='reason'
						multiline
						rows={3}
						onChange={handleUpdate}
					/>

				</OneColumnForm>


				<hr/>

				<TwoColumnForm title={'Requester'}>

					<TextField
						sx={{width: '100%'}}
						label='First Name'
						id='requesterFirstName'
						defaultValue={formState.requesterFirstName}
						name='requesterFirstName'
						error={inputsState.firstName}
						onBlur={(e) => {
							handleOnblur(e)
						}}
						onChange={handleUpdate}
						required
					/>

					<TextField
						sx={{width: '100%'}}
						label='Last Name'
						id='requesterLastName'
						defaultValue={formState.requesterLastName}
						name='requesterLastName'
						error={inputsState.lastName}
						onBlur={(e) => {
							handleOnblur(e)
						}}
						onChange={handleUpdate}
						required
					/>

					<TextField
						sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
						select
						label='Region'
						id='requesterRegion'
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
						sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
						select
						label='Organization'
						id='requesterOrganization'
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
						sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
						label='Phone'
						id='requesterContactPhone'
						defaultValue={formState.requesterContactPhone}
						name='requesterContactPhone'
						onChange={handleUpdate}
					/>
					<TextField
						sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
						label='Email'
						id='requesterContactEmail'
						defaultValue={formState.requesterContactEmail}
						name='requesterContactEmail'
						onChange={handleUpdate}
					/>
					<TextField
						sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
						select
						label="Requester's Role"
						id='requesterRole'
						placeholder='Role'
						onChange={handleUpdate}
					>
						{roles.codes.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.displayed_value}
							</MenuItem>
						))}
					</TextField>
				</TwoColumnForm>

				<Box sx={{position: 'relative'}}>
					<Button
						sx={{display: OptionalButton ? 'auto' : 'none', textTransform: 'capitalize', position: 'absolute', top: '-60px', left: '35.5%', fontSize: '16px'}}
						onClick={() => {
							setShowOptional(!showOptional);
							setOptionalButton(!OptionalButton);
						}} variant='outlined'
					>
						<AddIcon color='primary'/>Requester Details (Optional)
					</Button>
				</Box>

				<Dialog
					open={open}
					onClose={handleClose}
					PaperProps={{
						sx: {overflowY: 'inherit', width: '504px', height: '289px', borderRadius: '10px'}
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
						<p style={{color: '#666666', fontSize: '15px'}}>You have generated [N] WLH IDs: [number or range of numbers]</p>
						<p style={{color: '#666666', fontSize: '15px', marginTop: '25px'}}>Would you like to add more details to these IDs?</p>
					</DialogContent>
					<DialogActions sx={{margin: 'auto', marginBottom: '25px'}}>
						<Button
							onClick={() => {
								navigate('/wildlifeIds/list')
							}}
							sx={{
								width: '110px',
								height: '42px',
								borderRadius: '6px',
								marginRight: '10px',
								backgroundColor: 'rgb(58, 219, 118)',
								color: '#fff',
								fontSize: '16px',
								":hover": {backgroundColor: 'rgb(58, 219, 118)'}
							}}
						>YES</Button>
						<Button
							onClick={() => {
								navigate('/wildlifeIds')
							}}
							sx={{
								width: '110px',
								height: '42px',
								border: '1px solid rgb(134, 142, 150)',
								borderRadius: '6px',
								color: 'rgb(102, 102, 102)',
								fontSize: '16px',
								":hover": {backgroundColor: '#fff'}
							}}
						>Later</Button>
					</DialogActions>
				</Dialog>


				<hr style={{'marginBlock': '50px 40px'}}/>

				<Stack spacing={2} direction={"row"} alignItems={'flex-end'} justifyContent={'flex-end'} sx={{paddingRight: '5%', marginBottom: '30px'}}>
					<GenerationLockWidget/>
					<Button type='submit' sx={{textTransform: 'capitalize', padding: '9px 35px'}} variant={'contained'}>Generate</Button>
					<Button
						sx={{textTransform: 'capitalize', padding: '8px 28px'}} variant={'outlined'} onClick={() => {

						navigate(-1)
					}}
					>Cancel</Button>
				</Stack>
			</form>
		</Paper>
	);
};

export default Generate;
