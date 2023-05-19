import {Dialog, Box, DialogTitle, DialogContent, Divider, DialogActions, Button, Typography} from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import '../../styles/confirmationDialog.scss';

const ConfirmDialog = ({open, close, title, content, acceptAction}) => {

	return (
		<Dialog open={open} onClose={close} className="confirm_dialog">
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				{content}
				<Typography>Are you sure you want to proceed?</Typography>
			</DialogContent>
			<Divider variant="middle" />
			<DialogActions>
				<Button
					className="dialog_actions cancelBtns"
					variant={'contained'}
					onClick={() => {
						acceptAction();
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
export default ConfirmDialog;
