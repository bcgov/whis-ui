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
	IconButton
} from '@mui/material';
import CancelDialog from '../../util/CancelDialog';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import TrashBinIcon from '../../util/TrashBinIcon';

const AnimalDetailsDialog = ({title, open, close, acceptAction, attr, options}) => {
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

	const r_rows = [
		{id: '22-00001', region: 'Lower Homeland'},
		{id: '22-00002', region: 'Peace'},
		{id: '22-00003', region: ''},
		{id: '22-00004', region: ''},
		{id: '22-00005', region: ''},
		{id: '22-00006', region: ''},
		{id: '22-00007', region: ''},
		{id: '22-00008', region: ''},
		{id: '22-00009', region: ''},
		{id: '22-00010', region: ''}
	];
	const s_rows = [
		{id: '22-00001', sex: 'Male'},
		{id: '22-00002', sex: 'Female'},
		{id: '22-00003', sex: ''},
		{id: '22-00004', sex: ''},
		{id: '22-00005', sex: ''},
		{id: '22-00006', sex: ''},
		{id: '22-00007', sex: ''},
		{id: '22-00008', sex: ''},
		{id: '22-00009', sex: ''},
		{id: '22-00010', sex: ''}
	];
	const r_columns: GridColDef[] = [
		{field: 'id', headerName: 'ID', width: 150, cellClassName: 'id_cell'},
		{
			field: 'region',
			headerName: 'Region',
			sortable: false,
			disableColumnMenu: true,
			width: 420,
			editable: true,
			cellClassName: 'region_cell',
			type: 'singleSelect',
			valueOptions: () => {
				const regions = [];
				options?.codes?.map(m => regions.push(m.name));
				return regions;
			}
		},
		{
			field: 'delete',
			headerName: '',
			sortable: false,
			disableColumnMenu: true,
			width: 60,
			renderCell: () => {
				return (
					<IconButton>
						<TrashBinIcon />
					</IconButton>
				);
			}
		}
	];
	const s_columns: GridColDef[] = [
		{field: 'id', headerName: 'ID', width: 150, cellClassName: 'id_cell'},
		{
			field: 'sex',
			headerName: 'Sex',
			sortable: false,
			disableColumnMenu: true,
			width: 420,
			editable: true,
			type: 'singleSelect',
			valueOptions: () => {
				const sex = [];
				options?.codes?.map(m => sex.push(m.name));
				return sex;
			}
		},
		{
			field: 'delete',
			headerName: '',
			sortable: false,
			disableColumnMenu: true,
			width: 60,
			renderCell: () => {
				return (
					<IconButton>
						<TrashBinIcon />
					</IconButton>
				);
			}
		}
	];

	//table pagination
	const [pageSize, setPageSize] = React.useState(10);

	const [cancelDialog, setCancelDialog] = useState(false);

	const [defaultRadio, setApplyRadio] = useState('all');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setApplyRadio((event.target as HTMLInputElement).value);
	};

	function renderDetails() {
		switch (attr) {
			case 'region':
				return (
					<TextField label="Region" className="multiEdit_field" select>
						{options?.codes?.map(m => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
				);
				break;
			case 'sex':
				return (
					<TextField label="Sex" className="multiEdit_field" select>
						{options?.codes?.map(m => (
							<MenuItem key={m.code} value={m.code}>
								{m.name}
							</MenuItem>
						))}
					</TextField>
				);
				break;

			default:
				break;
		}
	}
	function renderTable() {
		switch (attr) {
			case 'region':
				return (
					<DataGrid
						rows={r_rows}
						columns={r_columns}
						pageSize={pageSize}
						onPageSizeChange={newPageSize => setPageSize(newPageSize)}
						rowsPerPageOptions={[10, 20, 30]}
						disableSelectionOnClick
						autoHeight
					/>
				);
				break;
			case 'sex':
				return (
					<DataGrid
						rows={s_rows}
						columns={s_columns}
						pageSize={pageSize}
						onPageSizeChange={newPageSize => setPageSize(newPageSize)}
						rowsPerPageOptions={[10, 20, 30]}
						disableSelectionOnClick
						autoHeight
					/>
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
						renderInput={params => <TextField {...params} label="Select WLH IDs" />}
					/>
					{defaultRadio === 'all' && renderDetails()}
					<FormControl>
						<RadioGroup value={defaultRadio} onChange={handleChange}>
							<FormControlLabel value="all" control={<Radio />} label="Apply to all of selected IDs" />
							<FormControlLabel value="individual" control={<Radio />} label="Apply individually" />
						</RadioGroup>
					</FormControl>
					{defaultRadio === 'individual' && renderTable()}
				</DialogContent>
				<DialogActions>
						<Button
							variant={'contained'}
							onClick={() => {
								acceptAction();
								setApplyRadio('all');
							}}
						>
							Update
						</Button>
						<Button
							variant={'outlined'}
							onClick={() => {
								setCancelDialog(true);
							}}
						>
							Close
						</Button>
				</DialogActions>
			</Dialog>
			<CancelDialog
				title={'Cancel Confirmation'}
				open={cancelDialog}
				close={() => {
					setCancelDialog(false);
					setApplyRadio('all');
				}}
				content={'You have not save your changes yet. Are you sure you want to cancel?'}
				acceptAction={() => {
					close();
					setCancelDialog(false);
					setApplyRadio('all');
				}}
			/>
		</>
	);
};
export default AnimalDetailsDialog;
