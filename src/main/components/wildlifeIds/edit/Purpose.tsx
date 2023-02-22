import Expandable from '../../pageElements/Expandable';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField, Typography} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React, {useState} from 'react';
import useCodeTable from '../../../hooks/useCodeTable';
import PersonnelTable from './PersonnelTable';
import PersonnelDialog from './PersonnelDialog';
import CodeLookup from '../../util/CodeLookup';

const Purpose = ({expansionEvent, dispatch, state, resetState, saveState}) => {
	const [addRequesterDialogOpen, setAddRequesterDialogOpen] = useState(false);

	const {mappedCodes: purposes} = useCodeTable('purposes');

	return (
		<Expandable expansionEvent={expansionEvent}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Purpose</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Primary Purpose</Typography>
						<Typography variant="body1">
							<CodeLookup codeTable={'purposes'} code={state.purpose.primaryPurpose} />
						</Typography>
					</span>
					<span>
						<Typography variant="body2">Requester</Typography>
						<Typography variant="body1">
							{(state.purpose.requester && `${state.purpose.requester.firstName} ${state.purpose.requester.lastName}`) || 'unset'}
						</Typography>
					</span>
					<span>
						<Typography variant="body2">Organization</Typography>
						<Typography variant="body1">
							<CodeLookup codeTable={'organizations'} code={(state.purpose.requester && `${state.purpose.requester.organization}`) || 'unset'} />
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<Typography className='detailsSubtitle'>
						WLH ID information
					</Typography>
					<TextField
						className='priPurpose'
						select
						label="Primary Purpose"
						value={state.purpose.primaryPurpose}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'purpose.primaryPurpose',
									value: e.target.value
								}
							});
						}}
					>
						{purposes.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						className='secPurpose'
						select
						label="Secondary Purpose"
						value={state.purpose.secondaryPurpose}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'purpose.secondaryPurpose',
									value: e.target.value
								}
							});
						}}
					>
						{purposes.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>

					<TextField
						className='project'
						label="Associated Project"
						id="associatedProject"
						name="associatedProject"
						value={state.purpose.associatedProject}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'purpose.associatedProject',
									value: e.target.value
								}
							});
						}}
					/>
					<TextField
						className='projectDetails'
						label="Project Details"
						id="projectDetails"
						name="projectDetails"
						multiline
						rows={3}
						value={state.purpose.projectDetails}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'purpose.projectDetails',
									value: e.target.value
								}
							});
						}}
					/>

					<Box>
						<Typography className='detailsSubtitle'>
							Requester
						</Typography>

						{state.purpose.requester && (
							<PersonnelTable
								people={[
									{
										...state.purpose.requester,
										editAction: updatedPerson => {
											dispatch({
												type: 'fieldChange',
												payload: {
													field: 'purpose.requester',
													value: updatedPerson
												}
											});
										},
										deleteAction: () => {
											dispatch({
												type: 'fieldChange',
												payload: {
													field: 'purpose.requester',
													value: null
												}
											});
										}
									}
								]}
							/>
						)}

						{state.purpose.requester === null && (
							<Button
								variant={'outlined'}
								className='addRequester'
								onClick={() => {
									setAddRequesterDialogOpen(true);
								}}
							>
								+ Add Requester
							</Button>
						)}

						<PersonnelDialog
							open={addRequesterDialogOpen}
							acceptAction={p => {
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
				<Box className="cardButtons">
					<Button variant={'contained'} className="update_btn" onClick={saveState}>
						Update
					</Button>
					<Button variant={'outlined'} className="update_btn" onClick={resetState}>
						Cancel
					</Button>
				</Box>
			</Expandable.Detail>
		</Expandable>
	);
};

export default Purpose;
