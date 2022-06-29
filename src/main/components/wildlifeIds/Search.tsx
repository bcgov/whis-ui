import React, {useState} from 'react';
import {Box, Button, Card, TextField, Typography, InputAdornment, FormControl, Checkbox, FormControlLabel, FormGroup, MenuItem, FormLabel} from "@mui/material";
import '../../styles/search.scss';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

const Search: React.FC = () => {

	const validPurposes = [
		{value: 'UNKNOWN', label: 'Unknown'},
		{value: 'HERD_HEALTH', label: 'Herd Health'},
		{value: 'PASSIVE', label: 'Passive Surveillance'},
		{value: 'TARGETED', label: 'Targeted Surveillance'}
	];
	const validIdentifier = [
		{value: 'UNKNOWN', label: 'Alternate Animal ID'},
		{value: 'COMPULSORY', label: 'Compulsory Inspection Number'},
		{value: 'EAR_TAG', label: 'Ear Tag Number'},
		{value: 'HUMAN_WILDLIFE', label: 'Human Wildlife Conflict Number'},
		{value: 'COORS', label: 'COORS Number'},
		{value: 'MICROCHIP', label: 'Microchip'},
		{value: 'NICKNA', label: 'Nickna'},
		{value: 'PIT_TAG', label: 'Pit Tag Number'},
		{value: 'RAPP_TAG', label: 'RAPP Ear Tag'},
		{value: 'RECAPTURE_ID', label: 'Recapture ID'},
		{value: 'VAGINAL', label: 'Vaginal Implant Transmitter'},
		{value: 'WING_BAND', label: 'Wing Band'}
	];
	const validOrganization = [
		{value: 'ONE', label: 'Organization 1'},
		{value: 'TWO', label: 'Organization 2'},
		{value: 'THREE', label: 'Organization 3'},
		{value: 'FOUR', label: 'Organization 4'}
	];

	const [formState, setFormState] = useState({
		quantity: 1,
		year: '2022',
		purpose: 'UNKNOWN',
		species: '',
		identifier: '',
		other_identifier: '',
		organization: '',
		requesterRegion: '',
		associatedProject: '',
		reason: ''
	});

	const [showOptional, setShowOptional] = useState(false);
	const [identifier, setIdentifier] = useState('');
	const [organization, setOrganization] = useState('');
	const [purpose, setPurpose] = useState(formState.purpose);

	const handleSubmit = () => {
	}
	const handleUpdate = () => {
	}

	return (

		<Box sx={{display: 'flex', flexWrap: 'wrap', flexDirection: 'column'}}>
			<Typography variant={'h4'}>Filter ID (s)</Typography><br/>
			<p>Find the IDs and update the details associated to the IDs</p>
			<Card sx={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
				<div className='input_container'>
					<TextField
						label="From (Enter ID)"
						id="fromID"
						sx={{m: 3, width: '40%'}}
						InputProps={{
							endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
						}}
						required
					/>
					<TextField
						label="To (Enter ID)"
						id="toID"
						sx={{m: 3, width: '40%'}}
						InputProps={{
							endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
						}}
						required
					/>
					<TextField
						sx={{m: 3, width: '40%'}}
						id="startDate"
						label="Start Date(YYYY-MM-DD)"
						type="date"
						defaultValue="2022-05-30"
						name="startDate"
						required
					/>
					<TextField
						sx={{m: 3, width: '40%'}}
						id="endDate"
						label="End Date(YYYY-MM-DD)"
						defaultValue="2022-05-30"
						type="date"
						name="endDate"
						required
					/>
					<FormGroup sx={{m: 3, display: showOptional ? 'none' : 'auto', width: '90%'}}>
						<FormControlLabel control={<Checkbox/>} label="IDs Recently Created ( Within last week ?)"/>
					</FormGroup>

					<TextField
						sx={{m: 3, width: '40%', display: showOptional ? 'auto' : 'none'}}
						label="Region"
						id="requesterRegion"
						defaultValue={formState.requesterRegion}
						name="requesterRegion"
						onChange={handleUpdate}
					/>

					<TextField sx={{m: 3, width: '40%', display: showOptional ? 'auto' : 'none'}} label="Species"
										 id="species"
										 defaultValue={formState.species}
										 name="species"
										 onChange={handleUpdate}
										 InputProps={{
											 endAdornment: <InputAdornment position="end"><AccountTreeOutlinedIcon/></InputAdornment>,
										 }}
					/>
					<TextField sx={{m: 3, width: '40%', display: showOptional ? 'auto' : 'none'}}
										 id="purpose-select"
										 select
										 label="Purpose"
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

					<FormControl sx={{m: 3, width: '40%', display: showOptional ? 'auto' : 'none'}}>
						<FormLabel>ID Status</FormLabel>
						<FormGroup sx={{flexDirection: 'row', flexWrap: 'nowrap'}}>
							<FormControlLabel control={<Checkbox/>} label="Assigned"/>
							<FormControlLabel control={<Checkbox/>} label="Retired"/>
						</FormGroup>
					</FormControl>

					<TextField sx={{m: 3, width: '40%', display: showOptional ? 'auto' : 'none'}}
										 id="identifier-select"
										 select
										 label="Identifier Type"
										 value={identifier}
										 onChange={(e) => {
											 setIdentifier(e.target.value);
										 }}
					>
						{validIdentifier.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>

					<TextField sx={{m: 3, width: '40%', display: showOptional ? 'auto' : 'none'}} label="Other Identifier ID"
										 id="other_identifier"
										 defaultValue={formState.other_identifier}
										 name="other_identifier"
										 onChange={handleUpdate}
					/>
					<TextField sx={{m: 3, width: '40%', display: showOptional ? 'auto' : 'none'}} label="Requester First/Last Name"
										 id="requester_name"
										 defaultValue={formState.other_identifier}
										 name="requester_name"
										 onChange={handleUpdate}
					/>
					<TextField sx={{m: 3, width: '40%', display: showOptional ? 'auto' : 'none'}}
										 id="label-organization-select"
										 select
										 label="Requester Organization"
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
				</div>
				<div className='apply_btn'>
					<Button variant={'outlined'}
									sx={{m: 3, marginRight: '10px', width: '140px', height: '60px'}}
									onClick={() => setShowOptional(!showOptional)}>
						Advanced<ArrowDropDownIcon/>
					</Button>
					<Button variant={'contained'}
									sx={{m: 3, width: '140px', height: '60px'}}
									onClick={() => handleSubmit()}>
						Apply
					</Button>
				</div>
			</Card>
		</Box>
	);
};
export default Search;
