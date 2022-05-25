import React, {useState} from 'react';
import GenerationLockWidget from "../../components/wildlifeIds/GenerationLockWidget";
import {useAPI} from "../../hooks/useAPI";
import {Box, Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, Slider, Stack, TextField, Typography} from "@mui/material";
import '../../styles/inventory.scss';
import AddIcon from '@mui/icons-material/Add';
import {useSelector} from "../../../state/utilities/use_selector";
import {useNavigate} from "react-router-dom";
import TwoColumnForm from "../../components/wildlifeIds/TwoColumnForm";
import {paperStyle} from "../../../state/style_constants";

const Generate: React.FC = () => {

	const me = useSelector(state => state.Auth);
	const api = useAPI();

	const navigate = useNavigate();

	const [generateStatus, setGenerateStatus] = useState({status: 'not yet called', message: ''})

	const validPurposes = [
		{value: 'UNKNOWN', label: 'Unknown'},
		{value: 'HERD_HEALTH', label: 'Herd Health'},
		{value: 'PASSIVE', label: 'Passive Surveillance'},
		{value: 'TARGETED', label: 'Targeted Surveillance'}
	];

	const [formState, setFormState] = useState({
		quantity: 1,
		year: '2022',
		purpose: 'UNKNOWN',
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

	const [showOptional, setShowOptional] = useState(false);

	return (
		<Paper sx={paperStyle}>

			<Typography variant={'h3'}>Generate WLH ID</Typography>

			<p>Generate one or multiple WLH IDs by entering the information below.</p>
			<hr/>

			<TwoColumnForm title={'WLH ID Information'}>

				<TextField sx={{width: '100%'}} label="Year" id="year" defaultValue={formState.year} name="year"
									 onChange={handleUpdate} required/>

				<TextField sx={{width: '100%'}} label="Number of WLH IDs" id="wlh_id" defaultValue={formState.species} name="wlh_id"
									 onChange={handleUpdate} required/>

				<>
					<InputLabel id="label-purpose-select">Purpose</InputLabel>
					<Select sx={{width: '100%'}} labelId="label-purpose-select" id="purpose-select" defaultValue={formState.purpose} name="modeOfTransport"
									onChange={handleUpdate}>
						{validPurposes.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</Select>
				</>

				<TextField sx={{width: '100%'}} label="Species"
									 id="species"
									 defaultValue={formState.species}
									 name="species"
									 onChange={handleUpdate}/>

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
									 onChange={handleUpdate}/>

			</TwoColumnForm>


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


				<></>
				<Button onClick={() => setShowOptional(!showOptional)}>
					<AddIcon/>Requester Details (Optional)
				</Button>

				<TextField
					sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
					label="Region"
					id="requesterRegion"
					defaultValue={formState.requesterRegion}
					name="requesterRegion"
					onChange={handleUpdate}
				/>
				<TextField
					sx={{width: '100%', display: showOptional ? 'auto' : 'none'}}
					label="Organization"
					id="requesterOrganization"
					defaultValue={formState.requesterOrganization}
					name="requesterOrganization"
					onChange={handleUpdate}
				/>
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
					label="Requester's Role"
					id="requesterRole"
					defaultValue={formState.requesterRole}
					name="requesterRole"
					onChange={handleUpdate}
				/>
			</TwoColumnForm>

			<hr/>

			<Stack spacing={2} direction={"row"} alignItems={'flex-end'} justifyContent={'flex-end'}>
				<GenerationLockWidget/>

				<Button variant={'contained'} color={'secondary'} onClick={() => {
					navigate(-1)
				}}>Cancel</Button>
				<Button variant={'contained'} onClick={() => handleSubmit()}>Generate</Button>
			</Stack>

		</Paper>
	);
};

export default Generate;
