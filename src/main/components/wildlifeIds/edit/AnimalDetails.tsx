import Expandable from '../../pageElements/Expandable';
import {Box, Button, MenuItem, TextField, Typography} from '@mui/material';
import IdentifierEntry from './IdentifierEntry';
import React, {useState} from 'react';
import useCodeTable from '../../../hooks/useCodeTable';
import CodeLookup from '../../util/CodeLookup';
import CancelDialog from '../../util/CancelDialog';
import ConfirmDialog from '../../util/ConfirmDialog';
import TaxonomySearch from "../../util/TaxonomySearch";
import {useSelector} from "../../../../state/utilities/use_selector";
import Loading from "../../util/Loading";

const AnimalDetails = ({dirty, expansionEvent, dispatch, state, resetState, saveState}) => {

	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
	const {
		region: regions,
		animal_sex: sexes
	} = useSelector(state => state.CodeTables.tables);
	const {initialized: codeTablesLoaded} = useSelector(state => state.CodeTables);

	if (!codeTablesLoaded) {
		return (<Loading/>);
	}

	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Animal Details</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Species</Typography>
						<Typography variant="body1">{state.species?.englishName}</Typography>
					</span>
					<span>
						<Typography variant="body2">Sex</Typography>
						<Typography variant="body1">
							<CodeLookup codeTable={'animal_sex'} code={state.animalSex}/>
						</Typography>
					</span>
					<span>
						<Typography variant="body2">Home Region</Typography>
						<Typography variant="body1">
							<CodeLookup codeTable={'regions'} code={state.region}/>
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<TaxonomySearch
						onValueChange={v => dispatch({
							type: 'fieldChange',
							payload: {
								field: 'animalDetails.species',
								value: v
							}
						})}
						className="species"
						value={state.species}
					/>

					<TextField
						select
						className="leftColumn"
						label="Home Region"
						id="region"
						value={state.region}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'region',
									value: e.target.value
								}
							});
						}}
					>
						{regions.codes.map(r => (
							<MenuItem key={r.code} value={r.code}>
								{r.name}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						className="rightColumn"
						id="sex"
						label="Sex"
						value={state.animalSex}
						onChange={e => {
							dispatch({
								type: 'fieldChange',
								payload: {
									field: 'animalSex',
									value: e.target.value
								}
							});
						}}
					>
						{sexes.codes.map(m => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
					<Box className="identifier">
						{state.identifiers.map((identifier, index) => (
							<Box className="identifierEntry">
								<IdentifierEntry identifier={identifier} index={index} dispatch={dispatch}/>
							</Box>
						))}
					</Box>
					<Button
						variant="outlined"
						className="addIdentifier"
						onClick={() => {
							dispatch({
								type: 'identifiers.add'
							});
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
					title={'Update Confirmation'}
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

				<Box className="cardButtons">
					<Button disabled={!dirty} variant={'contained'} className="update_btn" onClick={() => {
						setConfirmDialogOpen(true)
					}}>
						Update
					</Button>
					<Button disabled={!dirty} variant={'outlined'} className="update_btn" onClick={() => {
						setCancelDialogOpen(true)
					}}>
						Cancel
					</Button>
				</Box>

			</Expandable.Detail>
		</Expandable>
	);
};

export default AnimalDetails;
