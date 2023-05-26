import {Button, Dialog, DialogActions, DialogContent, Box, Divider, DialogTitle} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {useNavigate} from "react-router-dom";

const GenerationFailureDialog = ({open, handleClose}) => {

	const navigate = useNavigate();

	return (
		<Dialog open={open} onClose={handleClose} className="generate_failure_dialog">
			<Box className="generated_icon_container">
				<CheckIcon className="CheckIcon"/>
			</Box>
			<DialogTitle>Error creating WLH ID (s)!</DialogTitle>
			<DialogContent>
				Unfortunately a server error has occurred while generating IDs. Please contact the administrator for assistance.
			</DialogContent>
			<Divider variant="middle"/>
			<DialogActions>
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
					className="dialog_actions closeBtn cancelBtns"
					variant={'contained'}
					onClick={() => {
						handleClose();
					}}
				>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default GenerationFailureDialog;
