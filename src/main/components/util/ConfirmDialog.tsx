import {Dialog, Box, DialogTitle, DialogContent, Divider, DialogActions, Button} from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import '../../styles/confirmationDialog.scss';

const ConfirmDialog = ({open, close, title, content, icon, acceptAction}) => {

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
        <Dialog open={open} onClose={close} className="confirm_dialog">
        <Box className="icon_container">
            <NotificationImportantIcon className="PriorityHighIcon" />
        </Box>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{content}</DialogContent>
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
