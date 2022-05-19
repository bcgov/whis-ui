import React, { useState } from 'react';
import GenerationLockWidget from "../../components/wildlifeIds/GenerationLockWidget";
import { useAPI } from "../../hooks/useAPI";
import { Box, Button, FormControl, InputLabel, makeStyles, MenuItem, Select, Slider, TextField, Typography } from "@mui/material";
import '../../styles/generate.scss';
import AddIcon from '@mui/icons-material/Add';

const Generate: React.FC = () => {
	const api = useAPI();

	const [generateStatus, setGenerateStatus] = useState({ status: 'not yet called', message: '' })

	const validQuantities = [
		{ value: 1, label: '1' },
		{ value: 5, label: '5' },
		{ value: 10, label: '10' },
		{ value: 25, label: '25' },
		{ value: 50, label: '50' },
		{ value: 100, label: '100' }
	];
	const validPurposes = [
		{ value: 'UNKNOWN', label: 'Unknown' },
		{ value: 'HERD_HEALTH', label: 'Herd Health' },
		{ value: 'PASSIVE', label: 'Passive Surveillance' },
		{ value: 'TARGETED', label: 'Targeted Surveillance' }
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
		requesterOrganization: '',
		requesterRole: 'WLHBiologist',
		associatedProject: '',
		reason: ''
	});

	const handleSubmit = event => {
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

	const handleUpdate = event => {
		const currentState = formState;
		const matches = null;

		switch (event.target.name) {
			default:
				currentState[event.target.name] = event.target.value;
		}

		setFormState(currentState);
	};

	const showMoreInputs = () => {
		var optional = document.getElementById("optional_inputs");
		optional.classList.toggle("hide");
		optional.classList.toggle("form_input");
	};
	return (
		<>
			<div className='generate_nav'>
				<p>My Dashboard</p>
				<p>WLH ID Inventory</p>
			</div>
			<Box style={{ margin: 0, padding: 0 }} display="flex" flexDirection={'column'}>
				<Typography variant={'h5'}>Generate New Wildlife Health Identifiers</Typography>

				<GenerationLockWidget />
			</Box>

			<div className="generate_container">
				<h1>Generate WLH ID</h1>
				<p>Generate one or multiple WLH IDs by entering the information below.</p>
				<hr />
				<div className='form_container'>
					<h2>WLH ID information</h2>
					<div className='info_form'>
						<div className='form_input'>
							<TextField style={{ minWidth: '120px', marginRight: '20px' }} label="Year" id="year" defaultValue={formState.year} name="year" onChange={handleUpdate} required />
							<TextField style={{ minWidth: '120px' }} label="Number of WLH IDs" id="wlh_id" defaultValue={formState.species} name="wlh_id" onChange={handleUpdate} required />
							<FormControl style={{ minWidth: '194px', marginTop: '20px', marginRight: '20px' }} required>
								<InputLabel id="label-purpose-select">Purpose</InputLabel>
								<Select labelId="label-purpose-select" id="purpose-select" defaultValue={formState.purpose} name="modeOfTransport" onChange={handleUpdate}>
									{validPurposes.map((m, i) => (
										<MenuItem key={i} value={m.value}>
											{m.label}
										</MenuItem>
									))}
								</Select>
							</FormControl>
							<TextField style={{ minWidth: '120px', marginTop: '20px' }} label="Species" id="species" defaultValue={formState.species} name="species" onChange={handleUpdate} />
							<TextField
								style={{ minWidth: '120px', marginTop: '20px', marginRight: '20px' }}
								label="Associated Project"
								id="associatedProject"
								defaultValue={formState.associatedProject}
								name="associatedProject"
								onChange={handleUpdate}
							/>
							<TextField style={{ minWidth: '120px', marginTop: '20px' }} label="Reason" id="reason" defaultValue={formState.reason} name="reason" onChange={handleUpdate} />
						</div>
					</div>
				</div>
				<hr />
				<div className='form_container'>
					<h2>Requester</h2>
					<div className='info_form'>
						<div className='form_input'>
							<TextField
								style={{ minWidth: '120px', marginRight: '20px' }}
								label="First Name"
								id="requesterName"
								defaultValue={formState.requesterName}
								name="requesterName"
								onChange={handleUpdate}
								required
							/>
							<TextField
								style={{ minWidth: '120px' }}
								label="Last Name"
								id="requesterName"
								defaultValue={formState.requesterName}
								name="requesterName"
								onChange={handleUpdate}
								required
							/>
						</div>
						<button className='requester_btn' onClick={showMoreInputs}>
							<AddIcon />Requester Details (Optional)
						</button>
						<div id='optional_inputs' className='hide'>
							<TextField
								style={{ minWidth: '120px', marginTop: '20px', marginRight: '20px' }}
								label="Region"
								id="requesterRegion"
								defaultValue={formState.requesterRegion}
								name="requesterRegion"
								onChange={handleUpdate}
							/>
							<TextField
								style={{ minWidth: '120px', marginTop: '20px' }}
								label="Organization"
								id="requesterOrganization"
								defaultValue={formState.requesterOrganization}
								name="requesterOrganization"
								onChange={handleUpdate}
							/>
							<TextField
								style={{ minWidth: '120px', marginTop: '20px', marginRight: '20px' }}
								label="Phone"
								id="requesterContactPhone"
								defaultValue={formState.requesterContactPhone}
								name="requesterContactPhone"
								onChange={handleUpdate}
							/>
							<TextField
								style={{ minWidth: '120px', marginTop: '20px' }}
								label="Email"
								id="requesterContactEmail"
								defaultValue={formState.requesterContactEmail}
								name="requesterContactEmail"
								onChange={handleUpdate}
							/>
							<TextField
								style={{ minWidth: '120px', marginTop: '20px', marginRight: '20px' }}
								label="Requester's Role"
								id="requesterRole"
								defaultValue={formState.requesterRole}
								name="requesterRole"
								onChange={handleUpdate}
							/>
						</div>
					</div>
				</div>
				<hr />
				<div>
					<button className='cancel_btn' onClick={handleSubmit}>Cancel</button>
					<button className='generate_btn' onClick={handleSubmit}>Generate</button>
				</div>
			</div>
		</>
	);
};

export default Generate;
