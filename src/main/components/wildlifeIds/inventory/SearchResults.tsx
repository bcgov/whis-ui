import {Box, Button, Card, IconButton, Menu, MenuItem, MenuList, Stack, Typography} from '@mui/material';
import '../../../styles/search.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NewEventDialog from './NewEventDialog';
import ChangeStatusDialog from './ChangeStatusDialog';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import LightTooltip from '../editMultiple/LightTooltip';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import {Error, Flag} from '@mui/icons-material';
import {FilterChips} from './FilterChips';
import {useSelector} from '../../../../state/utilities/use_selector';
import Loading from '../../util/Loading';
import DeflagDialog from './DeflagDialog';

interface CustomMenuItem {
	anchorEl: null | HTMLElement;
	child: any;
}

const SearchResults = showFilterChips => {
	const navigate = useNavigate();
	const {results, working} = useSelector(state => state.Search);

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

	const [flagDialog, setFlagDialog] = useState(false);

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
					className='ASSIGNED'
					onClick={() => {
						setChangeStatus({...changeStatus, anchorEl: null});
					}}
				>
					ASSIGNED
				</MenuItem>
				<MenuItem
					className='UNASSIGNED'
					onClick={() => {
						setChangeStatus({...changeStatus, anchorEl: null});
						setChangeStatusDialogOpen(true);
						setNewStatus('UNASSIGNED');
					}}
				>
					UNASSIGNED
				</MenuItem>
				<MenuItem
					className='RETIRED'
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

	//actions
	const renderMoreActions = () => {
		return (
			<Box className='actions'>
				<LightTooltip title='More Actions'>
					<IconButton
						aria-controls={open ? 'demo-positioned-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={(event: React.MouseEvent<HTMLButtonElement>) => setMoreActions({...moreActions, anchorEl: event.currentTarget})}
					>
						<MoreVertIcon/>
					</IconButton>
				</LightTooltip>
			</Box>
		);
	};

	const renderStatus = params => {
		const currentStatus = params.row.currentStatus?.toUpperCase() || '';
		return (
			<Button
				className={`statusDropdown ${currentStatus}`}
				onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
					setChangeStatus({...changeStatus, anchorEl: event.currentTarget});
				}}
			>
				<Stack direction='row' alignItems='center' justifyContent='space-between' width='inherit'>
					{currentStatus}
					<ArrowDropDownOutlinedIcon/>
				</Stack>
			</Button>
		);
	};

	const isFlag = params => {
		if (params.row.flagged) {
			return (
				<>
					{params.row.wildlifeHealthId}
					<IconButton
						onClick={() => {
							setFlagDialog(true);
						}}
					>
						<Flag className='idFlag'/>
					</IconButton>
				</>
			);
		} else {
			console.dir(params.row);
			return (
				<>
					<Link to={`/wildlifeIds/detail/${params.row.id}`}>{params.row.wildlifeHealthId}</Link>
				</>
			);
		}
	};

	const columns: GridColDef[] = [
		{
			field: 'wildlifeHealthId',
			headerName: 'WLH ID',
			width: 150,
			renderCell: isFlag
		},
		{
			field: 'species',
			headerName: 'Species',
			valueGetter: (params) => {
				return `${params.row.species?.englishName || ''}`;
			},
			width: 250
		},
		{
			field: 'region',
			headerName: 'Home Region',
			width: 230,
			valueGetter: (params) => {
				return `${params.row.region?.name || ''}`;
			}
		},
		{field: 'lastEventDate', headerName: 'Event Date', width: 200},
		{field: 'lastEventType', headerName: 'Event Type', width: 180},
		{
			field: 'status',
			headerName: 'Status',
			width: 160,
			// renderCell: renderStatus
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

	function renderTable() {
		if (working) {
			return <Loading/>;
		}
		if (results == null) {
			return <Error/>;
		}
		return (
			<>
				<DataGrid
					className='data'
					autoHeight
					rows={results}
					columns={columns}
					pageSize={pageSize}
					onPageSizeChange={newPageSize => setPageSize(newPageSize)}
					rowsPerPageOptions={[10, 20, 30, 40, 50]}
					checkboxSelection
					disableSelectionOnClick
					onSelectionModelChange={itm => {
						handleRowSelection(itm.length);
					}}
				/>
				<Menu
					className='moreActionsMenu'
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
					className='statusMenu'
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
				<DeflagDialog
					open={flagDialog}
					close={() => {
						setFlagDialog(false);
					}}
				/>
			</>
		);
	}

	return (
		<Card className='filter_result'>
			<FilterChips/>

			<Box className='results_table'>
				<Box className='resultTableHeader'>
					{/*<Typography>Last 50 created WLH IDs</Typography>*/}
					{/* After search */}
					<Typography>{results?.length} WLH IDs Found</Typography>
					{isIDSelected ? (
						<Stack direction='row' className='hiddenButtons'>
							<Button
								variant='outlined'
								onClick={() => {
									navigate('/wildlifeIds/edit/86');
								}}
							>
								Update WLH ID
							</Button>
							<Button
								variant='outlined'
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
				{renderTable()}
			</Box>
		</Card>
	);
};

export default SearchResults;
