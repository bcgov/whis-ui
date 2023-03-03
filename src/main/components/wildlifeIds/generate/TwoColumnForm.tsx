import {Grid, Typography} from '@mui/material';
import React from 'react';

const TwoColumnForm = ({title, children}) => {
	return (
		<Grid container className="two_column">
			<Typography>{title}</Typography>

			<Grid item xs={10} className="display_row">
				<Grid container spacing={4}>
					{children.map((c, i) => (
						<Grid item xs={6}>
							{c}
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default TwoColumnForm;
