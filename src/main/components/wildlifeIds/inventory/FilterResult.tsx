import {
	Box,
	Card,
	Stack,
	Typography,
	Chip,
	Button,
	IconButton,
	Tooltip,
	TooltipProps,
	tooltipClasses,
	styled,
	MenuItem,
	Menu,
	MenuList,
	Select
} from '@mui/material';
import '../../../styles/search.scss';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NewEventDialog from './NewEventDialog';
import ChangeStatusDialog from './ChangeStatusDialog';
import {DataGrid, GridColDef, GridSelectionModel} from '@mui/x-data-grid';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LightTooltip from '../editMultiple/LightTooltip';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {Flag} from '@mui/icons-material';

interface CustomMenuItem {
	anchorEl: null | HTMLElement;
	child: any;
}

const FilterResult = showFilterChips => {
	const navigate = useNavigate();

	//sample id data
	const state = {
		status: 'Assigned',
		wlh_id: '220000-1',
		generationDate: '2023-01-19',
		creator: 'effie@plasticviking.com'
	};

	//table pagination
	const [pageSize, setPageSize] = React.useState(10);

	//open new event / change status dialog
	const [newEventDialogOpen, setNewEventDialogOpen] = useState(false);
	const [changeStatusDialogOpen, setChangeStatusDialogOpen] = useState(false);

	//show update buttons after any id selected
	const [isIDSelected, setIsIDSelected] = useState(false);

	const handleRowSelection = length => {
		if (length > 0) {
			setIsIDSelected(true);
		} else {
			setIsIDSelected(false);
		}
	};

	const [newStatus, setNewStatus] = useState('');

	const [moreActions, setMoreActions] = React.useState<CustomMenuItem>({
		anchorEl: null,
		child: (
			<>
				<MenuItem
					onClick={() => {
						navigate('/wildlifeIds/edit/86');
						setMoreActions({...moreActions, anchorEl: null});
					}}
				>
					Update WLH ID
				</MenuItem>
				<MenuItem
					onClick={() => {
						setNewEventDialogOpen(true);
						setMoreActions({...moreActions, anchorEl: null});
					}}
				>
					Add New Event
				</MenuItem>
			</>
		)
	});
	const [changeStatus, setChangeStatus] = React.useState<CustomMenuItem>({
		anchorEl: null,
		child: (
			<MenuList>
				<MenuItem
					className="ASSIGNED"
					onClick={() => {
						setChangeStatus({...changeStatus, anchorEl: null});
					}}
				>
					ASSIGNED
				</MenuItem>
				<MenuItem
					className="UNASSIGNED"
					onClick={() => {
						setChangeStatus({...changeStatus, anchorEl: null});
						setChangeStatusDialogOpen(true);
						setNewStatus('UNASSIGNED');
					}}
				>
					UNASSIGNED
				</MenuItem>
				<MenuItem
					className="RETIRED"
					onClick={() => {
						setChangeStatus({...changeStatus, anchorEl: null});
						setChangeStatusDialogOpen(true);
						setNewStatus('RETIRED');
					}}
				>
					RETIRED
				</MenuItem>
			</MenuList>
		)
	});

	//status styled
	const statusClasses = id_status => {
		const toUpperCase = id_status.toUpperCase();
		return <span className={toUpperCase}>{id_status}</span>;
	};

	//delete filter chip
	const handleDelete = () => {};
	//clear all filters
	const handleClear = () => {};

	//actions
	const renderMoreActions = () => {
		return (
			<Box className="actions">
				<LightTooltip title="More Actions">
					<IconButton
						aria-controls={open ? 'demo-positioned-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
						onClick={(event: React.MouseEvent<HTMLButtonElement>) => setMoreActions({...moreActions, anchorEl: event.currentTarget})}
					>
						<MoreVertIcon />
					</IconButton>
				</LightTooltip>
			</Box>
		);
	};

	const renderStatus = params => {
		const currentStatus = params.row.status.toUpperCase();
		return (
			<Button
				className={`statusDropdown ${currentStatus}`}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					setChangeStatus({...changeStatus, anchorEl: event.currentTarget});
					// filterOptions(currentStatus);
				}}
			>
				<Stack direction="row" alignItems="center" justifyContent="space-between" width="inherit">
					{currentStatus}
					<ArrowDropDownOutlinedIcon />
				</Stack>
			</Button>
		);
	};

	const isFlag = params => {
		if (params.row.id.includes('R')) {
			return (
				<>
					{params.row.id}
					<Flag className="idFlag" />
				</>
			);
		}
	};

	const columns: GridColDef[] = [
		{field: 'id', headerName: 'WLH ID', width: 150, renderCell: isFlag},
		{field: 'species', headerName: 'Species', width: 250},
		{
			field: 'home_region',
			headerName: 'Home Region',
			width: 230
		},
		{field: 'event_date', headerName: 'Event Date', width: 200},
		{field: 'event_type', headerName: 'Event Type', width: 180},
		{
			field: 'status',
			headerName: 'Status',
			width: 160,
			renderCell: renderStatus
		},
		{
			field: 'actions',
			headerName: 'Actions',
			sortable: false,
			disableColumnMenu: true,
			width: 70,
			align: 'center',
			renderCell: renderMoreActions
		}
	];

	const rows = [
		{id: '220000-1', species: 'MooseMooseMoose 1', home_region: 'RegionRegion 1', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-2-R', species: 'MooseMooseMoose 2', home_region: 'RegionRegion 2', event_date: '', event_type: '', status: 'Retired'},
		{id: '220000-3', species: 'MooseMooseMoose 3', home_region: 'RegionRegion 3', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-4', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-5', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Unassigned'},
		{id: '220000-6-R', species: 'MooseMooseMoose 2', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Retired'},
		{id: '220000-7', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-8-R', species: 'MooseMooseMoose 2', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-9', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Unassigned'},
		{id: '220000-10', species: 'MooseMooseMoose 1', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Unassigned'},
		{id: '220000-11', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-12-R', species: 'MooseMooseMoose 2', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-13-R', species: 'MooseMooseMoose 2', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Unassigned'},
		{id: '220000-14', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Retired'},
		{id: '220000-15', species: 'MooseMooseMoose 3', home_region: 'RegionRegion 1', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-16', species: 'MooseMooseMoose 1', home_region: 'RegionRegion 1', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-17-R', species: 'MooseMooseMoose 2', home_region: 'RegionRegion 2', event_date: '', event_type: '', status: 'Retired'},
		{id: '220000-18', species: 'MooseMooseMoose 3', home_region: 'RegionRegion 3', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-19', species: 'MooseMooseMoose 1', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-20', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Unassigned'},
		{id: '220000-21', species: 'MooseMooseMoose 2', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Retired'},
		{id: '220000-22', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Retired'},
		{id: '220000-23', species: 'MooseMooseMoose 1', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Retired'},
		{id: '220000-24', species: 'MooseMooseMoose 1', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Unassigned'},
		{id: '220000-25', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-26', species: 'MooseMooseMoose 1', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Unassigned'},
		{id: '220000-27', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Assigned'},
		{id: '220000-28', species: 'MooseMooseMoose 1', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Retired'},
		{id: '220000-29', species: 'MooseMooseMoose 4', home_region: 'RegionRegion 4', event_date: '', event_type: '', status: 'Unassigned'},
		{id: '220000-30', species: 'MooseMooseMoose 3', home_region: 'RegionRegion 1', event_date: '', event_type: '', status: 'Assigned'}
	];

	return (
		<Card className="filter_result">
			{showFilterChips && (
				<Box className="filters">
					<Typography className="filters_title">Filters</Typography>
					<Stack direction="row" justifyContent={'space-between'}>
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
			)}
			<Box className="results_table">
				<Box className="resultTableHeader">
					<Typography>Last 50 created WLH IDs</Typography>
					{/* After search
					<Typography>{rows.length} WLH IDs Found</Typography> */}
					{isIDSelected ? (
						<Stack direction="row" className="hiddenButtons">
							<Button
								variant="outlined"
								onClick={() => {
									navigate('/wildlifeIds/edit/86');
								}}
							>
								Update WLH ID
							</Button>
							<Button
								variant="outlined"
								onClick={() => {
									setNewEventDialogOpen(true);
								}}
							>
								Add New Event
							</Button>
						</Stack>
					) : (
						[]
					)}
				</Box>
				<DataGrid
					className="data"
					autoHeight
					rows={rows}
					columns={columns}
					pageSize={pageSize}
					onPageSizeChange={newPageSize => setPageSize(newPageSize)}
					rowsPerPageOptions={[10, 20, 30, 40, 50]}
					checkboxSelection
					disableSelectionOnClick
					onSelectionModelChange={itm => {
						handleRowSelection(itm.length);
					}}
					getRowClassName={params => {
						if (params.row.id.includes('R')) {
							return 'idFlagBG';
						}
					}}
				/>
				<Menu
					className="moreActionsMenu"
					open={Boolean(moreActions.anchorEl)}
					onClose={() => setMoreActions({...moreActions, anchorEl: null})}
					anchorEl={moreActions.anchorEl}
					anchorOrigin={{
						vertical: 'center',
						horizontal: 'center'
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right'
					}}
				>
					{moreActions.child}
				</Menu>
				<Menu
					className="statusMenu"
					open={Boolean(changeStatus.anchorEl)}
					onClose={() => setChangeStatus({...changeStatus, anchorEl: null})}
					anchorEl={changeStatus.anchorEl}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center'
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center'
					}}
				>
					{changeStatus.child}
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
					newStatus={newStatus}
				/>
			</Box>
		</Card>
	);
};

export default FilterResult;
