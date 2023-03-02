import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography} from '@mui/material';
import {useSelector} from '../../../../state/utilities/use_selector';
import {useNavigate} from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import LockIcon from '@mui/icons-material/Lock';

const LockModal = ({open, close}) => {
	const lockStatus = useSelector(state => state.GenerationLock);
	const navigate = useNavigate();
	const [userWantsNotification, setUserWantsNotification] = useState(false);

	function renderButtons() {
		if (userWantsNotification) {
			return (
				<>
					<Button
						color="secondary"
						variant={'contained'}
						onClick={() => {
							navigate('/wildlifeIds');
						}}
					>
						Okay
					</Button>
				</>
			);
		} else {
			return (
				<>
					<Button
						variant={'contained'}
						onClick={() => {
							navigate('/wildlifeIds');
						}}
						color="secondary"
					>
						No
					</Button>
					<Button
						variant={'contained'}
						onClick={() => {
							setUserWantsNotification(true);
						}}
						color="primary"
					>
						Yes
					</Button>
				</>
			);
		}
	}

	return (
		<Dialog
			open={open}
			className='lock_modal_dialog'
		>
			<Box className='lock_icon_container'>
				<LockIcon className='LockIcon' />
			</Box>
			<IconButton onClick={close} className='dialogBtn'>
				<CloseIcon />
			</IconButton>
			<DialogContent className='dialog_content'>
				<p>[{lockStatus.status?.lockHolder?.email}] is currently generating WLH IDs.</p>
				<p>Would you like to be notified when this function</p>
				<p>becomes available?</p>
			</DialogContent>
			<DialogActions className='dialog_actions'>
				<Button
					onClick={() => {
						setUserWantsNotification(true);
					}}
					className='lock_btn'
				>
					Yes
				</Button>
				<Button
					onClick={close}
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export {LockModal};
