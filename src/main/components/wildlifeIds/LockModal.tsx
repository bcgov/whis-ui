import React, {useState} from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography} from "@mui/material";
import {useSelector} from "../../../state/utilities/use_selector";
import {useNavigate} from "react-router-dom";

const LockModal = ({open}) => {
	const lockStatus = useSelector(state => state.GenerationLock)
	const navigate = useNavigate();
	const [userWantsNotification, setUserWantsNotification] = useState(false);

	function renderButtons() {
		if (userWantsNotification) {
			return (
				<>
					<Button variant={'contained'} onClick={() => {
						navigate('/wildlifeIds')
					}} color="secondary">
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
		<Dialog open={open} onClose={() => {
			navigate('/wildlifeIds')
		}} aria-labelledby="form-dialog-title" maxWidth={'md'} fullWidth={true}>
			<DialogTitle id="form-dialog-title">Locked</DialogTitle>
			<DialogContent>
				{userWantsNotification && <>
					You will be notified within the application when the generation function becomes available.
				</>}
				{userWantsNotification || <>
					<p>{lockStatus.status?.lockHolder?.email} is currently generating WLH IDs.</p>
					<p>Would you like to be notified when this function becomes available?</p>
				</>}
			</DialogContent>
			<DialogActions>
				{renderButtons()}
			</DialogActions>
		</Dialog>
	)
}

export {LockModal} ;
