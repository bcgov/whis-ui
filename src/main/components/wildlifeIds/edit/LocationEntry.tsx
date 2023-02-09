import React, {useEffect, useState} from 'react';
import {Box, IconButton, MenuItem, TextField} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const LocationEntry = ({location, dispatch, eventIndex, locationIndex}) => {
	const [path, setPath] = useState(`events[${eventIndex}].locations[${locationIndex}]`);

	useEffect(() => {
		setPath(`events[${eventIndex}].locations[${locationIndex}]`);
	}, [eventIndex, locationIndex]);

	function deleteAction() {
		dispatch({
			type: 'locations.delete',
			payload: {
				eventIndex,
				locationIndex
			}
		});
	}

	const locationTypes = [
		{value: 'REGION', label: 'Region'},
		{value: 'MANAGEMENT_UNIT', label: 'Management Unit'},
		{value: 'POPULATION_UNIT', label: 'Population Unit'},
		{value: 'HERD_NAME', label: 'Herd Name'},
		{value: 'LATITUDE', label: 'Latitude/ Longitude (in decimal degrees)'},
		{value: 'NICKNAME', label: 'Nickname'},
		{value: 'UTM_COORDINATES', label: 'UTM Coordinates'},
		{value: 'CITY', label: 'City'},
		{value: 'CIVIC_ADDRESS', label: 'Civic Address'}
	];

	const managementUnits = [
		{value: 'M_UNIT1', label: 'Management Unit 1'},
		{value: 'M_UNIT2', label: 'Management Unit 2'},
		{value: 'M_UNIT3', label: 'Management Unit 3'},
		{value: 'M_UNIT4', label: 'Management Unit 4'},
		{value: 'M_UNIT5', label: 'Management Unit 5'}
	];
	const populationUnits = [
		{value: 'P_UNIT1', label: 'Population Unit 1'},
		{value: 'P_UNIT2', label: 'Population Unit 2'},
		{value: 'P_UNIT3', label: 'Population Unit 3'},
		{value: 'P_UNIT4', label: 'Population Unit 4'},
		{value: 'P_UNIT5', label: 'Population Unit 5'}
	];
	const cities = [
		{value: 'CITY1', label: 'City 1'},
		{value: 'CITY2', label: 'City 2'},
		{value: 'CITY3', label: 'City 3'},
		{value: 'CITY4', label: 'City 4'},
		{value: 'CITY5', label: 'City 5'}
	];

	function renderDetailed() {
		switch (location.type) {
			case 'REGION':
				return (
					<Box className="twoColumnContainer">
						<TextField
							label="Region Number"
							id="regionNumber"
							value={location.attributes.regionNumber || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.regionNumber`,
										value: e.target.value
									}
								});
							}}
						/>
						<TextField
							label="Region Name"
							id="regionName"
							value={location.attributes.regionName || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.regionName`,
										value: e.target.value
									}
								});
							}}
						/>
						<IconButton onClick={deleteAction}>
							<DeleteIcon color="primary" />
						</IconButton>
					</Box>
				);
				break;
			case 'MANAGEMENT_UNIT':
				return (
					<Box className='oneColumnContainer'>
						<TextField
							id="m_unit"
							select
							label="Management Unit"
							value={location.attributes.managementUnit || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.managementUnit`,
										value: e.target.value
									}
								});
							}}
						>
							{managementUnits.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<IconButton onClick={deleteAction}>
							<DeleteIcon color="primary" />
						</IconButton>
					</Box>
				);
				break;
			case 'POPULATION_UNIT':
				return (
					<Box className='oneColumnContainer'>
						<TextField
							id="p_unit"
							select
							label="Population Unit"
							value={location.attributes.populationUnit || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.populationUnit`,
										value: e.target.value
									}
								});
							}}
						>
							{populationUnits.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<IconButton onClick={deleteAction}>
							<DeleteIcon color="primary"/>
						</IconButton>
					</Box>
				);
				break;
			case 'HERD_NAME':
				return (
					<Box className='oneColumnContainer'>
						<TextField
							label="Herd Name"
							value={location.attributes.herdName || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.herdName`,
										value: e.target.value
									}
								});
							}}
						/>
						<IconButton  onClick={deleteAction}>
							<DeleteIcon color="primary" />
						</IconButton>
					</Box>
				);
				break;
			case 'LATITUDE':
				return (
					<Box className='threeColumnContainer'>
						<TextField
							label="Unit"
							value={location.attributes.unit || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.unit`,
										value: e.target.value
									}
								});
							}}
						/>
						<TextField
							label="Latitude"
							value={location.attributes.latitude || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.latitude`,
										value: e.target.value
									}
								});
							}}
						/>
						<TextField
							label="Longitude"
							value={location.attributes.longitude || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.longitude`,
										value: e.target.value
									}
								});
							}}
						/>
						<IconButton onClick={deleteAction}>
							<DeleteIcon color="primary"/>
						</IconButton>
					</Box>
				);
				break;
			case 'NICKNAME':
				return (
					<Box className='oneColumnContainer'>
						<TextField
							label="Nickname"
							value={location.attributes.nickName || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.nickName`,
										value: e.target.value
									}
								});
							}}
						/>
						<IconButton onClick={deleteAction}>
							<DeleteIcon color="primary"/>
						</IconButton>
					</Box>
				);
				break;
			case 'UTM_COORDINATES':
				return (
					<Box className='threeColumnContainer'>
						<TextField
							label="Zone"
							value={location.attributes.zone || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.zone`,
										value: e.target.value
									}
								});
							}}
						/>
						<TextField
							label="Easting"
							value={location.attributes.easting || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.easting`,
										value: e.target.value
									}
								});
							}}
						/>
						<TextField
							label="Northing"
							value={location.attributes.northing || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.northing`,
										value: e.target.value
									}
								});
							}}
						/>
						<IconButton onClick={deleteAction}>
							<DeleteIcon color="primary" />
						</IconButton>
					</Box>
				);
				break;
			case 'CITY':
				return (
					<Box className='oneColumnContainer'>
						<TextField
							id="cities"
							select
							label="BC Cities"
							value={location.attributes.city || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.city`,
										value: e.target.value
									}
								});
							}}
						>
							{cities.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<IconButton onClick={deleteAction}>
							<DeleteIcon color="primary"/>
						</IconButton>
					</Box>
				);
				break;
			case 'CIVIC_ADDRESS':
				return (
					<Box className='twoColumnContainer'>
						<TextField
							id="civic_city"
							select
							label="City"
							value={location.attributes.city || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.city`,
										value: e.target.value
									}
								});
							}}
						>
							{cities.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							label="Street Address"
							value={location.attributes.streetAddress || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: `${path}.attributes.streetAddress`,
										value: e.target.value
									}
								});
							}}
						/>
						<IconButton onClick={deleteAction}>
							<DeleteIcon color="primary" />
						</IconButton>
					</Box>
				);
				break;
			default:
				return <></>;
		}
	}

	return (
		<>
			<Box className="locationsContainer">
				<TextField
					className="locationSelect"
					id="location"
					name="location"
					label="Add Location"
					select
					value={location.type}
					onChange={e => {
						dispatch({
							type: 'fieldChange',
							payload: {
								field: `${path}.type`,
								value: e.target.value
							}
						});
					}}
				>
					{locationTypes.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
				{renderDetailed()}
			</Box>
		</>
	);
};

export default LocationEntry;
