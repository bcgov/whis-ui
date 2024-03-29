import React from 'react';
import {Box, FormControlLabel, FormGroup, IconButton, MenuItem, Radio, RadioGroup, TextField} from '@mui/material';
import {useForm} from 'react-hook-form';
import ValidationError from '../../util/ValidationError';
import TrashBinIcon from '../../util/TrashBinIcon';

/*
	File @todo: colors from code table, move valid identifier types to code table, fix labels, harmonize styling
 */
const IdentifierEntry = ({identifier, index, dispatch}) => {
	const {
		register,
		formState: {errors},
	} = useForm({mode: 'onChange'});

	const validIdentifier = [
		{value: 'ANIMAL_ID', label: 'Alternate Animal ID'},
		{value: 'COMPULSORY', label: 'Compulsory Inspection Number'},
		{value: 'EAR_TAG', label: 'Ear Tag Number'},
		{value: 'HUMAN_WILDLIFE', label: 'Human Wildlife Conflict Number'},
		{value: 'COORS', label: 'COORS Number'},
		{value: 'LEG_BAND', label: 'Leg Band'},
		{value: 'MICROCHIP', label: 'Microchip'},
		{value: 'NICKNAME', label: 'Nickname'},
		{value: 'PIT_TAG', label: 'Pit Tag'},
		{value: 'RAPP_TAG', label: 'RAPP Ear Tag'},
		{value: 'RECAPTURE_ID', label: 'Recapture ID'},
		{value: 'CWD', label: 'CWD Ear Card'},
		{value: 'VAGINAL', label: 'Vaginal Implant Transmitter'},
		{value: 'WING_BAND', label: 'Wing Band'},
		{value: 'COLLAR_ID', label: 'Collar ID'}
	];

	function renderDetailed() {
		switch (identifier.type) {
		case 'ANIMAL_ID':
		case 'COMPULSORY':
		case 'HUMAN_WILDLIFE':
		case 'COORS':
		case 'LEG_BAND':
		case 'MICROCHIP':
		case 'NICKNAME':
		case 'PIT_TAG':
		case 'RECAPTURE_ID':
		case 'CWD':
		case 'VAGINAL':
		case 'WING_BAND':
		case 'COLLAR_ID':
			return (
				<Box className='oneColumnContainer'>
					<FormGroup>
						<TextField
							label='Identifier'
							id='identifier'
							name='identifier'
							value={identifier.identifier}
							required
							{...register('identifier', {
								required: 'Enter the identifier.',
								onChange(e) {
									dispatch({
										type: 'identifiers.valueChange',
										payload: {
											index,
											newValue: e.target.value
										}
									});
								}
							})}
							error={!!errors?.identifier}
						/>
						<ValidationError hidden={!errors?.identifier} message={errors.identifier?.message}/>
					</FormGroup>
					<IconButton
						onClick={e => {
							dispatch({
								type: 'identifiers.delete',
								payload: {
									index
								}
							});
						}}
					>
						<TrashBinIcon/>
					</IconButton>
				</Box>
			);
			break;
		case 'EAR_TAG':
			return (
				<Box className='earTag'>
					<FormGroup>
						<TextField
							label='Identifier'
							id='identifier'
							name='identifier'
							value={identifier.identifier}
							required
							{...register('identifier', {
								required: 'Enter the identifier.',
								onChange(e) {
									dispatch({
										type: 'identifiers.valueChange',
										payload: {
											index,
											newValue: e.target.value
										}
									});
								}
							})}
							error={!!errors?.identifier}
						/>
						<ValidationError hidden={!errors?.identifier} message={errors.identifier?.message}/>
					</FormGroup>
					<TextField
						id='color'
						label='Colour'
						required
						value={identifier.colour || ''}
						onChange={e => {
							dispatch({
								type: 'identifiers.additionalAttributesChange',
								payload: {
									index,
									attribute: 'colour',
									newValue: e.target.value
								}
							});
						}}
					></TextField>
					<RadioGroup
						name='controlled-radio-buttons-group'
						value={identifier.earCode || ''}
						onChange={e => {
							dispatch({
								type: 'identifiers.additionalAttributesChange',
								payload: {
									index,
									attribute: 'earCode',
									newValue: e.target.value
								}
							});
						}}
					>
						<FormControlLabel value='L' control={<Radio/>} label='Left'/>
						<FormControlLabel value='R' control={<Radio/>} label='Right'/>
					</RadioGroup>
					<IconButton
						onClick={e => {
							dispatch({
								type: 'identifiers.delete',
								payload: {
									index
								}
							});
						}}
					>
						<TrashBinIcon/>
					</IconButton>
				</Box>
			);
			break;
		case 'RAPP_TAG':
			return (
				<Box className='rappTag'>
					<FormGroup>
						<TextField
							label='Identifier'
							id='identifier'
							name='identifier'
							value={identifier.identifier}
							required
							{...register('identifier', {
								required: 'Enter the identifier.',
								onChange(e) {
									dispatch({
										type: 'identifiers.valueChange',
										payload: {
											index,
											newValue: e.target.value
										}
									});
								}
							})}
							error={!!errors?.identifier}
						/>
						<ValidationError hidden={!errors?.identifier} message={errors.identifier?.message}/>
					</FormGroup>
					<RadioGroup
						name='controlled-radio-buttons-group'
						value={identifier.earCode || ''}
						onChange={e => {
							dispatch({
								type: 'identifiers.additionalAttributesChange',
								payload: {
									index,
									attribute: 'earCode',
									newValue: e.target.value
								}
							});
						}}
					>
						<FormControlLabel value='L' control={<Radio/>} label='Left'/>
						<FormControlLabel value='R' control={<Radio/>} label='Right'/>
					</RadioGroup>
					<IconButton
						onClick={e => {
							dispatch({
								type: 'identifiers.delete',
								payload: {
									index
								}
							});
						}}
					>
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
		<Box className='identifierContainer'>
			<TextField
				select
				className='identifierSelect'
				id='identifier'
				name='identifier'
				label='Identifier Types'
				value={identifier.type}
				onChange={e => {
					dispatch({
						type: 'identifiers.typeChange',
						payload: {
							index,
							newType: e.target.value
						}
					});
				}}
			>
				{validIdentifier.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			{renderDetailed()}
		</Box>
	);
};

export default IdentifierEntry;
