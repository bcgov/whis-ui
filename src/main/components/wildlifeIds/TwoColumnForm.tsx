import {Box, Grid, Typography} from "@mui/material";
import React from "react";

const TwoColumnForm = ({title, children}) => {
	return (
		<Grid container sx={{marginTop:'50px', marginInline:'30px'}}>
			<Grid item xs={4}>
				<Typography variant={'subtitle1'} sx={{display: 'inline-block'}}>{title}</Typography>
			</Grid>
			<Grid item xs={7}>
				<Grid container spacing={4} alignItems={'flex-end'}>
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
