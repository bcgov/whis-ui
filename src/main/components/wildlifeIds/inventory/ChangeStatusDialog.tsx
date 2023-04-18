import {
	Dialog,
	IconButton,
	DialogTitle,
	DialogContent,
	TextField,
	MenuItem,
	Button,
	Box,
	Card,
	Typography,
	FormControlLabel,
	FormGroup,
	Switch,
	Autocomplete
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, {useState} from 'react';
import FriendlyDate from '../../util/FriendlyDate';
import ConfirmDialog from '../../util/ConfirmDialog';
import ValidationError from '../../util/ValidationError';
import LightTooltip from '../editMultiple/LightTooltip';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

const ChangeStatusDialog = ({open, updateAction, cancelAction, state, newStatus}) => {
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

	const [isReturned, setIsReturned] = useState(false);
	// const [isReturned, setIsReturned] = useState(state.status.dirty.additionalAttributes.recaptureKitsReturned);
	const [returnedDialogOpen, setReturnedDialogOpen] = useState(false);
	function isRecaptureKitsReturned(e) {
		if (e.target.checked) {
			setReturnedDialogOpen(true);
		}
	}

	const fakeIDs = [
		{id: '23-00001'},
		{id: '23-00010'},
		{id: '23-00023'},
		{id: '23-00022'},
		{id: '23-00066'},
		{id: '22-00022'},
		{id: '22-00077'},
		{id: '22-00055'},
		{id: '22-00044'},
		{id: '22-00033'}
	];
	const [flag, setFlag] = useState(false);
	function isFlag() {
		if (flag) {
			return (
				<TextField className="correctIdNumber" id="correctIdNumber" name="correctIdNumber" label="Correct WLH ID Number" defaultValue="PENDING" disabled />
			);
		} else {
			return (
				<Autocomplete
					freeSolo
					options={fakeIDs.map(option => option.id)}
					renderInput={params => (
						<TextField
							{...params}
							className="correctIdNumber"
							id="correctIdNumber"
							name="correctIdNumber"
							label="Correct WLH ID Number"
							// value={state.status.dirty.additionalAttributes.correctIdNumber || ''}
							// value={state.status.dirty.additionalAttributes.correctIdNumber || ''}
							onChange={e => {
								// dispatch({
								// 	type: 'fieldChange',
								// 	payload: {
								// 		field: 'status.dirty.additionalAttributes.correctIdNumber',
								// 		value: e.target.value
								// 	}
								// });
							}}
							// helperText={'Please enter the correct WLH ID below.'}
							required
						/>
					)}
				/>
			);
		}
	}

	function renderStatusDetails(newStatus) {
		switch (newStatus) {
			case 'UNASSIGNED':
				return (
					<TextField
						className="reason"
						label="Reason"
						multiline
						required
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
				);
				break;
			case 'RETIRED':
				return (
					<>
						<Box className="retiredSection">
							<FormGroup className="retiredSwitches">
								<Typography variant="body1">Recapture Kits Returned</Typography>
								<FormControlLabel
									className="switchLabels"
									control={
										<Switch
											onChange={e => {
												// dispatch({
												// 	type: 'fieldChange',
												// 	payload: {
												// 		field: 'status.dirty.additionalAttributes.recaptureKitsReturned',
												// 		value: e.target.checked
												// 	}
												// });
												// isRecaptureKitsReturned(e);
											}}
											checked={isReturned}
											onClick={() => {
												setIsReturned(!isReturned);
											}}
											className="switch"
										/>
									}
									label={isReturned ? 'Yes' : 'No'}
								/>
								<Typography variant="body1">Recapture Status</Typography>
								<FormControlLabel
									className="switchLabels"
									control={
										<Switch
											onChange={e => {
												// dispatch({
												// 	type: 'fieldChange',
												// 	payload: {
												// 		field: 'status.dirty.additionalAttributes.recaptureStatus',
												// 		value: e.target.checked
												// 	}
												// });
											}}
											// checked={state.status.dirty.additionalAttributes.recaptureStatus}
											className="switch"
										/>
									}
									label={`${isReturned ? 'On' : 'Off'}`}
								/>
							</FormGroup>
						</Box>
						<ConfirmDialog
							open={returnedDialogOpen}
							close={() => {
								setReturnedDialogOpen(false);
								// setIsReturned(false);
							}}
							acceptAction={() => {
								setReturnedDialogOpen(false);
								setIsReturned(true);
							}}
							icon={'NotificationImportantIcon'}
							title={'Update Confirmation'}
							content={`Do you want to switch the Sample Kits Returned to Yes?`}
						/>

						<FormGroup>
							<TextField
								className="reason"
								label="Reason (Enter a reason why you are changing the WLH ID status)"
								id="reason"
								name="reason"
								multiline
								required
								// value={state.status.dirty.reason}
								rows={3}
								// {...register('reason', {
								// 	required: 'Enter the reason.',
								// 	onChange(e) {
								// 		dispatch({
								// 			type: 'fieldChange',
								// 			payload: {
								// 				field: 'status.dirty.reason',
								// 				value: e.target.value
								// 			}
								// 		});
								// 	}
								// })}
								// error={!!errors?.reason}
							/>
							{/* <ValidationError hidden={!errors?.reason} message={errors.reason?.message} /> */}
						</FormGroup>
					</>
				);
				break;

			default:
				break;
		}
	}

	return (
		<Dialog className="changeStatusDialog" open={open} onClose={onClose} maxWidth={false}>
			<IconButton className="dialogBtn" onClick={onClose}>
				<CloseIcon />
			</IconButton>
			<DialogTitle>Change WLH ID Status - WLH {state.wlh_id}</DialogTitle>
			<DialogContent className="cardBody">
				<TextField className="changeStatus" label="Current Status" defaultValue={state.status} disabled />
				<TextField
					className="changeStatus"
					label="Change to"
					defaultValue={newStatus}
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
				{renderStatusDetails(newStatus)}
				<Box className="updateBtn">
					<Button variant={'contained'} onClick={onUpdate} className="requesterFormBtn">
						Update
					</Button>
					<Button variant={'outlined'} onClick={onClose} className="requesterFormBtn">
						Cancel
					</Button>
				</Box>
			</DialogContent>
		</Dialog>
	);
};

export default ChangeStatusDialog;
