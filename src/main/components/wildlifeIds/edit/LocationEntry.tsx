import React, {useEffect, useState} from 'react';
import {Box, FormGroup, IconButton, MenuItem, TextField} from '@mui/material';
import TrashBinIcon from '../../util/TrashBinIcon';
import ValidationError from '../../util/ValidationError';
import {useForm} from 'react-hook-form';
import useCodeTable from "../../../hooks/useCodeTable";

const LocationEntry = ({location, formDispatch, eventIndex, locationIndex}) => {
	const [path, setPath] = useState(`[${eventIndex}].locations[${locationIndex}]`);

	useEffect(() => {
		setPath(`[${eventIndex}].locations[${locationIndex}]`);
	}, [eventIndex, locationIndex]);

	function deleteAction() {
		formDispatch({
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
		{value: 'COORDINATES', label: 'Latitude/ Longitude (in decimal degrees)'},
		{value: 'UTM_COORDINATES', label: 'UTM Coordinates'},
		{value: 'CITY', label: 'City'},
		{value: 'CIVIC_ADDRESS', label: 'Civic Address'}
	];

	const {mappedCodes: regions} = useCodeTable('region');
	const {mappedCodes: populationUnits} = useCodeTable('population_unit');
	const {mappedCodes: managementUnits} = useCodeTable('management_unit');

	const {
		register,
		formState: {errors},
		clearErrors
	} = useForm({mode: 'onChange'});

	function renderDetailed() {
		switch (location.type) {
		case 'REGION':
			return (
				<Box className='oneColumnContainer'>
					<FormGroup>
						<TextField
							id='region'
							select
							label='Region'
							value={location.region || ''}
							required
							{...register('region', {
								required: 'Enter the region.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.region`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.region}
						>
							{regions.map((m) => (
								<MenuItem key={m.code} value={m.code}>
									{m.name}
								</MenuItem>
							))}
						</TextField>
						<ValidationError hidden={!errors?.region} message={errors.region?.message}/>
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
		case 'MANAGEMENT_UNIT':
			return (
				<Box className='oneColumnContainer'>
					<FormGroup>
						<TextField
							id='m_unit'
							select
							label='Management Unit'
							value={location.managementUnit || ''}
							required
							{...register('m_unit', {
								required: 'Enter the management unit.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.managementUnit`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.m_unit}
						>
							{managementUnits.map((m) => (
								<MenuItem key={m.code} value={m.code}>
									{m.name}
								</MenuItem>
							))}
						</TextField>
						<ValidationError hidden={!errors?.m_unit} message={errors.m_unit?.message}/>
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
		case 'POPULATION_UNIT':
			return (
				<Box className='oneColumnContainer'>
					<FormGroup>
						<TextField
							id='p_unit'
							select
							required
							label='Population Unit'
							value={location.populationUnit || ''}
							{...register('p_unit', {
								required: 'Enter the population unit.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.populationUnit`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.p_unit}
						>
							{populationUnits.map((m) => (
								<MenuItem key={m.code} value={m.code}>
									{m.name}
								</MenuItem>
							))}
						</TextField>
						<ValidationError hidden={!errors?.p_unit} message={errors.p_unit?.message}/>
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
		case 'HERD_NAME':
			return (
				<Box className='oneColumnContainer'>
					<FormGroup>
						<TextField
							label='Herd Name'
							required
							value={location.herdName || ''}
							{...register('herdName', {
								required: 'Enter the herd name.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.herdName`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.herdName}
						/>
						<ValidationError hidden={!errors?.herdName} message={errors.herdName?.message}/>
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
		case 'COORDINATES':
			return (
				<Box className='twoColumnContainer'>
					<FormGroup>
						<TextField
							className='firstColumn'
							label='Latitude'
							required
							value={location.latitude || ''}
							{...register('latitude', {
								required: 'Enter the latitude.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.latitude`,
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
							className='secondColumn'
							label='Longitude'
							required
							value={location.longitude || ''}
							{...register('longitude', {
								required: 'Enter the longitude.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.longitude`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.longitude}
						/>
						<ValidationError hidden={!errors?.longitude} message={errors.longitude?.message}/>
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
		case 'UTM_COORDINATES':
			return (
				<Box className='threeColumnContainer'>
					<FormGroup>
						<TextField
							className='leftColumns'
							label='Zone'
							required
							value={location.zone || ''}
							{...register('zone', {
								required: 'Enter the zone.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.zone`,
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
							className='leftColumns'
							label='Easting'
							required
							value={location.easting || ''}
							{...register('easting', {
								required: 'Enter the easting.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.easting`,
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
							label='Northing'
							required
							value={location.northing || ''}
							{...register('northing', {
								required: 'Enter the northing.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.northing`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.northing}
						/>
						<ValidationError hidden={!errors?.northing} message={errors.northing?.message}/>
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
		case 'CITY':
			return (
				<Box className='oneColumnContainer'>
					<FormGroup>
						<TextField
							label='City'
							required
							value={location.city || ''}
							{...register('city', {
								required: 'Enter the city name.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.city`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.city}
						/>
						<ValidationError hidden={!errors?.city} message={errors.city?.message}/>
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
		case 'CIVIC_ADDRESS':
			return (
				<Box className='twoColumnContainer'>
					<FormGroup>
						<TextField
							label='City'
							className={'firstColumn'}
							required
							value={location.city || ''}
							{...register('city', {
								required: 'Enter the city name.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.city`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.city}
						/>
						<ValidationError hidden={!errors?.city} message={errors.city?.message}/>
					</FormGroup>
					<FormGroup>
						<TextField
							label='Civic Address'
							className={'secondColumn'}
							required
							value={location.civicAddress || ''}
							{...register('civicAddress', {
								required: 'Enter the civic address name.',
								onChange(e) {
									formDispatch({
										type: 'fieldChange',
										payload: {
											field: `${path}.civicAddress`,
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.civicAddress}
						/>
						<ValidationError hidden={!errors?.civicAddress} message={errors.civicAddress?.message}/>
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
		default:
			return <>Unrecognized location type {location.type}</>;
		}
	}

	return (
		<>
			<Box className='locationsContainer'>
				<TextField
					className='locationSelect'
					id='location'
					name='location'
					label='Add Location'
					select
					value={location.type}
					onChange={e => {
						formDispatch({
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
