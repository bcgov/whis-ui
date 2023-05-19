import React, {useEffect, useReducer, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import '../../../styles/updateID.scss';
import {useSelector} from '../../../../state/utilities/use_selector';
import {selectCodeTables} from '../../../../state/reducers/code_tables';
import {ExpansionOverrideEvent} from '../../pageElements/Expandable';
import Status from './Status';
import Purpose from './Purpose';
import AnimalDetails from './AnimalDetails';
import Loading from '../../util/Loading';
import _ from 'lodash';
import EventsContainer from './EventsContainer';
import {useDispatch} from 'react-redux';
import {WILDLIFE_HEALTH_ID_PERSIST_REQUEST} from '../../../../state/actions';
import {useParams} from 'react-router';
import AddEventConfirm from './AddEventConfirm';
import NewEventFormDialog from './NewEventFormDialog';
import Debug from "../../util/Debug";

const EditForm = ({wildlifeHealthId}) => {
	const dispatch = useDispatch();
	const {id} = useParams();

	const [addEventConfirmationDialogOpen, setAddEventConfirmationDialogOpen] = useState(false);
	const [newEventFormDialogOpen, setNewEventFormDialogOpen] = useState(false);

	function resetState() {
		// return the state of the form to whatever was last received from the api
		// we could do fancier undo-tracking given the use of a reduce/dispatch pattern on this form if desired
		localDispatch({
			type: 'reset',
		});
	}

	function saveState() {
		// this is redux-store dispatch, not form-local dispatch
		dispatch({
			type: WILDLIFE_HEALTH_ID_PERSIST_REQUEST,
			payload: {
				id,
				state: localState.formState
			}
		});
	}

	function formReducerInit(initialState) {

		return {
			initialState: _.cloneDeep(initialState),
			formState: _.cloneDeep(initialState),
			dirty: false
		};
	}

	function formReducer(state, action) {
		const updatedState = {...state};

		switch (action.type) {
		case 'reset':
			updatedState.formState = _.cloneDeep(updatedState.initialState);
			break;
		case 'fieldChange':
			// for simple field changes
			_.set(updatedState.formState, action.payload.field, action.payload.value);
			break;
		case 'status.statusChange':
			updatedState.formState.status.dirty.status = action.payload;
			if (action.payload === 'RETIRED') {
				updatedState.formState.status.dirty.additionalAttributes.recaptureKitsReturned = false;
			}
			break;
		case 'status.promote':
			updatedState.formState.status.history.push({
				status: state.status.dirty.status,
				reason: state.status.dirty.reason,
				additionalAttributes: state.status.dirty.additionalAttributes,
				changedAt: new Date()
			});
			updatedState.formState.status.dirty = {
				status: '',
				reason: '',
				additionalAttributes: {}
			};
			break;
		case 'animalDetails.identifiers.typeChange':
			updatedState.formState.animalDetails.identifiers[action.payload.index].type = action.payload.newType;
			break;
		case 'animalDetails.identifiers.valueChange':
			updatedState.formState.animalDetails.identifiers[action.payload.index].identifier = action.payload.newValue;
			break;
		case 'animalDetails.identifiers.additionalAttributesChange':
			// some types of identifier (eg. ear tags have additional attributes beyond identifier)
			updatedState.formState.animalDetails.identifiers[action.payload.index].additionalAttributes = action.payload.newAttributes;
			break;
		case 'animalDetails.identifiers.delete':
			updatedState.formState.animalDetails.identifiers.splice(action.payload.index, 1);
			break;
		case 'animalDetails.identifiers.add':
			updatedState.formState.animalDetails.identifiers.push({
				type: '',
				identifier: '',
				additionalAttributes: {}
			});
			break;
		case 'events.copyFromRequester':
			updatedState.formState.events[action.payload.eventIndex].submitters.push({...state.purpose.requester});
			break;
		case 'events.add':
			updatedState.formState.events.push({
				type: 'capture',
				ageClass: '',
				startDate: '',
				submitters: [],
				locations: [],
				additionalAttributes: {},
				history: ''
			});
			break;
		case 'locations.add':
			updatedState.formState.events[action.payload.eventIndex].locations.push({
				type: '',
				attributes: {}
			});
			break;
		case 'locations.delete':
			updatedState.formState.events[action.payload.eventIndex].locations.splice(action.payload.locationIndex, 1);
			break;
		case 'submitters.add':
			updatedState.formState.events[action.payload.eventIndex].submitters.push(action.payload.submitter);
			break;
		case 'submitters.delete':
			updatedState.formState.events[action.payload.eventIndex].submitters.splice(action.payload.submitterIndex, 1);
			break;
		}

		switch (action.type) {
		case 'reset':
			updatedState.dirty = false;
			break;
		default:
			updatedState.dirty = true;
		}
		return updatedState;
	}

	const [localState, localDispatch] = useReducer(formReducer, wildlifeHealthId, formReducerInit);

	const {tables, initialized: codeTablesInitialized} = useSelector(selectCodeTables);

	useEffect(() => {
		if (!codeTablesInitialized) {
			return;
		}
	}, [tables, codeTablesInitialized]);

	const [expansionEvent, setExpansionEvent] = useState<ExpansionOverrideEvent>({
		event: 'none',
		id: 0
	});

	if (!codeTablesInitialized) {
		return <Loading/>;
	}

	if (!localState?.formState?.metadata?.wildlifeHealthId) {
		return <Loading/>;
	}

	return (
		<Box className='container'>
			<Box className='pageHead'>
				<Box className='mainTitle'>
					<Typography variant='h1'>WLH ID {localState.formState.metadata.wildlifeHealthId}</Typography>
					<Typography variant='h6'>Update the WLH ID details and events.</Typography>
				</Box>

				<Button
					variant={'contained'}
					onClick={() => {
						if (localState.formState.events.length > 0) {
							// confirmation is required
							setAddEventConfirmationDialogOpen(true);
						} else {
							// just add it
							setNewEventFormDialogOpen(true);
						}
					}}
				>
					+ Add New Event
				</Button>
			</Box>

			<NewEventFormDialog
				open={newEventFormDialogOpen}
				acceptAction={() => {
					localDispatch({
						type: 'events.add'
					});
				}}
				cancelAction={() => {
					setNewEventFormDialogOpen(false);
				}}
				resetState={resetState}
				saveState={saveState}
				state={localState.formState}
			/>

			<AddEventConfirm
				open={addEventConfirmationDialogOpen}
				cancelAction={() => {
					setAddEventConfirmationDialogOpen(false);
				}}
				acceptAction={() => {
					localDispatch({
						type: 'events.add'
					});
					setAddEventConfirmationDialogOpen(false);
				}}
			/>
			<Box className='expandButtons'>
				<Button
					variant='outlined'
					className='expand_btn'
					onClick={() => {
						setExpansionEvent({event: 'expandAll', id: expansionEvent.id + 1});
					}}
				>
					Expand All
				</Button>
				<Button
					variant='outlined'
					className='expand_btn'
					onClick={() => {
						setExpansionEvent({event: 'collapseAll', id: expansionEvent.id + 1});
					}}
				>
					Collapse All
				</Button>
			</Box>
			<Debug title={'redux store state'} item={wildlifeHealthId}/>
			<Debug title={'local state'} item={localState}/>
			<Status
				dirty={localState.dirty}
				expansionEvent={expansionEvent}
				dispatch={localDispatch}
				state={localState.formState}
				saveState={saveState}
				resetState={resetState}
			/>

			<AnimalDetails
				dirty={localState.dirty}
				expansionEvent={expansionEvent}
				dispatch={localDispatch}
				state={localState.formState}
				saveState={saveState}
				resetState={resetState}
			/>

			<EventsContainer
				dirty={localState.dirty}
				dispatch={localDispatch}
				expansionEvent={expansionEvent}
				state={localState.formState}
				saveState={saveState}
				resetState={resetState}
			/>
			<Purpose
				dirty={localState.dirty}
				expansionEvent={expansionEvent}
				dispatch={localDispatch}
				state={localState.formState}
				saveState={saveState}
				resetState={resetState}
			/>
		</Box>
	);
};
export default EditForm;
