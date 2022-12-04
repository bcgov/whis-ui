import Expandable from "../../pageElements/Expandable";
import {Box, Button, InputAdornment, MenuItem, Select, TextField, Typography} from "@mui/material";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import IdentifierEntry from "./IdentifierEntry";
import React from "react";
import useCodeTable from "../../../hooks/useCodeTable";

const AnimalDetails = ({expansionEvent, dispatch, state}) => {

	const {mappedCodes: validSex} = useCodeTable('animal_gender');

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
							{state.animalDetails.species.displayName}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Gender
						</Typography>
						<Typography variant='body1'>
							{state.animalDetails.sex}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Home Region
						</Typography>
						<Typography variant='body1'>
							{state.animalDetails.homeRegion.displayName}
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
							onChange={(e) => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: 'animalDetails.species.displayName',
										value: e.target.value
									}
								})
							}}
							value={state.animalDetails.species.displayName}
						/>

						<TextField
							sx={{width: '529px', marginRight: '32px', marginTop: '32px'}}
							label='Home Region'
							id='homeRegion'
							value={state.animalDetails.homeRegion.displayName}
							onChange={(e) => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: 'animalDetails.homeRegion.displayName',
										value: e.target.value
									}
								})
							}}
						/>
						<Select
							sx={{width: '529px', marginTop: '32px'}}
							id='sex'
							label='Sex'
							value={state.animalDetails.sex}
							onChange={(e) => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: 'animalDetails.sex',
										value: e.target.value
									}
								})
							}}
						>
							{validSex.map((m) => (
								<MenuItem key={m.value} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</Select>
						{state.animalDetails.identifiers.map((identifier, index) => (

							<IdentifierEntry
								identifier={identifier}
								index={index}
								dispatch={dispatch}
							/>

						))}
						<Button onClick={() => {
							dispatch({
								type: 'animalDetails.identifiers.add'
							});
						}
						}>
							+ Add Identifier Types
						</Button>
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
