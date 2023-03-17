import React from 'react';
import {Tooltip, TooltipProps, tooltipClasses, styled, MenuItem, Menu} from '@mui/material';

const LightTooltip = styled(({className, ...props}: TooltipProps) => <Tooltip {...props} classes={{popper: className}} arrow />)(({theme}) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: theme.palette.common.white,
		'&:before': {border: '1px solid #E6E8ED'}
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.common.white,
		color: 'rgba(0, 0, 0, 0.87)',
		boxShadow: theme.shadows[1],
		fontSize: 11,
		border: '1px solid #E6E8ED'
	}
}));

export default LightTooltip;
