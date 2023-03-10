import {Box, Card, Stack, Typography, Chip} from '@mui/material';
import '../../../styles/search.scss';
import CloseIcon from '@mui/icons-material/Close';

import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React from 'react';
import {useSelector} from "../../../../state/utilities/use_selector";

const TemporaryResults = () => {

	const {working, results} = useSelector(state => state.Search);

	const columns: GridColDef[] = [
		{field: 'wlhID', headerName: 'WLH ID', width: 150},
		{field: 'creationDate', headerName: 'Creation Date', width: 180},
		// {field: 'species', headerName: 'Species', sortable: false, disableColumnMenu: true, width: 250},
		// {
		// 	field: 'home_region',
		// 	headerName: 'Home Region',
		// 	sortable: false,
		// 	disableColumnMenu: true,
		// 	width: 250
		// },
		// {
		// 	field: 'status',
		// 	headerName: 'Status',
		// 	// description: 'This column has a value getter and is not sortable.',
		// 	sortable: false,
		// 	disableColumnMenu: true,
		// 	width: 150
		// 	// valueGetter: (params: GridValueGetterParams) => `${params.row.firstName || ''} ${params.row.lastName || ''}`
		// },
		{
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			disableColumnMenu: true,
			width: 250
		}
	];
	return (
		<Card className="filter_result">
			{/*<Box className="filters">*/}
			{/*	<Typography className="filters_title">Filters</Typography>*/}
			{/*	<Stack direction="row">*/}
			{/*		<Stack direction="row" className="chips_container">*/}
			{/*			<Chip label="Keyword: Moose" onDelete={handleDelete} className="filter_chips" deleteIcon={<CloseIcon />} />*/}
			{/*			<Chip label="End Date:  25-01-2022" onDelete={handleDelete} className="filter_chips" deleteIcon={<CloseIcon />} />*/}
			{/*			<Chip label="End Date:  25-01-2022" onDelete={handleDelete} className="filter_chips" deleteIcon={<CloseIcon />} />*/}
			{/*			<Chip label="Status: Assigned" onDelete={handleDelete} className="filter_chips" deleteIcon={<CloseIcon />} />*/}
			{/*			<Chip label="ID: 22000-1" onDelete={handleDelete} className="filter_chips" deleteIcon={<CloseIcon />} />*/}
			{/*		</Stack>*/}
			{/*		<Chip label="Clear all" onClick={handleClick} className="clear_filters" />*/}
			{/*	</Stack>*/}
			{/*</Box>*/}
			<Box className="results_table">
				{results !== null && <DataGrid rows={results} columns={columns}  rowsPerPageOptions={[10, 20, 30]} checkboxSelection/>}
			</Box>
		</Card>
	);

};

export default TemporaryResults;
