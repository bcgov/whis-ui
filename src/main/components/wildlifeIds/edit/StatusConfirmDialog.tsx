import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Tooltip} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import React, {useState} from 'react';

const StatusConfirmDialog = ({open, cancelAction, acceptAction}) => {
	const [flag, setFlag] = useState(false);

	return (
		<Dialog className="statusConfirmDialog" open={open} onClose={cancelAction} maxWidth={false}>
			<IconButton className="dialogBtn" onClick={cancelAction}>
				<CloseIcon />
			</IconButton>
			<DialogTitle>{'Please enter the Correct WLH ID below'}</DialogTitle>
			<DialogContent>
				<TextField sx={{width: '305px'}} id="correctId" name="correctId" label="Correct WLH ID" />
				<Tooltip
					title="Flag it if the ID is not available as a to do list for the future"
					arrow
					placement="right"
					componentsProps={{
						tooltip: {
							sx: {
								color: '#313132',
								backgroundColor: 'white',
								border: '1px solid #E6E8ED',
								width: '140px',
								height: '70px',
								padding: '10px'
							}
						},
						arrow: {
							sx: {
								color: 'white',
								'&:before': {
									border: '1px solid #E6E8ED'
								}
							}
						}
					}}
				>
					<IconButton onClick={() => setFlag(!flag)} className="flagIcon">
						{flag && <FlagIcon sx={{fontSize: '40px', color: '#d8292f'}} />}
						{flag || <FlagOutlinedIcon sx={{fontSize: '40px'}} />}
					</IconButton>
				</Tooltip>
			</DialogContent>
			<DialogActions sx={{padding: '0 32px 35px 0'}}>
				<Button variant={'contained'} onClick={acceptAction} className="requesterFormBtn">
					Save
				</Button>
				<Button variant={'outlined'} onClick={cancelAction} className="requesterFormBtn" sx={{marginLeft: '11px'}}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

// @todo not currently used -- to integrate!
export default StatusConfirmDialog;
