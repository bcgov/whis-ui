import {Button, Dialog, DialogActions, DialogContent, Box, Divider, DialogTitle} from '@mui/material';
import React from 'react';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

const NotificationDialog = ({open, close}) => {
	return (
		<Dialog open={open} onClose={close} className="notification_dialog">
			<Box className="notification_icon_container">
				<NotificationsActiveOutlinedIcon className="NotificationIcon" />
			</Box>
			<DialogTitle>Notification Alert Saved!</DialogTitle>
			<DialogContent>
				You have set an [email/ dashboard] notification. You will receive a message when the WLH ID generation function is available.
			</DialogContent>
			<Divider variant="middle" />
			<DialogActions>
				<Button className="closeBtn" variant={'contained'} onClick={close}>
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NotificationDialog;
