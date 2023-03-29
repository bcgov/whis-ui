import React, {useEffect, useState} from 'react';
import {Box, FormGroup, IconButton, MenuItem, TextField} from '@mui/material';
import TrashBinIcon from '../../util/TrashBinIcon';
import ValidationError from '../../util/ValidationError';
import {useForm} from 'react-hook-form';

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

	const {
		register,
		formState: {errors},
		clearErrors
	} = useForm({mode: 'onChange'});

	function renderDetailed() {
		switch (location.type) {
		case 'REGION':
			return (
				<Box className="twoColumnContainer">
					<FormGroup>
						<TextField
							label="Region Number"
							id="regionNumber"
							className="firstColumn"
							value={location.attributes.regionNumber || ''}
							required
							{...register('regionNumber', {
								required: 'Enter the region number.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.regionNumber`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.regionNumber}
						/>
						<ValidationError hidden={!errors?.regionNumber} message={errors.regionNumber?.message}/>
					</FormGroup>
					<FormGroup>
						<TextField
							className="secondColumn"
							label="Region Name"
							id="regionName"
							value={location.attributes.regionName || ''}
							required
							{...register('regionName', {
								required: 'Enter the region name.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.regionName`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.regionName}
						/>
						<ValidationError hidden={!errors?.regionName} message={errors.regionName?.message}/>
					</FormGroup>

					<IconButton
						onClick={() => {
							deleteAction();
						}}
					>
						<TrashBinIcon/>
					</IconButton>
				</Box>
			);
			break;
		case 'MANAGEMENT_UNIT':
			return (
				<Box className="oneColumnContainer">
					<FormGroup>
						<TextField
							id="m_unit"
							select
							label="Management Unit"
							value={location.attributes.managementUnit || ''}
							required
							{...register('m_unit', {
								required: 'Enter the management unit.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.managementUnit`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.m_unit}
						>
							{managementUnits.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<ValidationError hidden={!errors?.m_unit} message={errors.m_unit?.message}/>
					</FormGroup>

					<IconButton onClick={() => {
						deleteAction();
					}}>
						<TrashBinIcon/>
					</IconButton>
				</Box>
			);
			break;
		case 'POPULATION_UNIT':
			return (
				<Box className="oneColumnContainer">
					<FormGroup>
						<TextField
							id="p_unit"
							select
							required
							label="Population Unit"
							value={location.attributes.populationUnit || ''}
							{...register('p_unit', {
								required: 'Enter the population unit.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.populationUnit`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.p_unit}
						>
							{populationUnits.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<ValidationError hidden={!errors?.p_unit} message={errors.p_unit?.message}/>
					</FormGroup>
					<IconButton onClick={() => {
						deleteAction();
					}}>
						<TrashBinIcon/>
					</IconButton>
				</Box>
			);
			break;
		case 'HERD_NAME':
			return (
				<Box className="oneColumnContainer">
					<FormGroup>
						<TextField
							label="Herd Name"
							required
							value={location.attributes.herdName || ''}
							{...register('herdName', {
								required: 'Enter the herd name.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.herdName`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.herdName}
						/>
						<ValidationError hidden={!errors?.herdName} message={errors.herdName?.message}/>
					</FormGroup>
					<IconButton onClick={() => {
						deleteAction();
					}}>
						<TrashBinIcon/>
					</IconButton>
				</Box>
			);
			break;
		case 'LATITUDE':
			return (
				<Box className="twoColumnContainer">
					<FormGroup>
						<TextField
							className="firstColumn"
							label="Latitude"
							required
							value={location.attributes.latitude || ''}
							{...register('latitude', {
								required: 'Enter the latitude.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.latitude`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.latitude}
						/>
						<ValidationError hidden={!errors?.latitude} message={errors.latitude?.message}/>
					</FormGroup>
					<FormGroup>
						<TextField
							className="secondColumn"
							label="Longitude"
							required
							value={location.attributes.longitude || ''}
							{...register('longitude', {
								required: 'Enter the longitude.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.longitude`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.longitude}
						/>
						<ValidationError hidden={!errors?.longitude} message={errors.longitude?.message}/>
					</FormGroup>
					<IconButton onClick={() => {
						deleteAction();
					}}>
						<TrashBinIcon/>
					</IconButton>
				</Box>
			);
			break;
		case 'UTM_COORDINATES':
			return (
				<Box className="threeColumnContainer">
					<FormGroup>
						<TextField
							className="leftColumns"
							label="Zone"
							required
							value={location.attributes.zone || ''}
							{...register('zone', {
								required: 'Enter the zone.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.zone`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.zone}
						/>
						<ValidationError hidden={!errors?.zone} message={errors.zone?.message}/>
					</FormGroup>
					<FormGroup>
						<TextField
							className="leftColumns"
							label="Easting"
							required
							value={location.attributes.easting || ''}
							{...register('easting', {
								required: 'Enter the easting.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.easting`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.easting}
						/>
						<ValidationError hidden={!errors?.easting} message={errors.easting?.message}/>
					</FormGroup>
					<FormGroup>
						<TextField
							label="Northing"
							required
							value={location.attributes.northing || ''}
							{...register('northing', {
								required: 'Enter the northing.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.northing`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.northing}
						/>
						<ValidationError hidden={!errors?.northing} message={errors.northing?.message}/>
					</FormGroup>
					<IconButton onClick={() => {
						deleteAction();
					}}>
						<TrashBinIcon/>
					</IconButton>
				</Box>
			);
			break;
		case 'CITY':
			return (
				<Box className="oneColumnContainer">
					<FormGroup>
						<TextField
							id="cities"
							select
							required
							label="BC Cities"
							value={location.attributes.city || ''}
							{...register('city', {
								required: 'Enter the city.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.city`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.city}
						>
							{cities.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<ValidationError hidden={!errors?.city} message={errors.city?.message}/>
					</FormGroup>
					<IconButton onClick={() => {
						deleteAction();
					}}>
						<TrashBinIcon/>
					</IconButton>
				</Box>
			);
			break;
		case 'CIVIC_ADDRESS':
			return (
				<Box className="twoColumnContainer">
					<FormGroup>
						<TextField
							className="firstColumn"
							id="civic_city"
							label="City"
							select
							required
							value={location.attributes.city || ''}
							{...register('city', {
								required: 'Enter the city.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.city`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.city}
						>
							{cities.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<ValidationError hidden={!errors?.city} message={errors.city?.message}/>
					</FormGroup>
					<FormGroup>
						<TextField
							className="secondColumn"
							label="Street Address"
							required
							value={location.attributes.streetAddress || ''}
							{...register('streetAddress', {
								required: 'Enter the streetAddress.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.attributes.streetAddress`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.streetAddress}
						/>
						<ValidationError hidden={!errors?.streetAddress} message={errors.streetAddress?.message}/>
					</FormGroup>
					<IconButton onClick={() => {
						deleteAction();
					}}>
						<TrashBinIcon/>
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
