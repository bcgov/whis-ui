import React, { useState } from 'react';
import '../../../styles/updateID.scss';
import {Box, Button, IconButton, Typography} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import Status from './Status';
import Purpose from './Purpose';
import AnimalDetails from './AnimalDetails';
import Event from './Event';
import { ExpansionOverrideEvent } from '../../pageElements/Expandable';

const DetailForm = ({wildlifeHealthId, onEditButtonClick}) => {

	const [expansionEvent, setExpansionEvent] = useState<ExpansionOverrideEvent>({
		event: 'none',
		id: 0
	});

	return (
		<Box className="container">
			<Box className="pageHead">
				<Box className="mainTitle">
					<Typography variant='h1'>WLH ID {wildlifeHealthId.metadata.wildlifeHealthId}</Typography>
					<Typography variant='h6'>View the WLH ID details and events.</Typography>
				</Box>
				<Box className="pageHeadBtn">
					<Button className="updateIDBtn" onClick={onEditButtonClick} variant={'contained'}>
						Update WLH ID
					</Button>
					<IconButton>
						<PrintIcon />
					</IconButton>
					<IconButton>
						<DownloadIcon />
					</IconButton>
				</Box>
			</Box>
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

			<Status state={wildlifeHealthId}/>

			<AnimalDetails state={wildlifeHealthId} expansionEvent={expansionEvent}/>

			<Event state={wildlifeHealthId} expansionEvent={expansionEvent}/>

			<Purpose state={wildlifeHealthId} expansionEvent={expansionEvent}/>
		</Box>
	);
};
export default DetailForm;
