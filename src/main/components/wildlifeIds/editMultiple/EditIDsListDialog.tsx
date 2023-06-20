import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, Typography, TextField, MenuItem, DialogActions, Box, Button} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';

const EditIDsListDialog = ({open, close}) => {

	const [multipleStatus, setMultipleStatus] = useState('');

	const columns: GridColDef[] = [
		{field: 'id', headerName: 'ID', width: 150},
		{
			width: 150,
			field: 'species',
			headerName: 'Species'
		},
		{
			width: 180,
			field: 'current_event',
			headerName: 'Current Event (s)',
			sortable: false,
			disableColumnMenu: true
		}
	];

	const rows = [
		{id: '220000-1', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-2', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-3', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-4', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-5', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-6', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-7', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-8', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-9', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-10', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-11', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-12', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-13', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-14', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-15', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-16', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-17', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-18', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-19', species: 'Fish xxx', current_event: 'Recapture'},
		{id: '220000-20', species: 'Fish xxx', current_event: 'Recapture'}
	];
	//table pagination
	const [pageSize, setPageSize] = useState(10);

	return (
		<Dialog
			open={open}
			onClose={() => {
				close();
			}}
			maxWidth={false}
			className="selectMultipleIDsDialog"
		>
			<DialogTitle>Select the WLH IDs that you would like to update</DialogTitle>
			<DialogContent>
				<DataGrid
					rows={rows}
					columns={columns}
					disableSelectionOnClick
					checkboxSelection
					autoHeight
					pageSize={pageSize}
					onPageSizeChange={newPageSize => setPageSize(newPageSize)}
					rowsPerPageOptions={[10, 20, 30, 40, 50]}
				/>
			</DialogContent>
			<DialogActions>
					<Button
						variant={'contained'}
						onClick={() => {
							close();
						}}
					>
						Select
					</Button>
					<Button
						variant={'outlined'}
						onClick={() => {
							close();
							setMultipleStatus('');
						}}
					>
						Close
					</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditIDsListDialog;
