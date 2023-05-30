import Expandable from '../../pageElements/Expandable';
import {Box, Button, IconButton, MenuItem, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import useCodeTable from '../../../hooks/useCodeTable';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import LightTooltip from './LightTooltip';
import EditIcon from '@mui/icons-material/Edit';
import EditMultipleDialog from './EditMultipleDialog';
import ConfirmDialog from '../../util/ConfirmDialog';
import CancelDialog from '../../util/CancelDialog';

const Purpose = ({expansionEvent}) => {
	const [informationDialogOpen, setInformationDialogOpen] = useState(false);
	const [requesterDialogOpen, setRequesterDialogOpen] = useState(false);

	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

	const {mappedCodes: purposes} = useCodeTable('purposes');

	function renderEditInfo() {
		return (
			<LightTooltip title="Edit WLH ID information">
				<IconButton
					onClick={() => {
						setInformationDialogOpen(true);
					}}
				>
					<EditIcon color="primary" />
				</IconButton>
			</LightTooltip>
		);
	}
	function renderEditRequester() {
		return (
			<LightTooltip title="Edit WLH ID requester">
				<IconButton
					onClick={() => {
						setRequesterDialogOpen(true);
					}}
				>
					<EditIcon color="primary" />
				</IconButton>
			</LightTooltip>
		);
	}

	const id_columns: GridColDef[] = [
		{field: 'id', headerName: 'WLH ID', width: 145, cellClassName: 'id_cell'},
		{
			width: 220,
			field: 'pri_purpose',
			headerName: 'Primary Purpose'
		},
		{
			width: 220,
			field: 'sec_purpose',
			headerName: 'Secondary Purpose'
		},
		{
			width: 220,
			field: 'associated_proj',
			headerName: 'Associated Project'
		},
		{
			width: 230,
			field: 'proj_details',
			headerName: 'Project Details'
		},
		{
			width: 60,
			field: 'edit',
			headerName: 'Reason',
			sortable: false,
			disableColumnMenu: true,
			renderHeader: renderEditInfo
		}
	];
	const requester_columns: GridColDef[] = [
		{field: 'id', headerName: 'WLH ID', width: 120, cellClassName: 'id_cell'},
		{
			width: 125,
			field: 'name',
			headerName: 'Name'
		},
		{
			width: 125,
			field: 'last_name',
			headerName: 'Last Name'
		},
		{
			width: 125,
			field: 'region',
			headerName: 'Region'
		},
		{
			width: 140,
			field: 'organization',
			headerName: 'Organization'
		},
		{
			width: 125,
			field: 'role',
			headerName: 'Role'
		},
		{
			width: 125,
			field: 'phone',
			headerName: 'Phone'
		},
		{
			width: 150,
			field: 'email',
			headerName: 'Email'
		},
		{
			width: 60,
			field: 'edit',
			headerName: 'Reason',
			sortable: false,
			disableColumnMenu: true,
			renderHeader: renderEditRequester
		}
	];

	const id_rows = [
		{
			id: '220000-1',
			pri_purpose: 'Herd Health',
			sec_purpose: 'Passive Surveillance',
			associated_proj: 'Associated Project 1',
			proj_details: 'Project Details Project Details'
		},
		{
			id: '220000-2',
			pri_purpose: 'Passive Surveillance',
			sec_purpose: 'Passive Surveillance',
			associated_proj: 'Associated Project 2',
			proj_details: 'This is the details for a project'
		},
		{
			id: '220000-3',
			pri_purpose: 'Targeted Surveillance',
			sec_purpose: 'Targeted Surveillance',
			associated_proj: '',
			proj_details: 'Here is the project details'
		},
		{id: '220000-4', pri_purpose: 'Herd Health', sec_purpose: 'Herd Health', associated_proj: 'Associated Project 2', proj_details: ''},
		{
			id: '220000-5',
			pri_purpose: 'Targeted Surveillance',
			sec_purpose: 'Passive Surveillance',
			associated_proj: 'Associated Project 2',
			proj_details: 'Project Details Project Details'
		},
		{
			id: '220000-6',
			pri_purpose: 'Herd Health',
			sec_purpose: 'Targeted Surveillance',
			associated_proj: 'Associated Project 1',
			proj_details: 'Project Details Project Details'
		},
		{
			id: '220000-7',
			pri_purpose: 'Targeted Surveillance',
			sec_purpose: 'Herd Health',
			associated_proj: 'Associated Project 1',
			proj_details: 'Project Details Project Details'
		},
		{
			id: '220000-8',
			pri_purpose: 'Passive Surveillance',
			sec_purpose: 'Targeted Surveillance',
			associated_proj: 'Associated Project 2',
			proj_details: 'Project Details Project Details'
		},
		{id: '220000-9', pri_purpose: 'Herd Health', sec_purpose: 'Herd Health', associated_proj: '', proj_details: 'Project Details Project Details'},
		{
			id: '220000-10',
			pri_purpose: 'Targeted Surveillance',
			sec_purpose: 'Passive Surveillance',
			associated_proj: 'Associated Project 1',
			proj_details: 'Project Details Project Details'
		}
	];
	const requester_rows = [
		{id: '220000-1', name: 'Sultana', last_name: 'Majid', region: 'Region 1', organization: 'organization 1', role: '', phone: '', email: 'sultana@gov.ca'},
		{id: '220000-2', name: 'Sultana', last_name: 'Majid', region: 'Region 2', organization: '', role: '', phone: '', email: 'sultana@gov.ca'},
		{id: '220000-3', name: 'Shari', last_name: 'Shari', region: '', organization: 'organization 1', role: 'Hunter', phone: '', email: ''},
		{id: '220000-4', name: 'Meghan', last_name: 'Meghan', region: '', organization: '', role: '', phone: '6047231055', email: ''},
		{id: '220000-5', name: 'Zohreh', last_name: 'Champiri', region: 'Region 1', organization: 'organization 1', role: '', phone: '', email: ''},
		{
			id: '220000-6',
			name: 'Sultana',
			last_name: 'Majid',
			region: 'Region 2',
			organization: 'organization 1',
			role: '',
			phone: '6047231055',
			email: 'sultana@gov.ca'
		},
		{id: '220000-7', name: 'Zohreh', last_name: 'Champiri', region: '', organization: '', role: 'Hunter', phone: '', email: ''},
		{id: '220000-8', name: 'Sultana', last_name: 'Majid', region: 'Region 2', organization: '', role: '', phone: '', email: 'sultana@gov.ca'},
		{id: '220000-9', name: 'Sultana', last_name: 'Majid', region: 'Region 1', organization: 'organization 1', role: '', phone: '', email: 'sultana@gov.ca'},
		{id: '220000-10', name: 'Sultana', last_name: 'Majid', region: 'Region 2', organization: 'organization 1', role: '', phone: '', email: 'sultana@gov.ca'}
	];

	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'multiple_card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Purpose</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Primary Purpose</Typography>
						<Typography variant="body1">Multiple</Typography>
					</span>
					<span>
						<Typography variant="body2">Requester</Typography>
						<Typography variant="body1">Multiple</Typography>
					</span>
					<span>
						<Typography variant="body2">Organization</Typography>
						<Typography variant="body1">Multiple</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<Typography className="detailsSubtitle">WLH ID information</Typography>
					<DataGrid rows={id_rows} columns={id_columns} disableSelectionOnClick hideFooter={true} />
					<Typography className="detailsSubtitle">Requester</Typography>
					<DataGrid rows={requester_rows} columns={requester_columns} disableSelectionOnClick hideFooter={true} />
				</Box>
				<Box className="cardButtons">
					<Button
						variant={'contained'}
						className="update_btn"
						onClick={() => {
							setConfirmDialogOpen(true);
						}}
					>
						Update
					</Button>
					<Button
						variant={'outlined'}
						className="update_btn"
						onClick={() => {
							setCancelDialogOpen(true);
						}}
					>
						Cancel
					</Button>
				</Box>

				<ConfirmDialog
					open={confirmDialogOpen}
					close={() => {
						setConfirmDialogOpen(false);
					}}
					acceptAction={() => {
						setConfirmDialogOpen(false);
					}}
					title={'Update Confirmation'}
					content={'Would you like to save your changes?'}
				/>
				<CancelDialog
					open={cancelDialogOpen}
					close={() => {
						setCancelDialogOpen(false);
					}}
					acceptAction={() => {
						setCancelDialogOpen(false);
					}}
					title={'Cancel WLH ID Purpose Update'}
					content={'You have not saved your changes. Are you sure you want to cancel?'}
				/>

				<EditMultipleDialog
					open={informationDialogOpen}
					close={() => {
						setInformationDialogOpen(false);
					}}
					acceptAction={() => {
						setInformationDialogOpen(false);
					}}
					noun={'information'}
					title={'WLH ID Information Update'}
				/>
				<EditMultipleDialog
					open={requesterDialogOpen}
					close={() => {
						setRequesterDialogOpen(false);
					}}
					acceptAction={() => {
						setRequesterDialogOpen(false);
					}}
					noun={'requester'}
					title={'Update Requester'}
				/>
			</Expandable.Detail>
		</Expandable>
	);
};

export default Purpose;
