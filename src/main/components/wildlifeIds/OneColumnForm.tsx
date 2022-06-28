import {Box, Grid, Typography} from "@mui/material";
import React from "react";

const OneColumnForm = ({children}) => {
	return (
		<Grid container sx={{marginTop:'32px', marginBottom:'50px', marginInline:'30px'}}>
			<Grid item xs={4}>
				<Typography variant={'subtitle1'} sx={{display: 'inline-block'}}>&nbsp;</Typography>
			</Grid>
			<Grid item xs={7}>
				<Grid container spacing={4} alignItems={'flex-end'}>
					{children.map((c, i) => (
						<Grid item xs={12}>
							{c}
						</Grid>
					))
					}
				</Grid>
			</Grid>
		</Grid>

	)
};

export default OneColumnForm;
