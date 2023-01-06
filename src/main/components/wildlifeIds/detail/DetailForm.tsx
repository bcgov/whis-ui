import React from 'react';
import {Box, Button, IconButton, Typography} from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import '../../../styles/updateID.scss';
import Status from "./Status";
import Purpose from "./Purpose";
import AnimalDetails from "./AnimalDetails";
import Event from "./Event";

const DetailForm = ({wildlifeHealthId, onEditButtonClick}) => {
	return (
		<Box className='container'>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Box>
					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '32px'}}>WLH ID {wildlifeHealthId.metadata.wildlifeHealthId}</Typography>
					<Typography sx={{marginBottom: '28px', fontSize: '16px', color: '#787f81'}}>View the WLH ID details and events.</Typography>
				</Box>
				<Box>
					<Button
						onClick={onEditButtonClick}
						variant={'contained'} sx={{height: '41px', textTransform: 'capitalize', fontSize: '14px', marginRight: '8px'}}
					>
							Update WLH ID
					</Button>
					<IconButton>
						<PrintIcon/>
					</IconButton>
					<IconButton>
						<DownloadIcon/>
					</IconButton>
				</Box>
			</Box>

			<Status
				state={wildlifeHealthId}
			/>

			<Purpose
				state={wildlifeHealthId}
			/>

			<AnimalDetails
				state={wildlifeHealthId}
			/>

			<Event
				state={wildlifeHealthId}
			/>

		</Box>
	);
}
;
export default DetailForm;
