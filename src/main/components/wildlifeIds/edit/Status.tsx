import Expandable from '../../pageElements/Expandable';
import {Autocomplete, Box, Button, FormControlLabel, FormGroup, IconButton, Menu, MenuItem, Switch, TextField, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CodeLookup from '../../util/CodeLookup';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import LightTooltip from '../editMultiple/LightTooltip';
import CancelDialog from '../../util/CancelDialog';
import ValidationError from '../../util/ValidationError';
import {useForm} from 'react-hook-form';
import ConfirmDialog from '../../util/ConfirmDialog';

const Status = ({dirty, expansionEvent, dispatch, state, resetState, saveState}) => {
	const statuses = [
		{value: 'ASSIGNED', label: 'Assigned'},
		{value: 'RETIRED', label: 'Retired'},
		{value: 'UNASSIGNED', label: 'Unassigned'}
	];

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

	const [returnedDialogOpen, setReturnedDialogOpen] = useState(false);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

	const [flag, setFlag] = useState(false);

	const [displayedStatus, setDisplayedStatus] = useState('UNASSIGNED');
	const [lastState, setLastState] = useState(null);

	const [isReturned, setIsReturned] = useState(state.status.dirty.additionalAttributes.recaptureKitsReturned);

	useEffect(() => {
		if (lastState !== null) {
			setDisplayedStatus(lastState.status);
		} else {
			setDisplayedStatus('Unassigned');
		}
	}, [lastState]);

	useEffect(() => {
		if (state.status.history.length > 0) {
			setLastState(state.status.history[state.status.history.length - 1]);
		} else {
			setLastState(null);
		}
	}, [state]);

	const {
		register,
		handleSubmit,
		formState: {errors},
		clearErrors
	} = useForm({mode: 'onChange'});

	function isRecaptureKitsReturned(e) {
		if (e.target.checked) {
			setReturnedDialogOpen(true);
		}
	}

	const [open, setOpen] = useState(false);

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
							value={state.status.dirty.additionalAttributes.correctIdNumber || ''}
							onChange={e => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: 'status.dirty.additionalAttributes.correctIdNumber',
										value: e.target.value
									}
								});
							}}
							// helperText={'Please enter the correct WLH ID below.'}
							required
						/>
					)}
				/>
			);
		}
	}

	function renderDetailed(status) {
		switch (status) {
			case 'ASSIGNED':
				return (
					<TextField
						className="reason"
						label="Reason (Enter a reason why you are changing the WLH ID status)"
						id="reason"
						name="reason"
						multiline
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'status.dirty.reason',
									value: e.target.value
								}
							});
						}}
						value={state.status.dirty.reason}
						rows={3}
					/>
				);
			case 'UNASSIGNED':
				return (
					<FormGroup>
						<TextField
							className="reason"
							label="Reason (Enter a reason why you are changing the WLH ID status)"
							id="reason"
							name="reason"
							multiline
							required
							value={state.status.dirty.reason}
							rows={3}
							{...register('reason', {
								required: 'Enter the reason.',
								onChange(e) {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: 'status.dirty.reason',
											value: e.target.value
										}
									});
								}
							})}
							error={!!errors?.reason}
						/>
						<ValidationError hidden={!errors?.reason} message={errors.reason?.message} />
					</FormGroup>
				);
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
												dispatch({
													type: 'fieldChange',
													payload: {
														field: 'status.dirty.additionalAttributes.recaptureKitsReturned',
														value: e.target.checked
													}
												});
												isRecaptureKitsReturned(e);
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
												dispatch({
													type: 'fieldChange',
													payload: {
														field: 'status.dirty.additionalAttributes.recaptureStatus',
														value: e.target.checked
													}
												});
											}}
											checked={state.status.dirty.additionalAttributes.recaptureStatus}
											className="switch"
										/>
									}
									label={`${state.status.dirty.additionalAttributes.recaptureStatus ? 'On' : 'Off'}`}
								/>
							</FormGroup>
							{state.status.dirty.additionalAttributes.recaptureStatus ? (
								<>
									{/* Should be Autocomplete with the ID number list */}
									{isFlag()}
									<LightTooltip title="Flag it if the ID is not available as a to do list for the future">
										<IconButton
											onClick={() => {
												setFlag(!flag);
											}}
											className="flagIcon"
										>
											{flag && <FlagIcon sx={{fontSize: '40px', color: '#d8292f'}} />}
											{flag || <FlagOutlinedIcon sx={{fontSize: '40px'}} />}
										</IconButton>
									</LightTooltip>
								</>
							) : (
								<></>
							)}
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
								value={state.status.dirty.reason}
								rows={3}
								{...register('reason', {
									required: 'Enter the reason.',
									onChange(e) {
										dispatch({
											type: 'fieldChange',
											payload: {
												field: 'status.dirty.reason',
												value: e.target.value
											}
										});
									}
								})}
								error={!!errors?.reason}
							/>
							<ValidationError hidden={!errors?.reason} message={errors.reason?.message} />
						</FormGroup>
					</>
				);
			default:
				return <></>;
		}
	}

	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Status</Typography>
					<Typography className={displayedStatus} variant="subtitle1">
						<CodeLookup codeTable={'status'} code={displayedStatus} />
					</Typography>
				</span>
				<Box className="info">
					{state.status.dirty.additionalAttributes.recaptureStatus ? (
						<span>
							<Typography variant="body2">Recapture ID Number</Typography>
							<Typography variant="body1">{state.metadata.wildlifeHealthId}-R</Typography>
						</span>
					) : (
						<span>
							<Typography variant="body2">WLH ID Number</Typography>
							<Typography variant="body1">{state.metadata.wildlifeHealthId}</Typography>
						</span>
					)}
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<TextField
						className="changeStatus"
						id="idStatus"
						label="Change WLH Status *"
						select
						defaultValue={state.status.history[state.status.history.length - 1].status}
						onChange={e => {
							dispatch({
								type: 'status.statusChange',
								payload: e.target.value
							});
						}}
					>
						{statuses.map(m => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					{renderDetailed(state.status.dirty.status)}
				</Box>

				<ConfirmDialog
					open={confirmDialogOpen}
					close={() => {
						resetState();
						setConfirmDialogOpen(false);
					}}
					acceptAction={() => {
						dispatch({
							type: 'status.promote'
						});

						//slight delay before sending
						setTimeout(() => {
							saveState();
						}, 3000);
						setConfirmDialogOpen(false);
					}}
					title={'Update Confirmation'}
					content={`You have changed the status of 1 WLH ID from ${displayedStatus.toLowerCase()} to ${state.status.dirty.status.toLowerCase()}. Would you like to save your changes?`}
				/>

				<CancelDialog
					open={cancelDialogOpen}
					close={() => {
						setCancelDialogOpen(false);
					}}
					acceptAction={resetState}
					title={'Cancel WLH ID Status Update'}
					content={'You have not saved your changes. Are you sure you want to cancel?'}
				/>
				<Box className="cardButtons">
					<Button
						disabled={!dirty}
						variant={'contained'}
						className="update_btn"
						onClick={() => {
							setConfirmDialogOpen(true);
						}}
					>
						Update
					</Button>
					<Button
						disabled={!dirty}
						variant={'outlined'}
						className="update_btn"
						onClick={() => {
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

export default Status;
