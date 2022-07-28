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
	FormControl,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	makeStyles,
	MenuItem,
	Paper,
	Select,
	Slider,
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
import {selectCodeTables} from "../../../state/reducers/code_tables";
import Loading from "../../components/util/Loading";

const Generate: React.FC = () => {

	const me = useSelector(state => state.Auth);
	const {purposes, regions, organizations, roles} = useSelector(state => state.CodeTables.tables);
	const {initialized: codeTablesInitialized} = useSelector(selectCodeTables);

	const api = useAPI();

	const navigate = useNavigate();

	const [generateStatus, setGenerateStatus] = useState({status: 'not yet called', message: ''})

	const [formState, setFormState] = useState({
		quantity: 1,
		year: '2022',
		purpose: 'PURPOSE',
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

	const handleSubmit = () => {

		api.generateIDs({quantity: formState.quantity}).then(result => {
			setGenerateStatus({
				status: 'ok',
				message: JSON.stringify(result)
			});
			navigate('/wildlifeIds/list');
		}).catch(err => {
			console.dir(err);
			setGenerateStatus({
				status: 'failed',
				message: JSON.stringify(err.response ? err.response.data : 'unknown')
			});
		});

	};

	const handleUpdate = event => {
		const currentState = formState;

		switch (event.target.name) {
			default:
				currentState[event.target.name] = event.target.value;
		}

		setFormState(currentState);
	};

	const handleOutofRange = (e) => {
		const idNumber = e.target.value;
		if (idNumber > 100) {
			setAlertNumber(!alertNumber);
		}
	}

	const [alertNumber, setAlertNumber] = useState(false);
	const [showOptional, setShowOptional] = useState(false);
	const [OptionalButton, setOptionalButton] = useState(true);

	const handleClose = () => {
		setAlertNumber(false);
	};

	if (!codeTablesInitialized) {
		return (<Loading/>);
	}

	return (
		<Paper sx={paperStyle}>
			<Typography variant={'h5'} sx={{marginBlock: '10px'}}>Generate WLH ID</Typography>
			<Typography variant={'subtitle1'} sx={{marginBottom: '50px'}}>Generate one or multiple WLH IDs by entering the information below.</Typography>
			<hr/>
			<TwoColumnForm title={'WLH ID information'}>

				<TextField sx={{width: '100%'}} label="Year" id="year" defaultValue={formState.year} name="year"
									 onChange={handleUpdate} required/>

				<TextField
					sx={{width: '100%'}}
					label="Number of WLH IDs"
					id="wlh_id"
					name="wlh_id"
					type="tel"
					inputProps={{maxLength: 3}}
					onChange={(e) => {
						handleOutofRange(e)
					}}
					required/>
				<>
					<TextField sx={{width: '100%'}}
										 id="purpose-select"
										 select
										 label="Purpose"
										 placeholder='Purpose*'
										 onChange={handleUpdate}
										 required
					>
						{purposes.codes.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.displayed_value}
							</MenuItem>
						))}
					</TextField>
					<Dialog open={alertNumber} onClose={handleClose}>
						<DialogTitle>
							Warning!
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
						</DialogTitle>
						<DialogContent>
							The number is out of range! <br/>
							Please don't enter over 100.
						</DialogContent>
					</Dialog>
				</>

				<TextField sx={{width: '100%'}} label="Species"
									 id="species"
									 defaultValue={formState.species}
									 name="species"
									 onChange={handleUpdate}
									 InputProps={{
										 endAdornment: <InputAdornment position="end"><AccountTreeOutlinedIcon/></InputAdornment>,
									 }}
				/>

			</TwoColumnForm>
			<OneColumnForm>
				<TextField sx={{width: '100%'}}
									 label="Associated Project"
									 id="associatedProject"
									 defaultValue={formState.associatedProject}
									 name="associatedProject"
									 onChange={handleUpdate}
				/>

				<TextField sx={{width: '100%'}}
									 label="Reason"
									 id="reason"
									 defaultValue={formState.reason}
									 name="reason"
									 multiline
									 rows={3}
									 onChange={handleUpdate}/>

			</OneColumnForm>


			<hr/>

			<TwoColumnForm title={'Requester'}>

				<TextField
					sx={{width: '100%'}}
					label="First Name"
					id="requesterFirstName"
					defaultValue={formState.requesterFirstName}
					name="requesterFirstName"
					onChange={handleUpdate}
					required
				/>

				<TextField
					sx={{width: '100%'}}
					label="Last Name"
					id="requesterLastName"
					defaultValue={formState.requesterLastName}
					name="requesterLastName"
					onChange={handleUpdate}
					required
				/>

				<TextField
					sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
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
					sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
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
					sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
					label="Phone"
					id="requesterContactPhone"
					defaultValue={formState.requesterContactPhone}
					name="requesterContactPhone"
					onChange={handleUpdate}
				/>
				<TextField
					sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
					label="Email"
					id="requesterContactEmail"
					defaultValue={formState.requesterContactEmail}
					name="requesterContactEmail"
					onChange={handleUpdate}
				/>
				<TextField
					sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
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

			<Button
				sx={{display: OptionalButton ? 'auto' : 'none', postion: 'relative', top: '-70px', left: '500px', textTransform: 'capitalize'}}
				onClick={() => {
					setShowOptional(!showOptional);
					setOptionalButton(!OptionalButton);
				}} variant="outlined">
				<AddIcon/>Requester Details (Optional)
			</Button>
			<hr style={{'marginBlock': '50px'}}/>

			<Stack spacing={2} direction={"row"} alignItems={'flex-end'} justifyContent={'flex-end'} sx={{paddingRight: '80px'}}>
				<GenerationLockWidget/>

				<Button sx={{textTransform: 'capitalize'}} variant={'contained'} onClick={() => handleSubmit()}>Generate</Button>
				<Button sx={{textTransform: 'capitalize'}} variant={'outlined'} onClick={() => {
					navigate(-1)
				}}>Cancel</Button>
			</Stack>

		</Paper>
	);
};

export default Generate;
