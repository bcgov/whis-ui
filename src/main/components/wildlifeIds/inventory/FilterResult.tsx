import {Box, Card, Stack, Typography, Chip} from '@mui/material';
import '../../../styles/search.scss';
import CloseIcon from '@mui/icons-material/Close';

import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React from 'react';

const FilterResult = ({}) => {
	const handleDelete = () => {
		console.info('You clicked the delete icon.');
	};
	const handleClick = () => {
		console.info('You clicked the clear icon.');
	};

	const columns: GridColDef[] = [
		{field: 'id', headerName: 'WLH ID', width: 150},
		{field: 'creation_date', headerName: 'Creation Date', width: 180},
		{field: 'species', headerName: 'Species', sortable: false, disableColumnMenu: true, width: 250},
		{
			field: 'home_region',
			headerName: 'Home Region',
			sortable: false,
			disableColumnMenu: true,
			width: 250
		},
		{
			field: 'status',
			headerName: 'Status',
			// description: 'This column has a value getter and is not sortable.',
			sortable: false,
			disableColumnMenu: true,
			width: 150
			// valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
		},
		{
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			disableColumnMenu: true,
			width: 250
		}
	];

	const rows = [
		{id: '220000-1', creation_date: '22-01-2022', species: 'MooseMooseMoose 1', home_region: 'RegionRegion 1', status: 'Assigned'},
		{id: '220000-2-R', creation_date: '22-02-2022', species: 'MooseMooseMoose 2', home_region: 'RegionRegion 2', status: 'Retired'},
		{id: '220000-3', creation_date: '22-03-2022', species: 'MooseMooseMoose 3', home_region: 'RegionRegion 3', status: 'Assigned'},
		{id: '220000-4', creation_date: '22-04-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Assigned'},
		{id: '220000-5', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-6', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-7', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-8', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-9', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-10', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-11', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-12', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-13', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-14', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-15', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-16', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-17', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-18', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-19', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-20', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-21', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-22', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-23', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-24', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-25', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-26', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-27', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-28', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-29', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
		{id: '220000-30', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'},
	];

	return (
		<Card className="filter_result">
			<Box className="filters">
				<Typography className="filters_title">Filters</Typography>
				<Stack direction="row">
					<Stack direction="row" className="chips_container">
						<Chip label="Keyword: Moose" onDelete={handleDelete} className="filter_chips" deleteIcon={<CloseIcon />} />
						<Chip label="End Date:  25-01-2022" onDelete={handleDelete} className="filter_chips" deleteIcon={<CloseIcon />} />
						<Chip label="End Date:  25-01-2022" onDelete={handleDelete} className="filter_chips" deleteIcon={<CloseIcon />} />
						<Chip label="Status: Assigned" onDelete={handleDelete} className="filter_chips" deleteIcon={<CloseIcon />} />
						<Chip label="ID: 22000-1" onDelete={handleDelete} className="filter_chips" deleteIcon={<CloseIcon />} />
					</Stack>
					<Chip label="Clear all" onClick={handleClick} className="clear_filters" />
				</Stack>
			</Box>
			<Box className="results_table">
				<Typography>Found 5 WLH IDs</Typography>
				<DataGrid rows={rows} columns={columns}  rowsPerPageOptions={[10, 20, 30]} checkboxSelection/>
			</Box>
		</Card>
	);
};

export default FilterResult;
