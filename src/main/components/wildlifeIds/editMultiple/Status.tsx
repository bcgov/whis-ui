import Expandable from '../../pageElements/Expandable';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	FormGroup,
	IconButton,
	MenuItem,
	Switch,
	TextField,
	Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import LightTooltip from './LightTooltip';
import EditMultipleDialog from './EditMultipleDialog';
import ConfirmDialog from '../../util/ConfirmDialog';
import CancelDialog from '../../util/CancelDialog';
import DeflagDialog from '../inventory/DeflagDialog';
import {Flag} from '@mui/icons-material';

const Status = ({expansionEvent}) => {
	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

	const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
	const [multipleStatus, setMultipleStatus] = useState('');
	const [multipleReason, setMultipleReason] = useState('');

	const [displayedStatus, setDisplayedStatus] = useState('Unassigned');
	const [lastState, setLastState] = useState(null);

	useEffect(() => {
		if (lastState !== null) {
			setDisplayedStatus(lastState.status);
		} else {
			setDisplayedStatus('Unassigned');
		}
	}, [lastState]);

	function renderEdit() {
		return (
			<LightTooltip title="Edit WLH ID status">
				<IconButton
					onClick={() => {
						setOpenUpdateDialog(true);
					}}
				>
					<EditIcon color="primary" />
				</IconButton>
			</LightTooltip>
		);
	}

	const columns: GridColDef[] = [
		{field: 'id', headerName: 'WLH ID', width: 180, cellClassName: 'id_cell'},
		{
			width: 180,
			field: 'status',
			headerName: 'Status',
			renderCell() {
				if (multipleStatus !== '') {
					return multipleStatus.charAt(0).toUpperCase() + multipleStatus.toLowerCase();
				}
			}
		},
		{
			width: 675,
			field: 'reason',
			headerName: 'Reason',
			sortable: false,
			disableColumnMenu: true,
			renderCell() {
				if (multipleReason !== '') {
					return multipleReason;
				}
			}
		},
		{
			width: 60,
			field: 'edit',
			headerName: 'Reason',
			sortable: false,
			disableColumnMenu: true,
			renderHeader: renderEdit
		}
	];

	const rows = [
		{id: '220000-1', status: 'Assigned', reason: 'The reason is mandatory when we change the status from assigned to unassigned'},
		{id: '220000-2', status: 'Retired', reason: ''},
		{id: '220000-3', status: 'Assigned', reason: 'The reason is mandatory when we change the status.'},
		{id: '220000-4', status: 'Assigned', reason: 'The reason is mandatory when we change the status from assigned to unassigned'},
		{id: '220000-5', status: 'Unassigned', reason: ''}
	];


	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'multiple_card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Status</Typography>
					<Typography className={multipleStatus !== '' ? multipleStatus : 'MULTIPLE'} variant="subtitle1">
						{multipleStatus !== '' ? multipleStatus.charAt(0).toUpperCase() + multipleStatus.slice(1).toLowerCase() : 'Multiple'}
					</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">WLH ID Number</Typography>
						<Typography variant="body1">22-00001-22-00010</Typography>
					</span>
					<span>
						<Typography variant="body2">WLH ID Generated Date</Typography>
						<Typography variant="body1">Multiple</Typography>
					</span>
					<span>
						<Typography variant="body2">WLH ID Creator</Typography>
						<Typography variant="body1">Multiple</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<DataGrid rows={rows} columns={columns} disableSelectionOnClick hideFooter={true} />
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
					icon={'NotificationImportantIcon'}
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
					title={'Cancel WLH ID Status Update'}
					content={'You have not saved your changes. Are you sure you want to cancel?'}
				/>
				<EditMultipleDialog
					open={openUpdateDialog}
					close={() => {
						setOpenUpdateDialog(false);
					}}
					acceptAction={setMultipleStatus}
					noun={'status'}
					title={'WLH ID Status Update'}
				/>
			</Expandable.Detail>
		</Expandable>
	);
};

export default Status;
