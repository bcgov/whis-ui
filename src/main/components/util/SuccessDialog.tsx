import {Dialog, Box, DialogTitle, DialogContent, Divider, DialogActions, Button} from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import '../../styles/confirmationDialog.scss';

const SuccessDialog = ({open, close, title, content}) => {

    function renderIcon(icon){
        switch(icon){
            case 'CheckIcon':
                return(
                    <CheckIcon className="CheckIcon" />
                )
                break;
            case 'NotificationImportantIcon':
                return(
                    <NotificationImportantIcon className="CheckIcon" />
                )
                break;
            
        }
    }

	return (
		<Dialog className="success_dialog" open={open} onClose={close}>
			<Box className="icon_container">
                {/* {renderIcon(icon)} */}
				<CheckIcon className="CheckIcon" />
			</Box>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>{content}</DialogContent>
			<Divider variant="middle" />
			<DialogActions>
				<Button className="closeBtn" variant="contained" onClick={close}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
export default SuccessDialog;
