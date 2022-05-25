import {Box, Grid, Typography} from "@mui/material";
import React from "react";

const TwoColumnForm = ({title, children}) => {
	return (
		<Grid container>
			<Grid item xs={7}>
				<Typography variant={'h5'} sx={{display: 'inline-block'}}>{title}</Typography>
			</Grid>
			<Grid item xs={5}>
				<Grid container spacing={1} alignItems={'flex-end'}>
					{children.map((c, i) => (
						<Grid item xs={6}>
							{c}
						</Grid>
					))
					}
				</Grid>
			</Grid>
		</Grid>

	)
};

export default TwoColumnForm;
