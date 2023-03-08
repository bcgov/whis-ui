import {
	Dialog,
	IconButton,
	DialogTitle,
	DialogContent,
	TextField,
	Button,
	Box,
	Typography,
	Card,
	FormControl,
	FormControlLabel,
	Radio,
	RadioGroup
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import FriendlyDate from '../../util/FriendlyDate';

const NewEventDialog = ({open, updateAction, cancelAction, state}) => {
	function onClose() {
		cancelAction();
	}

	function onUpdate() {
		updateAction();
	}

	const statusStyle = state => {
		const toUpperCase = state.status.toUpperCase();
		return toUpperCase;
	};

	return (
		<Dialog className="addEventDialog" open={open} onClose={onClose} maxWidth={false}>
			<IconButton className="dialogBtn" onClick={onClose}>
				<CloseIcon />
			</IconButton>
			<DialogTitle>Add Event to WLH ID</DialogTitle>
			<DialogContent>
				<Card className="cardHead">
					<Box className="cardSubtitle">
						<Typography>Status</Typography>
						<Typography className={statusStyle(state)} variant="subtitle1">
							{state.status}
						</Typography>
					</Box>
					<Box className="info">
						<span>
							<Typography variant="body2">WLH ID Number</Typography>
							<Typography variant="body1">{state.wlh_id}</Typography>
						</span>
						<span>
							<Typography variant="body2">WLH ID Generated Date</Typography>
							<Typography variant="body1">
								<FriendlyDate value={state.generationDate} />
							</Typography>
						</span>
						<span>
							<Typography variant="body2">WLH ID Creator</Typography>
							<Typography variant="body1">{state.creator}</Typography>
						</span>
					</Box>
				</Card>
				<Card className="cardBody">
					<FormControl className="newEventRadios">
						<RadioGroup
							row
							// value={event.type}
							// onChange={e => {
							// 	dispatch({
							// 		type: 'fieldChange',
							// 		payload: {
							// 			field: `events[${index}].type`,
							// 			value: e.target.value
							// 		}
							// 	});
							// }}
						>
							<FormControlLabel value="capture" control={<Radio />} label="Capture" />
							<FormControlLabel value="mortality" control={<Radio />} label="Mortality" />
							<FormControlLabel value="recapture" control={<Radio />} label="Recapture" />
						</RadioGroup>
					</FormControl>
					<TextField
						className="history"
						label="History (Max 500 Characters)"
						multiline
						rows={5}
						// value={event.history}
						// onChange={e => {
						// 	dispatch({
						// 		type: 'fieldChange',
						// 		payload: {
						// 			field: `events[${index}].history`,
						// 			value: e.target.value
						// 		}
						// 	});
						// }}
						inputProps={{maxLength: 500}}
					/>
					
                    <Button className='moreDetailsBtn' variant='outlined'>
                        + Add More Details
                    </Button>
					<Box className="updateBtn">
						<Button variant={'contained'} onClick={onUpdate} className="requesterFormBtn">
							Update
						</Button>
						<Button variant={'outlined'} onClick={onClose} className="requesterFormBtn">
							Cancel
						</Button>
					</Box>
				</Card>
			</DialogContent>
		</Dialog>
	);
};

export default NewEventDialog;
