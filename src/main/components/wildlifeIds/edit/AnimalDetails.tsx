import Expandable from '../../pageElements/Expandable';
import {Box, Button, MenuItem, TextField, Typography} from '@mui/material';
import IdentifierEntry from './IdentifierEntry';
import React, {useEffect, useReducer, useState} from 'react';
import CodeLookup from '../../util/CodeLookup';
import CancelDialog from '../../util/CancelDialog';
import ConfirmDialog from '../../util/ConfirmDialog';
import TaxonomySearch from "../../util/TaxonomySearch";
import {useSelector} from "../../../../state/utilities/use_selector";
import Loading from "../../util/Loading";
import _ from "lodash";
import Debug from "../../util/Debug";

const AnimalDetails = ({expansionEvent, wildlifeHealthId, applyChanges}) => {

	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

	const {
		region: regions,
		animal_sex: sexes
	} = useSelector(state => state.CodeTables.tables);

	const {initialized: codeTablesLoaded} = useSelector(state => state.CodeTables);

	if (!codeTablesLoaded) {
		return (<Loading/>);
	}

	function buildInitialLocalState(seed) {
		return {
			species: seed.species?.taxonomyId || null,
			region: seed.region?.id || null,
			animalSex: seed.animalSex?.code || null,
			identifiers: _.cloneDeep(seed.identifiers).map(a => {
				delete a['id'];
				return a;
			})
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
		case 'identifiers.typeChange':
			updatedState.identifiers[action.payload.index].type = action.payload.newType;
			break;
		case 'identifiers.valueChange':
			updatedState.identifiers[action.payload.index].identifier = action.payload.newValue;
			break;
		case 'identifiers.additionalAttributesChange':
			updatedState.identifiers[action.payload.index][action.payload.attribute] = action.payload.newValue;
			break;
		case 'identifiers.delete':
			updatedState.identifiers.splice(action.payload.index, 1);
			break;
		case 'identifiers.add':
			updatedState.identifiers.push({
				type: '',
				identifier: '',
			});
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
					<Typography>Animal Details</Typography>
				</span>
				<Box className='info'>
					<span>
						<Typography variant='body2'>Species</Typography>
						<Typography variant='body1'>{wildlifeHealthId.species?.englishName}</Typography>
					</span>
					<span>
						<Typography variant='body2'>Sex</Typography>
						<Typography variant='body1'>
							<CodeLookup codeTable={'animal_sex'} code={wildlifeHealthId.animalSex?.code}/>
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>Home Region</Typography>
						<Typography variant='body1'>
							<CodeLookup codeTable={'region'} code={wildlifeHealthId.region?.id}/>
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Debug item={localState}/>

				<Box className='cardDetails'>
					<TaxonomySearch
						onValueChange={v => {
							localDispatch({
								type: 'fieldChange',
								payload: {
									field: 'species',
									value: v.id
								}
							});
						}
						}
						className='species'
						value={localState.species}
					/>

					<TextField
						select
						className='leftColumn'
						label='Home Region'
						id='region'
						value={localState.region || ''}
						onChange={e => {
							localDispatch({
								type: 'fieldChange',
								payload: {
									field: 'region',
									value: e.target.value
								}
							});
						}}
					>
						{regions.codes.map(r => (
							<MenuItem key={r.code} value={r.code}>
								{r.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						className='rightColumn'
						id='sex'
						label='Sex'
						value={localState.animalSex || ''}
						onChange={e => {
							localDispatch({
								type: 'fieldChange',
								payload: {
									field: 'animalSex',
									value: e.target.value
								}
							});
						}}
					>
						{sexes.codes.map(m => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
					<Box className='identifier'>
						{localState.identifiers.map((identifier, index) => (
							<Box className='identifierEntry'>
								<IdentifierEntry identifier={identifier} index={index} dispatch={localDispatch}/>
							</Box>
						))}
					</Box>
					<Button
						variant='outlined'
						className='addIdentifier'
						onClick={() => {
							localDispatch({
								type: 'identifiers.add'
							});
						}}
					>
						+ Add Identifier Types
					</Button>
				</Box>

				<ConfirmDialog
					open={confirmDialogOpen}
					close={() => {
						localDispatch({type: 'reset'})
						setConfirmDialogOpen(false);
					}}
					acceptAction={() => {
						applyChanges('details', localState);
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
					acceptAction={() => {
						localDispatch({type: 'reset'})
						setCancelDialogOpen(false);
					}}
					title={'Cancel WLH ID Animal Details Update'}
					content={'You have not saved your changes. Are you sure you want to cancel?'}
				/>

				<Box className='cardButtons'>
					<Button
						disabled={!dirty}
						variant={'contained'}
						className='update_btn'
						onClick={() => {
							setConfirmDialogOpen(true)
						}}
					>
						Update
					</Button>
					<Button
						disabled={!dirty}
						variant={'outlined'}
						className='update_btn'
						onClick={() => {
							setCancelDialogOpen(true)
						}}
					>
						Cancel
					</Button>
				</Box>

			</Expandable.Detail>
		</Expandable>
	);
};

export default AnimalDetails;
