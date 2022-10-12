import React, {useState} from 'react';
import {Box, IconButton, MenuItem, TextField} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const LocationEntry = ({handleUpdate, handleDelete}) => {

	const validLocation = [
		{value: '+ Add Location', label: '+ Add Location'},
		{value: 'REGION', label: 'Region'},
		{value: 'MANAGEMENT_UNIT', label: 'Management Unit'},
		{value: 'POPULATION_UNIT', label: 'Population Unit'},
		{value: 'HERD_NAME', label: 'Herd Name'},
		{value: 'LATITUDE', label: 'Latitude/ Longitude (in decimal degrees)'},
		{value: 'NICKNAME', label: 'Nickname'},
		{value: 'UTM_EASTING', label: 'UTM Easting Band'},
		{value: 'URM_NORTHING', label: 'URM Northing'},
		{value: 'CITY', label: 'City'},
		{value: 'CIVIC_ADDRESS', label: 'Civic Address'}
	];
	const validManagementUnit = [
		{value: 'M_UNIT1', label: 'Management Unit 1'},
		{value: 'M_UNIT2', label: 'Management Unit 2'},
		{value: 'M_UNIT3', label: 'Management Unit 3'},
		{value: 'M_UNIT4', label: 'Management Unit 4'},
		{value: 'M_UNIT5', label: 'Management Unit 5'}
	];
	const validPopulationUnit = [
		{value: 'P_UNIT1', label: 'Population Unit 1'},
		{value: 'P_UNIT2', label: 'Population Unit 2'},
		{value: 'P_UNIT3', label: 'Population Unit 3'},
		{value: 'P_UNIT4', label: 'Population Unit 4'},
		{value: 'P_UNIT5', label: 'Population Unit 5'}
	];
	const validCity = [
		{value: 'CITY1', label: 'City 1'},
		{value: 'CITY2', label: 'City 2'},
		{value: 'CITY3', label: 'City 3'},
		{value: 'CITY4', label: 'City 4'},
		{value: 'CITY5', label: 'City 5'}
	];
	const validCivicAddress = [
		{value: 'ADDR1', label: 'City 1'},
		{value: 'ADDR2', label: 'City 2'},
		{value: 'ADDR3', label: 'City 3'},
		{value: 'ADDR4', label: 'City 4'},
		{value: 'ADDR5', label: 'City 5'}
	];


	const [locations, setLocation] = useState('+ Add Location');
	const [management, setManagement] = useState('');
	const [population, setPopulation] = useState('');
	const [city, setCity] = useState('');
	const [civicCity, setCivicCity] = useState('');


	function renderDetailed() {
		switch (locations) {
		case "REGION":
			return (
				<Box sx={{display: 'flex', width: '55%'}}>
					<TextField
						sx={{m: 2, width: '40%'}}
						label='Region Number'
						id='regionNumber'
						name='regionNumber'
					/>
					<TextField
						sx={{m: 2, width: '40%'}}
						label='Region Name'
						id='regionName'
						name='regionName'
					/>
					<IconButton sx={{width: '20%'}}>
						<DeleteIcon color='primary'/>
					</IconButton>
				</Box>);
			break;
		case "MANAGEMENT_UNIT":
			return (
				<Box sx={{display: 'flex', width: '55%'}}>
					<TextField
						sx={{m: 2, width: '80%'}}
						id='m_unit'
						select
						label='Management Unit'
						value={management}
						onChange={(e) => {
							setManagement(e.target.value);
						}}
					>
						{validManagementUnit.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<IconButton sx={{width: '20%'}}>
						<DeleteIcon color='primary'/>
					</IconButton>
				</Box>);
			break;
		case "POPULATION_UNIT":
			return (
				<Box sx={{display: 'flex', width: '55%'}}>
					<TextField
						sx={{m: 2, width: '80%'}}
						id='p_unit'
						select
						label='Population Unit'
						value={population}
						onChange={(e) => {
							setPopulation(e.target.value);
						}}
					>
						{validPopulationUnit.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<IconButton sx={{width: '20%'}}>
						<DeleteIcon color='primary'/>
					</IconButton>
				</Box>);
			break;
		case "HERD_NAME":
			return (
				<Box sx={{display: 'flex', width: '55%'}}>
					<TextField
						sx={{m: 2, width: '80%'}}
						label='Herd Name'
						id='herdname'
						name='herdname'
					/>
					<IconButton sx={{width: '20%'}}>
						<DeleteIcon color='primary'/>
					</IconButton>
				</Box>);
			break;
		case "LATITUDE":
			return (
				<Box sx={{display: 'flex', width: '55%'}}>
					<TextField
						sx={{m: 2, width: '20%'}}
						label='Unit'
						id='unit'
						name='unit'
					/>
					<TextField
						sx={{m: 2, width: '20%'}}
						label='Latitude'
						id='latitude'
						name='latitude'
					/>
					<TextField
						sx={{m: 2, width: '20%'}}
						label='Longtitude'
						id='longtitude'
						name='longtitude'
					/>
					<IconButton sx={{width: '20%'}}>
						<DeleteIcon color='primary'/>
					</IconButton>
				</Box>);
			break;
		case "NICKNAME":
			return (
				<Box sx={{display: 'flex', width: '55%'}}>
					<TextField
						sx={{m: 2, width: '80%'}}
						label='Nickname'
						id='nickname'
						name='nickname'
					/>
					<IconButton sx={{width: '20%'}}>
						<DeleteIcon color='primary'/>
					</IconButton>
				</Box>);
			break;
		case "UTM_EASTING":
			return (
				<Box sx={{display: 'flex', width: '55%'}}>
					<TextField
						sx={{m: 2, width: '20%'}}
						label='Zone'
						id='zone'
						name='zone'
					/>
					<TextField
						sx={{m: 2, width: '20%'}}
						label='Easting'
						id='easting'
						name='easting'
					/>
					<TextField
						sx={{m: 2, width: '20%'}}
						label='Northing'
						id='northing'
						name='northing'
					/>
					<IconButton sx={{width: '20%'}}>
						<DeleteIcon color='primary'/>
					</IconButton>
				</Box>);
			break;
		case "URM_NORTHING":
			return (
				<Box sx={{display: 'flex', width: '55%'}}>
					<TextField
						sx={{m: 2, width: '40%'}}
						label='Value 1'
						id='value1'
						name='value1'
					/>
					<TextField
						sx={{m: 2, width: '40%'}}
						label='Value 2'
						id='value2'
						name='value2'
					/>
					<IconButton sx={{width: '20%'}}>
						<DeleteIcon color='primary'/>
					</IconButton>
				</Box>);
			break;
		case "CITY":
			return (
				<Box sx={{display: 'flex', width: '55%'}}>
					<TextField
						sx={{m: 2, width: '80%'}}
						id='cities'
						select
						label='BC Cities'
						value={city}
						onChange={(e) => {
							setCity(e.target.value);
						}}
					>
						{validCity.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<IconButton sx={{width: '20%'}}>
						<DeleteIcon color='primary'/>
					</IconButton>
				</Box>);
			break;
		case "CIVIC_ADDRESS":
			return (
				<Box sx={{display: 'flex', width: '55%'}}>
					<TextField
						sx={{m: 2, width: '40%'}}
						id='civic_city'
						select
						label='City'
						value={civicCity}
						onChange={(e) => {
							setCivicCity(e.target.value);
						}}
					>
						{validCivicAddress.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						sx={{m: 2, width: '40%'}}
						label='Street Address'
						id='address'
						name='address'
					/>
					<IconButton sx={{width: '20%'}}>
						<DeleteIcon color='primary'/>
					</IconButton>
				</Box>);
			break;
		default:
			return (<></>);
		}
	}

	return (
		<>
			<Box sx={{display: 'flex', width: '100%'}}>
				<TextField
					sx={{m: 2, width: '40%'}}
					id='location'
					name='location'
					select
					defaultValue={"+ Add Location"}
					onChange={(e) => {
						setLocation(e.target.value);
						handleUpdate(e);
					}}
				>
					{validLocation.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
				{
					renderDetailed()
				}
			</Box>
		</>
	);
};

export default LocationEntry;
