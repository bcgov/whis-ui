import {Box, Button, Card, IconButton, Menu, MenuItem, MenuList, Stack, Typography} from '@mui/material';
import '../../../styles/search.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NewContactDialog from './NewContactDialog';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import LightTooltip from '../editMultiple/LightTooltip';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import {useSelector} from '../../../../state/utilities/use_selector';
import Loading from '../../util/Loading';
import TrashBinIcon from '../../util/TrashBinIcon';
import DeleteConfirm from '../edit/DeleteConfirm';

interface CustomMenuItem {
	anchorEl: null | HTMLElement;
	child: any;
}

const SearchResults = showFilterChips => {
	const navigate = useNavigate();
	// const {results, working} = useSelector(state => state.Search);

	//sample id data
	const state = {
		status: 'Assigned',
		wlh_id: '220000-1',
		generationDate: '2023-01-19',
		creator: 'effie@plasticviking.com'
	};

	const results = [
		{first_name: 'John', last_name: 'Huberman', region: 'Region 1', organization: 'organization 1', role: '', phone: '604-723-1045', email: 'sultana@gov.ca'},
		{first_name: 'Meghan', last_name: 'Bearg', region: 'Region 2', organization: '', role: '', phone: '773-7851-2524', email: ''},
		{first_name: 'Robin', last_name: 'Murino', region: '', organization: 'organization 1', role: 'Hunter', phone: '', email: 'sultana@gov.ca'},
		{first_name: 'Sultana', last_name: 'Majid', region: '', organization: '', role: '', phone: '654-123-5479', email: ''},
		{first_name: 'Sahar', last_name: 'Champiri', region: 'Region 1', organization: 'organization 1', role: '', phone: '', email: 'schampiri@gmail.com'},
		{
			first_name: 'Uhana',
			last_name: 'Mrianadol',
			region: 'Region 2',
			organization: 'organization 1',
			role: '',
			phone: '6047231055',
			email: 'sultana@gov.ca'
		},
		{first_name: 'Yleena', last_name: 'Doutson', region: '', organization: '', role: 'Hunter', phone: '604-723-1063', email: ''},
		{first_name: 'Yasamin', last_name: 'Purani', region: 'Region 2', organization: '', role: '', phone: '604-723-1063', email: ''},
		{first_name: 'Omansalar', last_name: 'Dehghani', region: 'Region 1', organization: 'organization 1', role: '', phone: '', email: 'dehghani@gov.bc.ca'},
		{first_name: 'Zohreh', last_name: 'Champiri', region: 'Region 2', organization: 'organization 1', role: '', phone: '', email: 'sultana@gov.ca'}
	];

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
					<EditOutlinedIcon />
					Edit Contact
				</MenuItem>
				<MenuItem
					onClick={() => {
						setDeleteContactDialog(true);
						setMoreActions({...moreActions, anchorEl: null});
					}}
				>
					<TrashBinIcon />
					Delete Contact
				</MenuItem>
			</>
		)
	});

	const renderContactInfo = params => {
		if (params.row.email == '') {
			return params.row.phone;
		}
		if (params.row.phone == '') {
			return params.row.email;
		}
	};

	function renderActionsHeader() {
		return isIDSelected ? (
			<LightTooltip title={'Delete Selected Contacts'}>
				<IconButton
					className="deleteMultiIcon"
					onClick={() => {
						setDeleteContactDialog(true);
					}}
				>
					<TrashBinIcon />
				</IconButton>
			</LightTooltip>
		) : (
			'Actions'
		);
	}

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
			field: 'role',
			headerName: 'Role'
		},
		{
			width: 200,
			field: 'region',
			headerName: 'Region'
		},
		{
			width: 215,
			field: 'organization',
			headerName: 'Organization'
		},
		{
			width: 220,
			field: 'email',
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
		// if (working) {
		// 	return <Loading />;
		// }
		// if (results == null) {
		// 	return <Error />;
		// }
		return (
			<>
				<DataGrid
					getRowId={(row: any) => row.first_name + row.last_name}
					className="data"
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
					onRowClick={itm => {
						setUpdateName(itm.row.first_name + ' ' + itm.row.last_name);
					}}
				/>
				<Menu
					className="contactActionsMenu"
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

				<NewContactDialog
					open={editContactDialog}
					title={'Update Contact'}
					buttonText={'Update'}
					confirmTitle={'Contact List Update'}
					confirmContent={`You have changed the contact information of ${updateName}`}
					updateAction={() => {
						setEditContactDialog(false);
					}}
					cancelAction={() => {
						setEditContactDialog(false);
					}}
				/>
				<DeleteConfirm
					open={deleteContactDialog}
					acceptAction={() => {
						setDeleteContactDialog(false);
					}}
					cancelAction={() => {
						setDeleteContactDialog(false);
					}}
					noun={'selected contact list(s)'}
				/>
			</>
		);
	}

	return (
		<Card className="filter_result">
			<Box className="results_table">{renderTable()}</Box>
		</Card>
	);
};

export default SearchResults;
