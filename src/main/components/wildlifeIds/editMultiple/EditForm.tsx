import React, {useEffect, useReducer, useState} from 'react';
import {Box, Button, Typography} from '@mui/material';
import '../../../styles/updateID.scss';
import {ExpansionOverrideEvent} from '../../pageElements/Expandable';
import Status from './Status';
import _ from 'lodash';
import AnimalDetails from './AnimalDetails';
import Purpose from './Purpose';
const EditForm = () => {
	
	const [addEventConfirmationDialogOpen, setAddEventConfirmationDialogOpen] = useState(false);

	const [expansionEvent, setExpansionEvent] = useState<ExpansionOverrideEvent>({
		event: 'none',
		id: 0
	});


	return (
		<Box className="container">
			<Box className="pageHead">
				<Box className="mainTitle">
					<Typography>Multiple WLH ID [2200001-2200010]</Typography>
					<Typography>Update the WLH ID status,details and events.</Typography>
				</Box>

				<Button
					variant={'contained'}
					onClick={() => {
						setAddEventConfirmationDialogOpen(true);
					}}
				>
					+ Add New Event
				</Button>
			</Box>

			{/* <AddEventConfirm
				open={addEventConfirmationDialogOpen}
				cancelAction={() => {
					setAddEventConfirmationDialogOpen(false);
				}}
				acceptAction={() => {
					formDispatch({
						type: 'events.add'
					});
					setAddEventConfirmationDialogOpen(false);
				}}
			/> */}

			<Box className="expandButtons">
				<Button
					variant="outlined"
					className="expand_btn"
					onClick={() => {
						setExpansionEvent({event: 'expandAll', id: expansionEvent.id + 1});
					}}
				>
					Expand All
				</Button>
				<Button
					variant="outlined"
					className="expand_btn"
					onClick={() => {
						setExpansionEvent({event: 'collapseAll', id: expansionEvent.id + 1});
					}}
				>
					Collapse All
				</Button>
			</Box>

			<Status expansionEvent={expansionEvent}  />

			<AnimalDetails expansionEvent={expansionEvent} />
			
			{/* <EventsContainer state={formState} dispatch={formDispatch} expansionEvent={expansionEvent} saveState={saveState} resetState={resetState} /> */}

			<Purpose expansionEvent={expansionEvent} />
		</Box>
	);
};
export default EditForm;
