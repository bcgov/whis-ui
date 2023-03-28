import Expandable from '../../pageElements/Expandable';
import {Box, Button, InputAdornment, MenuItem, TextField, Typography} from '@mui/material';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import IdentifierEntry from './IdentifierEntry';
import React, {useState} from 'react';
import useCodeTable from '../../../hooks/useCodeTable';
import CodeLookup from '../../util/CodeLookup';
import CancelDialog from '../../util/CancelDialog';
import ConfirmDialog from '../../util/ConfirmDialog';

const AnimalDetails = ({expansionEvent, dispatch, state, resetState, saveState}) => {
	const {mappedCodes: validSex} = useCodeTable('animal_sex');
	const {mappedCodes: regions} = useCodeTable('regions');

	const [displayUpdateButtons, setDisplayUpdateButtons] = useState(false);
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Animal Details</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Species</Typography>
						<Typography variant="body1">{state.animalDetails.species}</Typography>
					</span>
					<span>
						<Typography variant="body2">Sex</Typography>
						<Typography variant="body1">
							<CodeLookup codeTable={'animal_sex'} code={state.animalDetails.sex} />
						</Typography>
					</span>
					<span>
						<Typography variant="body2">Home Region</Typography>
						<Typography variant="body1">
							<CodeLookup codeTable={'regions'} code={state.animalDetails.homeRegion} />
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<TextField
						className="species"
						label="Species"
						id="species"
						name="species"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<AccountTreeOutlinedIcon />
								</InputAdornment>
							)
						}}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'animalDetails.species',
									value: e.target.value
								}
							});
							setDisplayUpdateButtons(true);
						}}
						value={state.animalDetails.species}
					/>

					<TextField
						select
						className="leftColumn"
						label="Home Region"
						id="homeRegion"
						value={state.animalDetails.homeRegion}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'animalDetails.homeRegion',
									value: e.target.value
								}
							});
							setDisplayUpdateButtons(true);
						}}
					>
						{regions.map(r => (
							<MenuItem key={r.value} value={r.value}>
								{r.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						className="rightColumn"
						id="sex"
						label="Sex"
						value={state.animalDetails.sex}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'animalDetails.sex',
									value: e.target.value
								}
							});
							setDisplayUpdateButtons(true);
						}}
					>
						{validSex.map(m => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<Box className="identifier">
						{state.animalDetails.identifiers.map((identifier, index) => (
							<Box className="identifierEntry">
								<IdentifierEntry
									identifier={identifier}
									index={index}
									dispatch={dispatch}
									showUpdateButtons={() => {
										setDisplayUpdateButtons(true);
									}}
								/>
							</Box>
						))}
					</Box>
					<Button
						variant="outlined"
						className="addIdentifier"
						onClick={() => {
							dispatch({
								type: 'animalDetails.identifiers.add'
							});
							setDisplayUpdateButtons(true);
						}}
					>
						+ Add Identifier Types
					</Button>
				</Box>
				<ConfirmDialog
					open={confirmDialogOpen}
					close={() => {
						resetState()
						setConfirmDialogOpen(false);
					}}
					acceptAction={() => {
						saveState()
						setConfirmDialogOpen(false);
					}}
					icon={'NotificationImportantIcon'}
					title={'Do you want to continue?'}
					content={'Would you like to save your changes?'}
				/>
				<CancelDialog
					open={cancelDialogOpen}
					close={() => {
						setCancelDialogOpen(false);
					}}
					acceptAction={resetState}
					title={'Cancel WLH ID Animal Details Update'}
					content={'You have not saved your changes. Are you sure you want to cancel?'}
				/>
				{displayUpdateButtons && (
					<Box className="cardButtons">
						<Button variant={'contained'} className="update_btn" onClick={()=>{setConfirmDialogOpen(true)}}>
							Update
						</Button>
						<Button variant={'outlined'} className="update_btn" onClick={()=>{setCancelDialogOpen(true)}}>
							Cancel
						</Button>
					</Box>
				)}
			</Expandable.Detail>
		</Expandable>
	);
};

export default AnimalDetails;
