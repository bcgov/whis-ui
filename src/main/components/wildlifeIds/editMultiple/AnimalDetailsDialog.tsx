import React, {useState} from 'react';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Box,
	Autocomplete,
	TextField,
	FormControl,
	RadioGroup,
	FormControlLabel,
	Radio,
	DialogActions,
	Button,
	MenuItem
} from '@mui/material';
import useCodeTable from '../../../hooks/useCodeTable';
import CancelDialog from '../../util/CancelDialog';

const AnimalDetailsDialog = ({title, open, close, acceptAction, attr}) => {
	const {mappedCodes: validSex} = useCodeTable('animal_sex');

	const fakeIDs = [
		{id: '23-00001'},
		{id: '23-00010'},
		{id: '23-00023'},
		{id: '23-00022'},
		{id: '23-00066'},
		{id: '22-00022'},
		{id: '22-00077'},
		{id: '22-00055'},
		{id: '22-00044'},
		{id: '22-00033'}
	];

	const [cancelDialog, setCancelDialog] = useState(false);

	const [defaultRadio, setApplyRadio] = useState('all');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setApplyRadio((event.target as HTMLInputElement).value);
	};

	function renderDetails() {
		switch (attr) {
			case 'region':
				return <TextField label="Region" className="region" />;
				break;
			case 'sex':
				return (
					<TextField label="Sex" className="region" select>
						{validSex.map(m => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
				);
				break;

			default:
				break;
		}
	}

	return (
		<>
			<Dialog open={open} onClose={close} maxWidth={false} className="updateRegionDialog">
				<DialogTitle>{title}</DialogTitle>
				<DialogContent>
					<Box className="selectRange">
						<Autocomplete
							freeSolo
							options={fakeIDs.map(option => option.id)}
							renderInput={params => <TextField {...params} label="From (select or write  WLH IDs)" />}
						/>
						<Autocomplete
							freeSolo
							options={fakeIDs.map(option => option.id)}
							renderInput={params => <TextField {...params} label="To (select or write  WLH IDs)" />}
						/>
					</Box>
					{renderDetails()}
					<FormControl>
						<RadioGroup value={defaultRadio} onChange={handleChange}>
							<FormControlLabel value="all" control={<Radio />} label="Apply to all of selected IDs" />
							<FormControlLabel value="individual" control={<Radio />} label="Apply individually" />
						</RadioGroup>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Box className="cardButtons">
						<Button variant={'contained'} className="update_btn" onClick={acceptAction}>
							Update
						</Button>
						<Button
							variant={'outlined'}
							className="update_btn"
							onClick={() => {
								close();
								setCancelDialog(true);
							}}
						>
							Close
						</Button>
					</Box>
				</DialogActions>
			</Dialog>
			<CancelDialog
				title={'Cancel Confirmation'}
				open={cancelDialog}
				close={() => {
					setCancelDialog(false);
				}}
				content={'You have not save your changes yet. Are you sure you want to cancel?'}
				acceptAction={() => {
					setCancelDialog(false);
				}}
			/>
		</>
	);
};
export default AnimalDetailsDialog;
