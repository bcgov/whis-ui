import React, {useState} from 'react';
import NotificationDialog from './NotificationDialog';
import {LockedDialog} from './LockedDialog';

const LockModal = ({open, close, handleClose}) => {
	const [userWantsNotification, setUserWantsNotification] = useState(false);

	return (
		<>
			{open ? <LockedDialog open={open} close={close} setUserWantsNotification={setUserWantsNotification} /> : ''}
			{userWantsNotification ? (
				<NotificationDialog
					open={userWantsNotification}
					close={() => {
						handleClose(false);
						setUserWantsNotification(false);
					}}
				/>
			) : (
				''
			)}
		</>
	);
};

export {LockModal};
