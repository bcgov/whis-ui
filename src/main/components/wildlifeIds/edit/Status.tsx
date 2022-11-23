import Expandable from "../../pageElements/Expandable";
import {Box, Button, Typography} from "@mui/material";
import StatusForm from "../StatusForm";
import React from "react";

const Status = ({expansionEvent}) => {
	return (
		<Expandable expansionEvent={expansionEvent}>
			<Expandable.Title>
				<span>
					<Typography sx={{fontSize: '18px'}}>Status</Typography>
					<Typography className='unassigned' sx={{color: 'white', fontSize: '13px'}} variant='subtitle1'>
						Unassigned
					</Typography>
				</span>
				<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
					<span>
						<Typography variant='body2'>
							WLH ID Number
						</Typography>
						<Typography variant='body1'>
							22-00001
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							WLH ID Genrated  Date
						</Typography>
						<Typography variant='body1'>
							21-01-2021
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							WLH ID Creator
						</Typography>
						<Typography variant='body1'>
							Jane Hill
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<StatusForm
					handleUpdate={(e) => {
					}}
					IdStatus={'RETIRED'}
				/>

				<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
					<Button
						variant={'contained'}
						className='update_btn'
					>
						Update
					</Button>
					<Button
						variant={'outlined'}
						className='update_btn'
					>
						Cancel
					</Button>
				</Box>
			</Expandable.Detail>
		</Expandable>
	);
}

export default Status;
