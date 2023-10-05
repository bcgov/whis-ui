import Expandable from '../../pageElements/Expandable';
import {Box, Button, MenuItem, TextField, Typography} from '@mui/material';
import React, {useEffect, useReducer, useState} from 'react';
import useCodeTable from '../../../hooks/useCodeTable';
import PersonnelTable from './PersonnelTable';
import PersonnelDialog from './PersonnelDialog';
import CodeLookup from '../../util/CodeLookup';
import ConfirmDialog from '../../util/ConfirmDialog';
import CancelDialog from '../../util/CancelDialog';
import _ from "lodash";
import Debug from "../../util/Debug";
import ContactDisplay from "../../contact/ContactDisplay";

const Purpose = ({expansionEvent, wildlifeHealthId, applyChanges}) => {
	const [addRequesterDialogOpen, setAddRequesterDialogOpen] = useState(false);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

	const {mappedCodes: purposes} = useCodeTable('purpose');

	function buildInitialLocalState(seed) {
		return {
			primaryPurpose: seed.primaryPurpose?.code || '',
			secondaryPurpose: seed.secondaryPurpose?.code || '',
			associatedProject: seed.associatedProject || '',
			associatedProjectDetails: seed.associatedProjectDetails || ''
		};
	}

	function formReducerInit(seed) {
		return buildInitialLocalState(seed);
	}

	function formReducer(state, action) {
		let updatedState = {...state};

		switch (action.type) {
		case 'reset':
			updatedState = {...buildInitialLocalState(wildlifeHealthId)};
			break;
		case 'fieldChange':
			_.set(updatedState, action.payload.field, action.payload.value);
			break;
		}

		return updatedState;
	}

	const [localState, localDispatch] = useReducer(formReducer, wildlifeHealthId, formReducerInit);


	const [dirty, setDirty] = useState(false);
	useEffect(() => {
		const compareBasis = buildInitialLocalState(wildlifeHealthId);
		setDirty(!_.isEqual(compareBasis, localState));
	}, [wildlifeHealthId, localState]);


	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'card'}>
			<Expandable.Title>
				<span className='cardSubtitle'>
					<Typography>Purpose</Typography>
				</span>
				<Box className='info'>
					<span>
						<Typography variant='body2'>Primary Purpose</Typography>
						<Typography variant='body1'>
							<CodeLookup codeTable={'purpose'} code={wildlifeHealthId.primaryPurpose?.code}/>
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Debug item={localState}/>
				<Box className='cardDetails'>
					<Typography className='detailsSubtitle'>WLH ID information</Typography>
					<TextField
						className='priPurpose'
						select
						label='Primary Purpose'
						value={localState.primaryPurpose}
						onChange={e => {
							localDispatch({
								type: 'fieldChange',
								payload: {
									field: 'primaryPurpose',
									value: e.target.value
								}
							});
						}}
					>
						{purposes.map((m) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						className='secPurpose'
						select
						label='Secondary Purpose'
						value={localState.secondaryPurpose}
						onChange={e => {
							localDispatch({
								type: 'fieldChange',
								payload: {
									field: 'secondaryPurpose',
									value: e.target.value
								}
							});
						}}
					>
						{purposes.map((m) => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>

					<TextField
						className='project'
						label='Associated Project'
						id='associatedProject'
						name='associatedProject'
						value={localState.associatedProject}
						onChange={e => {
							localDispatch({
								type: 'fieldChange',
								payload: {
									field: 'associatedProject',
									value: e.target.value
								}
							});
						}}
					/>
					<TextField
						className='projectDetails'
						label='Project Details'
						id='projectDetails'
						name='projectDetails'
						multiline
						rows={3}
						value={localState.associatedProjectDetails}
						onChange={e => {
							localDispatch({
								type: 'fieldChange',
								payload: {
									field: 'associatedProjectDetails',
									value: e.target.value
								}
							});
						}}
					/>

					<Box>
						<Typography className='detailsSubtitle'>Requester</Typography>
					</Box>
					<ContactDisplay contact={wildlifeHealthId.requester}/>
				</Box>
				<ConfirmDialog
					open={confirmDialogOpen}
					close={() => {
						setConfirmDialogOpen(false);
					}}
					acceptAction={() => {
						applyChanges('purpose', localState);
						setConfirmDialogOpen(false);
					}}
					title={'Update Confirmation'}
					content={'Would you like to save your changes?'}
				/>
				<CancelDialog
					open={cancelDialogOpen}
					close={() => {
						setCancelDialogOpen(false);
					}}
					acceptAction={() => localDispatch({type: 'reset'})}
					title={'Cancel WLH ID Purpose Update'}
					content={'You have not saved your changes. Are you sure you want to cancel?'}
				/>
				<Box className='cardButtons'>
					<Button
						disabled={!dirty} variant={'contained'} className='update_btn' onClick={() => {
						setConfirmDialogOpen(true);
					}}
					>
						Update
					</Button>
					<Button
						disabled={!dirty} variant={'outlined'} className='update_btn' onClick={() => {
						setCancelDialogOpen(true);
					}}
					>
						Cancel
					</Button>
				</Box>

			</Expandable.Detail>
		</Expandable>
	);
};

export default Purpose;
