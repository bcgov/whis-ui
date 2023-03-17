import { Box, Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CodeLookup from "../../util/CodeLookup";

const Status = ({ state }) => {

	const [displayedStatus, setDisplayedStatus] = useState('Unassigned');
	const [lastState, setLastState] = useState(null);

	useEffect(() => {
		if (lastState !== null) {
			setDisplayedStatus(lastState.status)
		} else {
			setDisplayedStatus('Unassigned');
		}
	}, [lastState]);

	useEffect(() => {
		if (state.status.history.length > 0) {
			setLastState(state.status.history[state.status.history.length - 1]);
		} else {
			setLastState(null);
		}
	}, [state]);



	return (
		<Card className='details_status_card'>
			<Box className="idInformationCard">
				<Typography className="title">General Information</Typography>
				<Box className='info' >
					<span>
						<Typography variant='body2'>Status</Typography>
						<Typography className={displayedStatus} variant='subtitle1'>
							<CodeLookup codeTable={'status'} code={displayedStatus} />
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							WLH ID Number
						</Typography>
						<Typography variant='body1'>
							{state.metadata.wildlifeHealthId}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Creator
						</Typography>
						<Typography variant='body1'>
							{state.metadata.creator.name}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Generated  Date
						</Typography>
						<Typography variant='body1'>
							{state.metadata.generationDate}
						</Typography>
					</span>

				</Box>
			</Box>
		</Card>
	);
}

export default Status;
