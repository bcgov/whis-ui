import React, { useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography } from "@mui/material";
import { useSelector } from "../../../state/utilities/use_selector";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';

const LockModal = ({ open }) => {
	const lockStatus = useSelector(state => state.GenerationLock)
	const navigate = useNavigate();
	const [userWantsNotification, setUserWantsNotification] = useState(false);

	function renderButtons() {
		if (userWantsNotification) {
			return (
				<>
					<Button
						color='secondary'
						variant={'contained'}
						onClick={() => {
							navigate('/wildlifeIds')
						}}
					>
						Okay
					</Button>
				</>
			)
		} else {
			return (<>
				<Button variant={'contained'} onClick={() => {
					navigate('/wildlifeIds')
				}} color="secondary">
					No
				</Button>
				<Button variant={'contained'} onClick={() => {
					setUserWantsNotification(true);
				}} color="primary">
					Yes
				</Button>
			</>
			)
		}
	}

	return (
		// <Dialog open={open} onClose={() => {
		// 	navigate('/wildlifeIds')
		// }} aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth={true}>
		// 	<DialogTitle id="form-dialog-title">Locked</DialogTitle>
		// 	<DialogContent>
		// 		{userWantsNotification && <>
		// 			You will be notified within the application when the generation function becomes available.
		// 		</>}
		// 		{userWantsNotification || <>
		// 			<p>{lockStatus.status?.lockHolder?.email} is currently generating WLH IDs.</p>
		// 			<p>Would you like to be notified when this function becomes available?</p>
		// 		</>}
		// 	</DialogContent>
		// 	<DialogActions>
		// 		{renderButtons()}
		// 	</DialogActions>
		// </Dialog>
		<Dialog
			open={open}
			onClose={() => { navigate('/wildlifeIds') }}
			PaperProps={{
				sx: { overflowY: 'inherit', width: '504px', height: '307px', borderRadius: '10px' }
			}}
		>
			<Box sx={{ margin: 'auto', width: '78px', height: '78px', borderRadius: '999rem', backgroundColor: '#ffae00', position: 'relative', top: '-35px' }}>
				<LockIcon sx={{ position: 'relative', top: '17px', left: '17px', fontSize: '45px', color: '#ffffff', }} />
			</Box>
			<IconButton
				onClick={() => { navigate('/wildlifeIds') }}
				sx={{ position: 'absolute', right: 8, top: 8 }}
			>
				<CloseIcon />
			</IconButton>
			<DialogContent sx={{ margin: 'auto', padding: '0 24px', textAlign: 'center', position: 'relative', top: '8px' }}>
				<p style={{ color: '#313132', fontSize: '14px', margin: '0 0 15px' }}>[name and family name] is currently generating WLH IDs.</p>
				<p style={{ color: '#313132', fontSize: '14px', textAlign: 'left', margin: '0 0 15px' }}>Would you like to be notified when this function</p>
				<p style={{ color: '#313132', fontSize: '14px', textAlign: 'left', margin: '0' }}>becomes available?</p>
			</DialogContent>
			<DialogActions sx={{ margin: 'auto', marginBottom: '40px' }}>
				<Button onClick={() => {
					setUserWantsNotification(true);
				}}
					sx={{
						width: '110px',
						height: '42px',
						borderRadius: '6px',
						marginRight: '4px',
						backgroundColor: '#ffae00',
						color: '#fff',
						fontSize: '16px',
						":hover": { backgroundColor: '#ffae00' }
					}}>Yes</Button>
				<Button onClick={() => {
					navigate('/wildlifeIds')
				}}
					sx={{
						width: '110px',
						height: '42px',
						border: '1px solid rgb(134, 142, 150)',
						borderRadius: '6px',
						color: 'rgb(102, 102, 102)',
						fontSize: '16px',
						":hover": { backgroundColor: '#fff' }
					}}>No</Button>
			</DialogActions>
		</Dialog>
	)
}

export { LockModal };
