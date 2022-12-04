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
				<Box sx={{width: '529px', display: 'flex', alignItems: 'center', marginTop: '32px'}}>
					<TextField
						sx={{width: '235px', marginRight: '16px'}}
						label='Region Number'
						id='regionNumber'
						name='regionNumber'
					/>
					<TextField
						sx={{width: '235px', marginRight: '4px'}}
						label='Region Name'
						id='regionName'
						name='regionName'
					/>
					<IconButton>
						<DeleteIcon color='primary' sx={{fontSize: '20px'}}/>
					</IconButton>
				</Box>);
			break;
		case "MANAGEMENT_UNIT":
			return (
				<Box>
					<TextField
						sx={{width: '486px', marginTop: '32px'}}
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
					<IconButton sx={{position: 'relative', top: '40px', marginLeft: '4px'}}>
						<DeleteIcon color='primary' sx={{fontSize: '20px'}}/>
					</IconButton>
				</Box>);
			break;
		case "POPULATION_UNIT":
			return (
				<Box>
					<TextField
						sx={{width: '486px', marginTop: '32px'}}
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
					<IconButton sx={{position: 'relative', top: '40px', marginLeft: '4px'}}>
						<DeleteIcon color='primary' sx={{fontSize: '20px'}}/>
					</IconButton>
				</Box>);
			break;
		case "HERD_NAME":
			return (
				<Box>
					<TextField
						sx={{width: '486px', marginTop: '32px'}}
						label='Herd Name'
						id='herdname'
						name='herdname'
					/>
					<IconButton sx={{position: 'relative', top: '40px', marginLeft: '4px'}}>
						<DeleteIcon color='primary' sx={{fontSize: '20px'}}/>
					</IconButton>
				</Box>);
			break;
		case "LATITUDE":
			return (
				<Box sx={{width: '529px', display: 'flex', alignItems: 'center', marginTop: '32px'}}>
					<TextField
						sx={{width: '151px', marginRight: '16px'}}
						label='Unit'
						id='unit'
						name='unit'
					/>
					<TextField
						sx={{width: '151px', marginRight: '16px'}}
						label='Latitude'
						id='latitude'
						name='latitude'
					/>
					<TextField
						sx={{width: '151px', marginRight: '4px'}}
						label='Longtitude'
						id='longtitude'
						name='longtitude'
					/>
					<IconButton>
						<DeleteIcon color='primary' sx={{fontSize: '20px'}}/>
					</IconButton>
				</Box>);
			break;
		case "NICKNAME":
			return (
				<Box>
					<TextField
						sx={{width: '486px', marginTop: '32px'}}
						label='Nickname'
						id='nickname'
						name='nickname'
					/>
					<IconButton sx={{position: 'relative', top: '40px', marginLeft: '4px'}}>
						<DeleteIcon color='primary' sx={{fontSize: '20px'}}/>
					</IconButton>
				</Box>);
			break;
		case "UTM_EASTING":
			return (
				<Box sx={{width: '529px', display: 'flex', alignItems: 'center', marginTop: '32px'}}>
					<TextField
						sx={{width: '151px', marginRight: '16px'}}
						label='Zone'
						id='zone'
						name='zone'
					/>
					<TextField
						sx={{width: '151px', marginRight: '16px'}}
						label='Easting'
						id='easting'
						name='easting'
					/>
					<TextField
						sx={{width: '151px', marginRight: '4px'}}
						label='Northing'
						id='northing'
						name='northing'
					/>
					<IconButton>
						<DeleteIcon color='primary' sx={{fontSize: '20px'}}/>
					</IconButton>
				</Box>);
			break;
		case "URM_NORTHING":
			return (
				<Box sx={{width: '529px', display: 'flex', alignItems: 'center', marginTop: '32px'}}>
					<TextField
						sx={{width: '235px', marginRight: '16px'}}
						label='Value 1'
						id='value1'
						name='value1'
					/>
					<TextField
						sx={{width: '235px', marginRight: '4px'}}
						label='Value 2'
						id='value2'
						name='value2'
					/>
					<IconButton>
						<DeleteIcon color='primary' sx={{fontSize: '20px'}}/>
					</IconButton>
				</Box>);
			break;
		case "CITY":
			return (
				<Box>
					<TextField
						sx={{width: '486px', marginTop: '32px'}}
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
					<IconButton sx={{position: 'relative', top: '40px', marginLeft: '4px'}}>
						<DeleteIcon color='primary' sx={{fontSize: '20px'}}/>
					</IconButton>
				</Box>);
			break;
		case "CIVIC_ADDRESS":
			return (
				<Box sx={{width: '529px', display: 'flex', alignItems: 'center', marginTop: '32px'}}>
					<TextField
						sx={{width: '235px', marginRight: '16px'}}
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
						sx={{width: '235px', marginRight: '4px'}}
						label='Street Address'
						id='address'
						name='address'
					/>
					<IconButton>
						<DeleteIcon color='primary' sx={{fontSize: '20px'}}/>
					</IconButton>
				</Box>);
			break;
		default:
			return (<></>);
		}
	}

	return (
		<>
			<Box sx={{width: '1091px', margin: '0 auto', display: 'flex', flexDirection: 'row'}}>
				<TextField
					sx={{width: '529px', marginRight: '32px', marginTop: '32px'}}
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
