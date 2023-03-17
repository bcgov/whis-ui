import React from 'react';
import {Stack} from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

const ValidationError = ({hidden, message}) => {
	if (hidden) {
		return null;
	}
	return (
		<Stack direction="row" alignItems="center">
			<PriorityHighIcon sx={{fontSize: '14px'}} color="error"/>
			<span className='error_message'>{message}</span>
		</Stack>
	);
};

export default ValidationError;
