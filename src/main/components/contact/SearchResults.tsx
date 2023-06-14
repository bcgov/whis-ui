import {Box, Card, IconButton, Menu, MenuItem} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NewContactDialog from './NewContactDialog';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LightTooltip from '../wildlifeIds/editMultiple/LightTooltip';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TrashBinIcon from '../util/TrashBinIcon';
import DeleteConfirm from '../wildlifeIds/edit/DeleteConfirm';
import {useSelector} from "../../../state/utilities/use_selector";
import Loading from "../util/Loading";

interface CustomMenuItem {
	anchorEl: null | HTMLElement;
	child: any;
}

const SearchResults = () => {

	const {contacts, initialized, error} = useSelector(state => state.Contacts);

	//table pagination
	const [pageSize, setPageSize] = React.useState(10);

	//open edit / delete contact dialog
	const [editContactDialog, setEditContactDialog] = useState(false);
	const [deleteContactDialog, setDeleteContactDialog] = useState(false);

	const [updateName, setUpdateName] = useState('');

	//show update buttons after any id selected
	const [isIDSelected, setIsIDSelected] = useState(false);

	const handleRowSelection = length => {
		if (length > 0) {
			setIsIDSelected(true);
		} else {
			setIsIDSelected(false);
		}
	};

	const [moreActions, setMoreActions] = React.useState<CustomMenuItem>({
		anchorEl: null,
		child: (
			<>
				<MenuItem
					onClick={() => {
						setEditContactDialog(true);
						setMoreActions({...moreActions, anchorEl: null});
					}}
				>
					<EditOutlinedIcon/>
					Edit Contact
				</MenuItem>
				<MenuItem
					onClick={() => {
						setDeleteContactDialog(true);
						setMoreActions({...moreActions, anchorEl: null});
					}}
				>
					<TrashBinIcon/>
					Delete Contact
				</MenuItem>
			</>
		)
	});

	const renderContactInfo = ({row}) => {
		if (row.email == '') {
			return row.phone;
		}
		if (row.phone == '') {
			return row.email;
		}
	};

	function renderActionsHeader() {
		return isIDSelected ? (
			<LightTooltip title={'Delete Selected Contacts'}>
				<IconButton
					className='deleteMultiIcon'
					onClick={() => {
						setDeleteContactDialog(true);
					}}
				>
					<TrashBinIcon/>
				</IconButton>
			</LightTooltip>
		) : (
			'Actions'
		);
	}

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

	const columns: GridColDef[] = [
		{
			width: 180,
			field: 'first_name',
			headerName: 'First Name'
		},
		{
			width: 180,
			field: 'last_name',
			headerName: 'Last Name'
		},
		{
			width: 180,
			field: 'role_display_name',
			headerName: 'Role'
		},
		{
			width: 200,
			field: 'region_display_name',
			headerName: 'Region'
		},
		{
			width: 215,
			field: 'organization_display_name',
			headerName: 'Organization'
		},
		{
			field: 'email',
			width: 220,
			headerName: 'Email/Phone',
			renderCell: renderContactInfo
		},
		{
			field: 'actions',
			renderHeader: renderActionsHeader,
			sortable: false,
			disableColumnMenu: true,
			width: 70,
			align: 'center',
			renderCell: renderMoreActions
		}
	];

	function renderTable() {
		return (
			<>
				<DataGrid
					getRowId={(row: any) => row.id}
					className='data'
					autoHeight
					rows={contacts}
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
					className='contactActionsMenu'
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

				<DeleteConfirm
					open={deleteContactDialog}
					acceptAction={() => {
						setDeleteContactDialog(false);
					}}
					cancelAction={() => {
						setDeleteContactDialog(false);
					}}
					noun={'selected contact(s)'}
				/>
			</>
		);
	}

	if (!initialized) {
		return <Loading/>;
	}

	return (
		<Card className='filter_result'>
			<Box className='results_table'>{renderTable()}</Box>
		</Card>
	);
};

export default SearchResults;
