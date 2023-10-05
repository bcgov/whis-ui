import React, {useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import '../../../styles/updateID.scss';
import {useSelector} from '../../../../state/utilities/use_selector';
import {selectCodeTables} from '../../../../state/reducers/code_tables';
import {ExpansionOverrideEvent} from '../../pageElements/Expandable';
import AnimalDetails from './AnimalDetails';
import Loading from '../../util/Loading';
import {useDispatch} from 'react-redux';
import {WILDLIFE_HEALTH_ID_APPLY_CHANGES_REQUEST, WILDLIFE_HEALTH_ID_PERSIST_REQUEST} from '../../../../state/actions';
import {useParams} from 'react-router';
import AddEventConfirm from './AddEventConfirm';
import NewEventFormDialog from './NewEventFormDialog';
import Debug from "../../util/Debug";
import Status from "./Status";
import EventsContainer from "./EventsContainer";
import Purpose from "./Purpose";

const EditForm = ({wildlifeHealthId}) => {
	const dispatch = useDispatch();
	const {id} = useParams();

	const [addEventConfirmationDialogOpen, setAddEventConfirmationDialogOpen] = useState(false);
	const [newEventFormDialogOpen, setNewEventFormDialogOpen] = useState(false);


	const {initialized: codeTablesInitialized} = useSelector(selectCodeTables);

	const [expansionEvent, setExpansionEvent] = useState<ExpansionOverrideEvent>({
		event: 'none',
		id: 0
	});

	function applyChanges(facet, changes) {
		dispatch({
			type: WILDLIFE_HEALTH_ID_APPLY_CHANGES_REQUEST,
			payload: {
				id,
				facet,
				changesToApply: changes
			}
		});
	}

	if (!codeTablesInitialized) {
		return <Loading/>;
	}

	return (
		<Box className='container'>
			<Box className='pageHead'>
				<Box className='mainTitle'>
					<Typography variant='h1'>WLH ID {wildlifeHealthId.wildlifeHealthId}</Typography>
					<Typography variant='h6'>Update the WLH ID details and events.</Typography>
				</Box>

				<Debug item={wildlifeHealthId}/>


			</Box>

			{/*<NewEventFormDialog*/}
			{/*	open={newEventFormDialogOpen}*/}
			{/*	acceptAction={() => {*/}
			{/*		localDispatch({*/}
			{/*			type: 'events.add'*/}
			{/*		});*/}
			{/*	}}*/}
			{/*	cancelAction={() => {*/}
			{/*		setNewEventFormDialogOpen(false);*/}
			{/*	}}*/}
			{/*	resetState={resetState}*/}
			{/*	saveState={saveState}*/}
			{/*	state={localState.formState}*/}
			{/*/>*/}

			{/*<AddEventConfirm*/}
			{/*	open={addEventConfirmationDialogOpen}*/}
			{/*	cancelAction={() => {*/}
			{/*		setAddEventConfirmationDialogOpen(false);*/}
			{/*	}}*/}
			{/*	acceptAction={() => {*/}
			{/*		localDispatch({*/}
			{/*			type: 'events.add'*/}
			{/*		});*/}
			{/*		setAddEventConfirmationDialogOpen(false);*/}
			{/*	}}*/}
			{/*/>*/}

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

			{/*<Status*/}
			{/*	expansionEvent={expansionEvent}*/}
			{/*	dirty={false}*/}
			{/*/>*/}


			<AnimalDetails
				expansionEvent={expansionEvent}
				wildlifeHealthId={wildlifeHealthId}
				applyChanges={applyChanges}
			/>

			<EventsContainer
				expansionEvent={expansionEvent}
				wildlifeHealthId={wildlifeHealthId}
				applyChanges={applyChanges}
			/>

			<Purpose
				expansionEvent={expansionEvent}
				applyChanges={applyChanges}
				wildlifeHealthId={wildlifeHealthId}
			/>
		</Box>
	);
};
export default EditForm;
