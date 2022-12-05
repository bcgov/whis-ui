import Expandable from "../../pageElements/Expandable";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {useState} from "react";
import useCodeTable from "../../../hooks/useCodeTable";
import PersonnelTable from "./PersonnelTable";
import PersonnelDialog from "./PersonnelDialog";

const Purpose = ({
	expansionEvent,
	dispatch,
	state
}) => {

	const [addRequesterDialogOpen, setAddRequesterDialogOpen] = useState(false);

	const {mappedCodes: purposes} = useCodeTable('purposes');

	return (
		<Expandable expansionEvent={expansionEvent}>
			<Expandable.Title>
				<span>
					<Typography sx={{fontSize: '18px', width: '90px'}}>Purpose</Typography>
				</span>
				<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
					<span>
						<Typography variant='body2'>
							Primary Purpose
						</Typography>
						<Typography variant='body1'>
							{state.purpose.primaryPurpose}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Requester
						</Typography>
						<Typography variant='body1'>
							{state.purpose.requester && `${state.purpose.requester.firstName} ${state.purpose.requester.lastName}` || 'unset'}
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Organization
						</Typography>
						<Typography variant='body1'>
							{state.purpose.requester && `${state.purpose.requester.organization}` || 'unset'}
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box sx={{width: '1091px', margin: '0 auto'}}>
					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '32px 0 21px 0'}}>WLH ID information</Typography>
					<TextField
						sx={{width: '529px'}}
						select
						label='Primary Purpose'
						value={state.purpose.primaryPurpose}
						onChange={(e) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'purpose.primaryPurpose',
									value: e.target.value
								}
							})
						}}
					>
						{purposes.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						sx={{width: '529px', marginLeft: '32px'}}
						select
						label='Secondary Purpose'
						value={state.purpose.secondaryPurpose}
						onChange={(e) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'purpose.secondaryPurpose',
									value: e.target.value
								}
							})
						}}
					>
						{purposes.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>

					<TextField
						sx={{minWidth: '1091px', marginTop: '32px'}}
						label='Associated Project'
						id='associatedProject'
						name='associatedProject'
						value={state.purpose.associatedProject}
						onChange={(e) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'purpose.associatedProject',
									value: e.target.value
								}
							})
						}}
					/>
					<TextField
						sx={{minWidth: '1091px', marginTop: '32px'}}
						label='Project Details'
						id='projectDetails'
						name='projectDetails'
						multiline
						rows={3}
						value={state.purpose.projectDetails}
						onChange={(e) => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'purpose.projectDetails',
									value: e.target.value
								}
							})
						}}
					/>

					<Box className='requester'>
						<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '32px 0 21px 0'}}>
							Requester
						</Typography>

						{state.purpose.requester && <PersonnelTable people={[
							{
								...state.purpose.requester,
								editAction: (updatedPerson) => {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: 'purpose.requester',
											value: updatedPerson
										}
									})
								},
								deleteAction: () => {
									dispatch({
										type: 'fieldChange',
										payload: {
											field: 'purpose.requester',
											value: null
										}
									})
								}
							}
						]}/>}

						{state.purpose.requester === null &&
							<Button variant={'outlined'} sx={{marginTop: '7px', width: '128px', height: '32px', fontSize: '14px', padding: '0', textTransform: 'capitalize'}}
											onClick={() => {
												setAddRequesterDialogOpen(true)
											}}>+ Add Requester</Button>}

						<PersonnelDialog
							open={addRequesterDialogOpen}
							acceptAction={(p) => {
								dispatch({
									type: 'fieldChange',
									payload: {
										field: 'purpose.requester',
										value: p
									}
								});
								setAddRequesterDialogOpen(false);
							}}
							cancelAction={() => {
								setAddRequesterDialogOpen(false);
							}}
							initialState={null}
						/>


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

export default Purpose;
