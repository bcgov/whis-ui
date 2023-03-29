import {Box, Button, Card} from '@mui/material';
import '../../../styles/search.scss';

import {DataGrid, GridColDef, GridValueFormatterParams} from '@mui/x-data-grid';
import React from 'react';
import {useSelector} from "../../../../state/utilities/use_selector";
import {Link} from "react-router-dom";
import moment from "moment";

const TemporaryResults = () => {

	const {working, results} = useSelector(state => state.Search);

	const columns: GridColDef[] = [
		{
			field: 'wlhID',
			headerName: 'WLH ID',
			width: 150
		},
		{
			field: 'creationDate',
			headerName: 'Creation Date',
			valueFormatter: (params: GridValueFormatterParams<number>) => moment(new Date(params.value)).format('LL'),
			width: 200
		},
		{
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			disableColumnMenu: true,
			width: 250,
			renderCell: (params) => {
				return (<Link to={`/wildlifeIds/detail/${params.row.id}`}>Detail</Link>);
			}
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
				{results !== null && <DataGrid rows={results} columns={columns} rowsPerPageOptions={[10, 20, 30]} checkboxSelection/>}
			</Box>
		</Card>
	);

};

export default TemporaryResults;
