import {Button, Dialog, DialogActions, DialogContent, Box, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';

const ConfirmDialog = ({openGenerateDialog, handleClose, navigate, numOfIDs}) => {
	return (
		<Dialog open={openGenerateDialog} onClose={handleClose} className="generate_confirm_dialog">
			<Box className="generated_icon_container">
				<CheckIcon className="CheckIcon" />
			</Box>
			<IconButton onClick={handleClose} className="dialogBtn">
				<CloseIcon />
			</IconButton>
			<DialogContent className="dialog_content">
				<p>You have generated {numOfIDs} WLH IDs: (range of numbers)</p>
				<p>Would you like to add more details to these IDs?</p>
			</DialogContent>
			<DialogActions className="dialog_actions">
				<Button
					className="generatedBtn"
					onClick={() => {
						navigate('/wildlifeIds/inventory');
					}}
				>
					Yes
				</Button>
				<Button
					onClick={() => {
						navigate('/wildlifeIds');
					}}
				>
					Later
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ConfirmDialog;
