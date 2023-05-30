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
	MenuItem,
	Checkbox,
	InputLabel,
	ListItemText,
	OutlinedInput,
	Select
} from '@mui/material';
import useCodeTable from '../../../hooks/useCodeTable';
import CancelDialog from '../../util/CancelDialog';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const AnimalDetailsDialog = ({title, open, close, acceptAction, attr}) => {
	const {mappedCodes: validSex} = useCodeTable('animal_sex');
	const {mappedCodes: regions} = useCodeTable('region');

	const fakeIDs = [
		{title: '23-00001'},
		{title: '23-00010'},
		{title: '23-00023'},
		{title: '23-00022'},
		{title: '23-00066'},
		{title: '22-00022'},
		{title: '22-00077'},
		{title: '22-00055'},
		{title: '22-00044'},
		{title: '22-00033'}
	];

	const [cancelDialog, setCancelDialog] = useState(false);

	const [defaultRadio, setApplyRadio] = useState('all');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setApplyRadio((event.target as HTMLInputElement).value);
	};

	function renderDetails() {
		switch (attr) {
			case 'region':
				return (
					<TextField label="Region" className="region" select>
						{regions.map(m => (
							<MenuItem key={m.value} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
				);
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
					<Autocomplete
						multiple
						options={fakeIDs}
						disableCloseOnSelect
						getOptionLabel={option => option.title}
						renderOption={(props, option, {selected}) => (
							<li {...props}>
								<Checkbox icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon />} style={{marginRight: 8}} checked={selected} />
								{option.title}
							</li>
						)}
						freeSolo
						renderInput={params => <TextField {...params} label="Select WLH IDs"/>}
					/>
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
