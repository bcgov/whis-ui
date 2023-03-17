import React from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControlLabel, Radio, RadioGroup} from '@mui/material';
import {useSelector} from '../../../../state/utilities/use_selector';
import {useNavigate} from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

const LockedDialog = ({open, close, setUserWantsNotification}) => {
	const lockStatus = useSelector(state => state.Auth);
	// const lockStatus = useSelector(state => state.GenerationLock);
	const navigate = useNavigate();

	return (
		<Dialog open={open} className="lock_modal_dialog">
			<Box className="lock_icon_container">
				<LockIcon className="LockIcon" />
			</Box>
			<DialogTitle>WLH ID generation locked!</DialogTitle>
			<DialogContent>
				{/* [{lockStatus.status?.lockHolder?.email}] */}
				{/* the name should be Full Name instead of email */}
				{lockStatus.bestName} is currently generating WLH IDs. If you like to be notified when the function is available, choose your notification method?
				<RadioGroup row>
					<FormControlLabel value="email" control={<Radio />} label="Email" />
					<FormControlLabel value="dashboard" control={<Radio />} label="Dashboard" />
				</RadioGroup>
			</DialogContent>
			<Divider variant="middle" />
			<DialogActions>
				<Button
					onClick={() => {
						close();
						setUserWantsNotification(true);
					}}
					className="dialog_actions"
					variant={'contained'}
				>
					Save
				</Button>
				<Button onClick={close} className="dialog_actions" variant={'contained'}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export {LockedDialog};
