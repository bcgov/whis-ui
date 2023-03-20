import Expandable from '../../pageElements/Expandable';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import useCodeTable from '../../../hooks/useCodeTable';
import CodeLookup from '../../util/CodeLookup';

const Purpose = ({expansionEvent}) => {
	const [addRequesterDialogOpen, setAddRequesterDialogOpen] = useState(false);

	const {mappedCodes: purposes} = useCodeTable('purposes');

	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'multiple_card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Purpose</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Primary Purpose</Typography>
						<Typography variant="body1">Multiple</Typography>
					</span>
					<span>
						<Typography variant="body2">Requester</Typography>
						<Typography variant="body1">Multiple</Typography>
					</span>
					<span>
						<Typography variant="body2">Organization</Typography>
						<Typography variant="body1">Multiple</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<Typography className="detailsSubtitle">WLH ID information</Typography>

					<Typography className="detailsSubtitle">Requester</Typography>
				</Box>
				<Box className="cardButtons">
					<Button variant={'contained'} className="update_btn" >
						Update
					</Button>
					<Button variant={'outlined'} className="update_btn" >
						Cancel
					</Button>
				</Box>
			</Expandable.Detail>
		</Expandable>
	);
};

export default Purpose;
