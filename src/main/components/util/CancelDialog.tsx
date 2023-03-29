import {Dialog, Box, DialogTitle, DialogContent, Divider, DialogActions, Button} from '@mui/material';
import React from 'react';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import '../../styles/confirmationDialog.scss';

const CancelDialog = ({title, open, close, content, acceptAction}) => {
	return (
		<Dialog open={open} onClose={close} className="cancel_dialog">
			<Box className="cancel_icon_container">
				<PriorityHighIcon className="PriorityHighIcon" />
			</Box>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{content}</DialogContent>
			{/* <DialogContent>Are you sure you want to cancel?&nbsp;Changes you have made will not be saved.</DialogContent> */}
			<Divider variant="middle" />
			<DialogActions>
				<Button
					className="dialog_actions cancelBtns"
					variant={'contained'}
					onClick={() => {
						acceptAction();
						close();
						// navigate('/wildlifeIds/');
					}}
				>
					Yes
				</Button>
				<Button
					className="dialog_actions closeBtn cancelBtns"
					onClick={() => {
						close();
					}}
					variant={'contained'}
				>
					No
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default CancelDialog;
