import React, {useState} from 'react';
import GenerationLockWidget from "../../components/wildlifeIds/GenerationLockWidget";
import {useAPI} from "../../hooks/useAPI";
import {Box, Button, FormControl, InputLabel, makeStyles, MenuItem, Select, Slider, TextField, Typography} from "@mui/material";

const Generate: React.FC = () => {
	const api = useAPI();

	const [generateStatus, setGenerateStatus] = useState({status: 'not yet called', message: ''})

	const validQuantities = [
		{value: 1, label: '1'},
		{value: 5, label: '5'},
		{value: 10, label: '10'},
		{value: 25, label: '25'},
		{value: 50, label: '50'},
		{value: 100, label: '100'}
	];
	const validPurposes = [
		{value: 'UNKNOWN', label: 'Unknown'},
		{value: 'HERD_HEALTH', label: 'Herd Health'},
		{value: 'PASSIVE', label: 'Passive Surveillance'},
		{value: 'TARGETED', label: 'Targeted Surveillance'}
	];

	const [formState, setFormState] = useState({
		quantity: 1,
		year: '2022',
		purpose: 'Unknown',
		species: '',
		requesterName: '',
		requesterContactEmail: '',
		requesterContactPhone: '',
		requesterRegion: '',
		requesterRole: 'WLHBiologist',
		associatedProject: '',
		reason: ''
	});

	const handleSubmit = event => {
		api.generateIDs({quantity: formState.quantity}).then(result => {
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

	const handleUpdate = event => {
		const currentState = formState;
		const matches = null;

		switch (event.target.name) {
		default:
			currentState[event.target.name] = event.target.value;
		}

		setFormState(currentState);
	};
	return (
		<>
			<Box style={{margin: 0, padding: 0}} display="flex" flexDirection={'column'}>
				<Typography variant={'h5'}>Generate New Wildlife Health Identifiers</Typography>

				<GenerationLockWidget/>

				<FormControl style={{minWidth: '120px'}}>
					<Typography gutterBottom>Generated Quantity</Typography>
					<Slider
						aria-label="Quantity"
						value={formState.quantity}
						valueLabelDisplay="auto"
						name="quantity"
						step={null}
						marks={validQuantities}
						onChange={(e, val: number) => {
							setFormState({...formState, quantity: val});
						}}
					/>
				</FormControl>

				<TextField  style={{minWidth: '120px'}} label="Year" id="year" defaultValue={formState.year} name="year" onChange={handleUpdate}/>

				<TextField  style={{minWidth: '120px'}} label="Species" id="species" defaultValue={formState.species} name="species" onChange={handleUpdate}/>

				<FormControl  style={{minWidth: '120px'}}>
					<InputLabel id="label-purpose-select">Purpose</InputLabel>
					<Select labelId="label-purpose-select" id="purpose-select" defaultValue={formState.purpose} name="modeOfTransport" onChange={handleUpdate}>
						{validPurposes.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</Select>
				</FormControl>

				<TextField
					style={{minWidth: '120px'}}
					label="Requester Name"
					id="requesterName"
					defaultValue={formState.requesterName}
					name="requesterName"
					onChange={handleUpdate}
				/>

				<TextField
					style={{minWidth: '120px'}}
					label="Requester Contact Email"
					id="requesterContactEmail"
					defaultValue={formState.requesterContactEmail}
					name="requesterContactEmail"
					onChange={handleUpdate}
				/>

				<TextField
					 style={{minWidth: '120px'}}
					label="Requester Contact Phone"
					id="requesterContactPhone"
					defaultValue={formState.requesterContactPhone}
					name="requesterContactPhone"
					onChange={handleUpdate}
				/>

				<TextField
					 style={{minWidth: '120px'}}
					label="Requester Region"
					id="requesterRegion"
					defaultValue={formState.requesterRegion}
					name="requesterRegion"
					onChange={handleUpdate}
				/>

				<TextField
					 style={{minWidth: '120px'}}
					label="Requester Role"
					id="requesterRole"
					defaultValue={formState.requesterRole}
					name="requesterRole"
					onChange={handleUpdate}
				/>

				<TextField
					 style={{minWidth: '120px'}}
					label="Associated Project"
					id="associatedProject"
					defaultValue={formState.associatedProject}
					name="associatedProject"
					onChange={handleUpdate}
				/>

				<TextField  style={{minWidth: '120px'}} label="Reason" id="reason" defaultValue={formState.reason} name="reason" onChange={handleUpdate}/>

				<Button variant={'contained'} onClick={handleSubmit}>
					Generate
				</Button>

				<strong>Request Status</strong>
				<pre>{generateStatus.status}</pre>
				<pre>{generateStatus.message}</pre>
			</Box>
		</>
	);
};

export default Generate;
