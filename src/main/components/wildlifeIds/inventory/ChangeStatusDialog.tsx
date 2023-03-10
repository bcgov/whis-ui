import {Dialog, IconButton, DialogTitle, DialogContent, TextField, MenuItem, Button, Box, Card, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import FriendlyDate from '../../util/FriendlyDate';

const ChangeStatusDialog = ({open, updateAction, cancelAction, state}) => {
	const statuses = [
		{value: 'ASSIGNED', label: 'Assigned'},
		{value: 'RETIRED', label: 'Retired'},
		{value: 'UNASSIGNED', label: 'Unassigned'}
	];

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
		<Dialog className="changeStatusDialog" open={open} onClose={onClose} maxWidth={false}>
			<IconButton className="dialogBtn" onClick={onClose}>
				<CloseIcon />
			</IconButton>
			<DialogTitle>Change the WLH ID Status</DialogTitle>
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
					<TextField
						className="changeStatus"
						label="Change WLH Status"
						required
						select
						// onChange={e => {
						// 	dispatch({
						// 		type: 'status.statusChange',
						// 		payload: e.target.value
						// 	});
						// }}
					>
						{statuses.map(m => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						className="reason"
						label="Reason (Enter a reason why you are changing the WLH ID status)"
						multiline
						// onChange={e => {
						// 	dispatch({
						// 		type: 'fieldChange',
						// 		payload: {
						// 			field: 'status.dirty.reason',
						// 			value: e.target.value
						// 		}
						// 	});
						// }}
						// value={state.status.dirty.reason}
						rows={3}
					/>

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

export default ChangeStatusDialog;
