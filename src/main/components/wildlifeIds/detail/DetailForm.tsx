import React from 'react';
import {Box, Button, IconButton, Typography} from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import Status from './Status';
import Purpose from './Purpose';
import AnimalDetails from './AnimalDetails';
import Event from './Event';

const DetailForm = ({wildlifeHealthId, onEditButtonClick}) => {
	return (
		<Box className="container">
			<Box className="pageHead">
				<Box className="mainTitle">
					<Typography>WLH ID {wildlifeHealthId.metadata.wildlifeHealthId}</Typography>
					<Typography>View the WLH ID details and events.</Typography>
				</Box>
				<Box className="pageHeadBtn">
					<Button className="updateIDBtn" onClick={onEditButtonClick} variant={'contained'}>
						Update WLH ID
					</Button>
					<IconButton>
						<PrintIcon />
					</IconButton>
					<IconButton>
						<DownloadIcon />
					</IconButton>
				</Box>
			</Box>

			<Status state={wildlifeHealthId} />

			<AnimalDetails state={wildlifeHealthId} />

			<Event state={wildlifeHealthId} />
			
			<Purpose state={wildlifeHealthId} />
		</Box>
	);
};
export default DetailForm;
