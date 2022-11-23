import Expandable from "../../pageElements/Expandable";
import {Box, Button, InputAdornment, MenuItem, TextField, Typography} from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import IdentifierEntry from "../IdentifierEntry";
import React from "react";

const AnimalDetails = ({expansionEvent, handleUpdate, sex, setSex, validSex, identifierOptions, handleSelectIdentifier, handleAddIdentifier}) => {
	return (
		<Expandable expansionEvent={expansionEvent}>
			<Expandable.Title>
				<span>
					<Typography sx={{fontSize: '18px'}}>Animal Details</Typography>
				</span>
				<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
					<span>
						<Typography variant='body2'>
							Species
						</Typography>
						<Typography variant='body1'>
							Moose
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Gender
						</Typography>
						<Typography variant='body1'>
							Female
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Home Region
						</Typography>
						<Typography variant='body1'>
							Home Region1
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
					<Box sx={{width: '1091px', margin: '0 auto'}}>

						<TextField
							sx={{minWidth: '1091px', marginTop: '57px'}}
							label='Species'
							id='species'
							name='species'
							InputProps={{
								endAdornment: <InputAdornment position='end'><AccountTreeOutlinedIcon/></InputAdornment>,
							}}
							onChange={handleUpdate}
						/>

						<TextField
							sx={{width: '529px', marginRight: '32px', marginTop: '32px'}}
							label='Home Region'
							id='homeRegion'
							onChange={handleUpdate}
						/>
						<TextField
							select
							sx={{width: '529px', marginTop: '32px'}}
							id='sex'
							label='Sex'
							value={sex}
							onChange={(e) => {
								setSex(e.target.value);
							}}
						>
							{validSex.map((m, i) => (
								<MenuItem key={i} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						{identifierOptions.map((identifierOption, index) => (
							<div>
								<Box sx={{display: 'flex', flexDirection: 'column'}} key={index}>
									<IdentifierEntry
										key={index}
										handleUpdate={(e) => {
											handleSelectIdentifier(index, e);
											handleAddIdentifier(index);
										}}
										handleDelete={() => {
											console.log("delete");
										}}
									/>
								</Box>
							</div>
						))}
					</Box>
				</Box>
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

export default AnimalDetails;
