import React from 'react';
import {Box, FormControlLabel, FormGroup, IconButton, MenuItem, Radio, RadioGroup, TextField} from '@mui/material';
import { useForm } from 'react-hook-form';
import ValidationError from '../../util/ValidationError';
import TrashBinIcon from '../../util/TrashBinIcon';

/*
	File @todo: colors from code table, move valid identifier types to code table, fix labels, harmonize styling
 */
const IdentifierEntry = ({identifier, index, dispatch, showUpdateButtons}) => {
	const {
		register,
		formState: {errors},
		clearErrors
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
		{value: 'COLOR_ID', label: 'Color ID'}
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
			case 'COLOR_ID':
				return (
					<Box className="oneColumnContainer">
						<FormGroup>
							<TextField
								label="Identifier"
								id="identifier"
								name="identifier"
								value={identifier.identifier}
								required
								{...register('identifier', {
									required: 'Enter the identifier.',
									onChange(e) {
										dispatch({
											type: 'animalDetails.identifiers.valueChange',
											payload: {
												index,
												newValue: e.target.value
											}
										});
										showUpdateButtons();
									}
								})}
								error={!!errors?.identifier}
							/>
							<ValidationError hidden={!errors?.identifier} message={errors.identifier?.message} />
						</FormGroup>
						<IconButton
							onClick={e => {
								dispatch({
									type: 'animalDetails.identifiers.delete',
									payload: {
										index
									}
								});
								showUpdateButtons();
							}}
						>
							<TrashBinIcon/>
						</IconButton>
					</Box>
				);
				break;
			case 'EAR_TAG':
			case 'RAPP_TAG':
				return (
					<Box className="earTag">
						<FormGroup>
							<TextField
								label="Identifier"
								id="identifier"
								name="identifier"
								value={identifier.identifier}
								required
								{...register('identifier', {
									required: 'Enter the identifier.',
									onChange(e) {
										dispatch({
											type: 'animalDetails.identifiers.valueChange',
											payload: {
												index,
												newValue: e.target.value
											}
										});
										showUpdateButtons();
									}
								})}
								error={!!errors?.identifier}
							/>
							<ValidationError hidden={!errors?.identifier} message={errors.identifier?.message} />
						</FormGroup>
						<TextField
							id="color"
							label="Color"
							required
							value={identifier.additionalAttributes?.color || ''}
							onChange={e => {
								dispatch({
									type: 'animalDetails.identifiers.additionalAttributesChange',
									payload: {
										index,
										newAttributes: {
											...identifier.additionalAttributes,
											color: e.target.value
										}
									}
								});
								showUpdateButtons();
							}}
						></TextField>
						<RadioGroup
							name="controlled-radio-buttons-group"
							value={identifier.additionalAttributes?.taggedEar || ''}
							onChange={e => {
								dispatch({
									type: 'animalDetails.identifiers.additionalAttributesChange',
									payload: {
										index,
										newAttributes: {
											...identifier.additionalAttributes,
											taggedEar: e.target.value
										}
									}
								});
								showUpdateButtons();
							}}
						>
							<FormControlLabel value="left" control={<Radio />} label="Left" />
							<FormControlLabel value="right" control={<Radio />} label="Right" />
						</RadioGroup>
						<IconButton
							onClick={e => {
								dispatch({
									type: 'animalDetails.identifiers.delete',
									payload: {
										index
									}
								});
								showUpdateButtons();
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
		<Box className="identifierContainer">
			<TextField
				select
				className="identifierSelect"
				id="identifier"
				name="identifier"
				label="Identifier Types"
				value={identifier.type}
				onChange={e => {
					dispatch({
						type: 'animalDetails.identifiers.typeChange',
						payload: {
							index,
							newType: e.target.value
						}
					});
					showUpdateButtons();
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
