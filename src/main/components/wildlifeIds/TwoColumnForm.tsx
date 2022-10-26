import {Box, Grid, Typography} from "@mui/material";
import React from "react";

const TwoColumnForm = ({title, children}) => {
	return (
		// marginLeft:'145px', 
		<Grid container sx={{ flexDirection:'column'}}>
			<Grid item >
				<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize:'18px', margin:'32px 0 21px 145px' }}>{title}</Typography>
			</Grid>
			<Grid item xs={10} sx={{marginInline:'145px'}}>
				<Grid container spacing={4} alignItems={'baseline'}>
					{children.map((c, i) => (
						<Grid item xs={6} >
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
