import Expandable from "../../pageElements/Expandable";
import {
	Box,
	Button,
	Dialog, DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	FormGroup,
	IconButton,
	MenuItem,
	Switch,
	TextField,
	Tooltip,
	Typography
} from "@mui/material";
import React, {useState} from "react";
import CloseIcon from "@mui/icons-material/Close";
import FlagIcon from "@mui/icons-material/Flag";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

const Status = ({expansionEvent, dispatch, state}) => {

	const statuses = [
		{value: 'ASSIGNED', label: 'Assigned'},
		{value: 'RETIRED', label: 'Retired'},
		{value: 'UNASSIGNED', label: 'Unassigned'}
	];

	const [flag, setFlag] = useState(false);

	const [idConfirmationOpen, setIdConfirmationOpen] = useState(false);
	const idConfirmationOpenHandleClose = (e) => {
		console.dir(e);
	}


	function renderDetailed(status) {
		switch (status) {
		case 'ASSIGNED':
		case 'UNASSIGNED':
			return (
				<TextField
					sx={{minWidth: '1091px', marginTop: '28px'}}
					label='Reason (Enter a reason why you are changing the WLH ID status)'
					id='reason'
					name='reason'
					multiline
					onChange={(e) => {
						dispatch({
							type: 'fieldChange',
							payload: {
								field: 'status.reason',
								value: e.target.value
							}
						})
					}}
					value={state.status.reason}
					rows={3}
				/>
			);
			break;
		case 'RETIRED':
			return (
				<>
					<FormGroup sx={{width: '330px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '28px'}}>
						<Typography variant='body1'>Recapture Kits Returned</Typography>
						<FormControlLabel control={<Switch onChange={(e) => dispatch(
							{
								type: 'fieldChange',
								payload: {
									field: 'status.additionalAttributes.recaptureKitsReturned',
									value: e.target.checked
								}
							}
						)}
						sx={{marginInline: '20px'}}/>}
						checked={state.status.additionalAttributes.recaptureKitsReturned}
						label={`${state.status.additionalAttributes.recaptureKitsReturned ? 'Yes' : 'No'}`}/>
						<Typography variant='body1'>Recapture Status</Typography>
						<FormControlLabel control={<Switch onChange={(e) => dispatch(
							{
								type: 'fieldChange',
								payload: {
									field: 'status.additionalAttributes.recaptureStatus',
									value: e.target.checked
								}
							}
						)}
						checked={state.status.additionalAttributes.recaptureStatus}
						sx={{marginInline: '20px'}}/>}
						label={`${state.status.additionalAttributes.recaptureStatus ? 'On' : 'Off'}`} sx={{marginTop: '20px'}}/>
					</FormGroup>

					<TextField
						sx={{width: '529px', marginTop: '28px'}}
						id='correctIdNumber'
						name='correctIdNumber'
						label='Correct WLH ID Number'
						value={state.status.additionalAttributes.correctIdNumber || ''}
						onChange={(e) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'status.additionalAttributes.correctIdNumber',
									value: e.target.value
								}
							})
						}}
						defaultValue='Pending'
					/>

					<TextField
						sx={{minWidth: '1091px', marginTop: '28px'}}
						label='Reason (Enter a reason why you are changing the WLH ID status)'
						id='reason'
						name='reason'
						multiline
						rows={3}
						value={state.status.reason}
						onChange={(e) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'status.reason',
									value: e.target.value
								}
							})
						}}
					/>

					<Dialog
						open={idConfirmationOpen}
						onClose={idConfirmationOpenHandleClose}
						maxWidth={false}
						PaperProps={{
							sx: {width: '600px', maxHeight: '272px', height: '279px'}
						}}
					>
						<IconButton
							onClick={idConfirmationOpenHandleClose}
							sx={{
								position: 'absolute',
								right: 8,
								top: 8
							}}
						>
							<CloseIcon/>
						</IconButton>
						<DialogTitle sx={{fontSize: '16px', padding: '50px 0 20px 72px'}}>
							{"Please enter the Correct WLH ID below"}
						</DialogTitle>
						<DialogContent sx={{padding: '0 72px', overflowY: 'unset'}}>
							<TextField
								sx={{width: '305px'}}
								id='correctId'
								name='correctId'
								label='Correct WLH ID'
							/>
							<Tooltip
								title="Flag it if the ID is not available as a to do list for the future"
								arrow
								placement="right"
								componentsProps={{
									tooltip: {
										sx: {
											color: "#313132",
											backgroundColor: "white",
											border: '1px solid #E6E8ED',
											width: "140px",
											height: "70px",
											padding: '10px'
										}
									},
									arrow: {
										sx: {
											color: "white",
											"&:before": {
												border: "1px solid #E6E8ED"
											}
										}
									}
								}}
							>
								<IconButton onClick={() => setFlag(!flag)} className='flagIcon'>
									{flag && <FlagIcon sx={{fontSize: '40px', color: '#d8292f'}}/>}
									{flag || <FlagOutlinedIcon sx={{fontSize: '40px'}}/>}
								</IconButton>
							</Tooltip>
						</DialogContent>
						<DialogActions sx={{padding: '0 32px 35px 0'}}>
							<Button variant={'contained'} onClick={idConfirmationOpenHandleClose} className='requesterFormBtn'>Save</Button>
							<Button variant={'outlined'} onClick={idConfirmationOpenHandleClose} className='requesterFormBtn' sx={{marginLeft: '11px'}}>Cancel</Button>
						</DialogActions>
					</Dialog>
				</>
			);
			break;

		default:
			return (<></>);
		}
	}

	return (
		<Expandable expansionEvent={expansionEvent}>
			<Expandable.Title>
				<span>
					<Typography sx={{fontSize: '18px'}}>Status</Typography>
					<Typography className='unassigned' sx={{color: 'white', fontSize: '13px'}} variant='subtitle1'>
						{state.metadata.status}
					</Typography>
				</span>
				<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
					<span>
						<Typography variant='body2'>
							WLH ID Number
						</Typography>
						<Typography variant='body1'>
							{state.metadata.wildlifeHealthId}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							WLH ID Generated  Date
						</Typography>
						<Typography variant='body1'>
							{state.metadata.generationDate}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							WLH ID Creator
						</Typography>
						<Typography variant='body1'>
							{state.metadata.creator.name}
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box sx={{width: '1091px', margin: '48px auto'}}>
					<TextField
						sx={{width: '529px', marginTop: '8px'}}
						id='idStatus'
						label='Change WLH Status *'
						defaultValue={state.status.status}
						select
						onChange={(e) => {
							dispatch({
								type: 'status.statusChange', payload: e.target.value
							});
						}}
					>
						{statuses.map((m) => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					{
						renderDetailed(state.status.status)
					}
				</Box>

				<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
					<Button
						variant={'contained'}
						className='update_btn'
					>
						Update
					</Button>
					<Button
						variant={'outlined'}
						className='update_btn'
					>
						Cancel
					</Button>
				</Box>
			</Expandable.Detail>
		</Expandable>
	);
}

export default Status;
