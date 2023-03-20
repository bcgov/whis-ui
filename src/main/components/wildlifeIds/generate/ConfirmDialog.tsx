import {Button, Dialog, DialogActions, DialogContent, Box, Divider, DialogTitle} from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {useSelector} from '../../../../state/utilities/use_selector';

const ConfirmDialog = ({openGenerateDialog, handleClose, navigate, numOfIDs}) => {
	const range = useSelector(state => state.GenerationLock);
	return (
		<Dialog open={openGenerateDialog} onClose={handleClose} className="generate_confirm_dialog">
			<Box className="generated_icon_container">
				<CheckIcon className="CheckIcon" />
			</Box>
			<DialogTitle>WLH ID (s) Successfully Generated!</DialogTitle>
			<DialogContent>
				You have generated {numOfIDs} WLH IDs: [WLH ID]-[WLH ID]<br/>
				What would you like to do next?
			</DialogContent>
			<Divider variant="middle" />
			<DialogActions>
				<Button
					className="dialog_actions"
					variant={'contained'}
					onClick={() => {
						navigate('/wildlifeIds/multipleEdit');
					}}
				>
					Update Generated IDs
				</Button>
				<Button
					className="dialog_actions"
					variant={'contained'}
					onClick={() => {
						navigate('/wildlifeIds');
					}}
				>
					Go&nbsp;<span>to</span>&nbsp;Dashboard
				</Button>
				<Button
					className='dialog_actions closeBtn cancelBtns'
					variant={'contained'}
					onClick={handleClose}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
