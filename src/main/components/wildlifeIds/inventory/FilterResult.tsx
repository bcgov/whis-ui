import {Box, Card, Stack, Typography, Chip, Button, IconButton, Tooltip, TooltipProps, tooltipClasses, styled, MenuItem, Menu} from '@mui/material';
import '../../../styles/search.scss';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NewEventDialog from './NewEventDialog';
import ChangeStatusDialog from './ChangeStatusDialog';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const FilterResult = ({}) => {
	const navigate = useNavigate();

	//sample id data
	const state = {
		status:'Assigned',
		wlh_id:'22-00001',
		generationDate:'2023-01-19',
		creator:'effie@plasticviking.com'
	}

	//table pagination
	const [pageSize, setPageSize] = React.useState(10);

	//open more actions menu
	const [anchorEl, setAnchorEl] = useState(null);
	const menuOpen = Boolean(anchorEl);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	//open new event / change status dialog
	const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
	const [changeStatusDialogOpen, setChangeStatusDialogOpen] = useState(false);

	//status styled
	const statusClasses = id_status => {
		const toUpperCase = id_status.toUpperCase();
		return <Box className={toUpperCase}>{id_status}</Box>;
	};

	const LightTooltip = styled(({className, ...props}: TooltipProps) => <Tooltip {...props} classes={{popper: className}} arrow />)(({theme}) => ({
		[`& .${tooltipClasses.arrow}`]: {
			color: theme.palette.common.white,
			'&:before': {border: '1px solid #E6E8ED'}
		},
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: theme.palette.common.white,
			color: 'rgba(0, 0, 0, 0.87)',
			boxShadow: theme.shadows[1],
			fontSize: 11,
			border: '1px solid #E6E8ED'
		}
	}));

	//delete filter chip
	const handleDelete = () => {
		
	};
	//clear all filters
	const handleClear = () => {
		
	};

	//actions
	const renderMoreActions = () => {
		return (
			<Box className="actions">
				<Button
					variant="outlined"
					onClick={() => {
						navigate('/wildlifeIds/edit/86');
					}}
				>
					Update Purpose
				</Button>
				<Button
					variant="outlined"
					onClick={() => {
						navigate('/wildlifeIds/edit/86');
					}}
				>
					Update Details
				</Button>
				<LightTooltip title="More Actions">
					<IconButton
						aria-controls={open ? 'demo-positioned-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={handleMenuClick}
					>
						<MoreVertIcon />
					</IconButton>
				</LightTooltip>
			</Box>
		);
	};

	const columns: GridColDef[] = [
		{field: 'id', headerName: 'WLH ID', width: 150},
		{field: 'creation_date', headerName: 'Creation Date', width: 160},
		{field: 'species', headerName: 'Species', sortable: false, disableColumnMenu: true, width: 250},
		{
			field: 'home_region',
			headerName: 'Home Region',
			sortable: false,
			disableColumnMenu: true,
			width: 220
		},
		{
			field: 'status',
			headerName: 'Status',
			sortable: false,
			disableColumnMenu: true,
			width: 150,
			renderCell: params => statusClasses(params.row.status)
		},
		{
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			disableColumnMenu: true,
			width: 280,
			renderCell: renderMoreActions
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
		{id: '220000-30', creation_date: '22-05-2022', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', status: 'Unassigned'}
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
					<Chip label="Clear all" onClick={handleClear} className="clear_filters" />
				</Stack>
			</Box>
			<Box className="results_table">
				<Typography>Found 5 WLH IDs</Typography>
				<DataGrid
					className="data"
					rows={rows}
					columns={columns}
					pageSize={pageSize}
					onPageSizeChange={newPageSize => setPageSize(newPageSize)}
					rowsPerPageOptions={[10, 20, 30]}
					checkboxSelection
					disableSelectionOnClick
				/>
				<Menu
					className="moreActionsMenu"
					anchorEl={anchorEl}
					open={menuOpen}
					onClose={handleMenuClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right'
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'left'
					}}
				>
					<MenuItem
						onClick={() => {
							navigate('/wildlifeIds/edit/86');
							handleMenuClose;
						}}
					>
						Update Event
					</MenuItem>
					<MenuItem
						onClick={() => {
							setNewEventDialogOpen(true);
							handleMenuClose();
						}}
					>
						Add New Event
					</MenuItem>
					<MenuItem
						onClick={() => {
							setChangeStatusDialogOpen(true);
							handleMenuClose();
						}}
					>
						Change Status
					</MenuItem>
				</Menu>
				<NewEventDialog
					open={newEventDialogOpen}
					updateAction={() => {
						setNewEventDialogOpen(false);
					}}
					cancelAction={() => {
						setNewEventDialogOpen(false);
					}}
					state={state}
				/>
				<ChangeStatusDialog
					open={changeStatusDialogOpen}
					updateAction={() => {
						setChangeStatusDialogOpen(false);
					}}
					cancelAction={() => {
						setChangeStatusDialogOpen(false);
					}}
					state={state}
				/>
			</Box>
		</Card>
	);
};

export default FilterResult;
