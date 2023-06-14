import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, Typography, TextField, MenuItem, DialogActions, Box, Button, Grid} from '@mui/material';
import CancelDialog from '../../util/CancelDialog';
import {useSelector} from '../../../../state/utilities/use_selector';

const EditMultipleDialog = ({open, close, acceptAction, noun, title}) => {
	const {
		purpose: purposes,
	} = useSelector(state => state.CodeTables.tables);

	const validStatuses = ['ASSIGNED', 'UNASSIGNED', 'RETIRED'];

	const [cancelDialog, setCancelDialog] = useState(false);

	const [formState, setFormState] = useState({
		species: null,
		region: '',
		projectDetail: '',
		purpose: '',
		status: '',
		requester: '',
		project: '',
		selectedDate: null
	});

	function renderForm() {
		switch (noun) {
		case 'status':
			return (
				<Grid item container rowGap={4} mt={2}>
					<Grid item xs={12} md={6}>
						<TextField
							id="idStatus"
							label="Change WLH Status *"
							select
							onChange={e => {
								acceptAction(e.target.value);
							}}
						>
							{validStatuses.map(m => (
								<MenuItem key={m} value={m}>
									{m}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField label="Reason (Enter a reason why you are changing the WLH ID status)" id="reason" name="reason" multiline rows={3} />
					</Grid>
				</Grid>
			);
			break;
		case 'information':
			return (
				<Grid item container spacing={4} mt={1}>
					<Grid item xs={12} md={6}>
						<TextField id="pri_purpose" label="Primary Purpose" required select>
							{purposes?.codes?.map(m => (
								<MenuItem key={m.code} value={m.code}>
									{m.name}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField id="sec_purpose" label="Secondary Purpose" required select>
							{purposes?.codes?.map(m => (
								<MenuItem key={m.code} value={m.code}>
									{m.name}
								</MenuItem>
							))}
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField label="Associated Project" id="associated_proj" />
					</Grid>
					<Grid item xs={12}>
						<TextField label="Project Details" id="proj_details" multiline rows={3} />
					</Grid>
				</Grid>
			);
			break;
		case 'requester':
			return (
				<Grid item xs={12} mt={2}>
					{/*<ContactSelection*/}
					{/*	handleSelect={id => {*/}
					{/*		setFormState({*/}
					{/*			...formState,*/}
					{/*			requester: id*/}
					{/*		});*/}
					{/*	}}*/}
					{/*/>*/}
				</Grid>
			);
			break;

		default:
			break;
		}
	}

	return (
		<Dialog
			open={open}
			onClose={() => {
				close();
			}}
			maxWidth={false}
			className="updateDetailsDialog"
		>
			<DialogTitle>{title}</DialogTitle>
			<DialogContent>
				<Typography>
					Please note that any changes will be applied to <ins>ALL selected IDs.</ins>
				</Typography>
				<Typography>Edit the selected WLH IDs using the link on the top of this page.</Typography>
				<Grid container>{renderForm()}</Grid>
			</DialogContent>
			<DialogActions>
				<Box className="cardButtons">
					<Button
						variant={'contained'}
						className="update_btn"
						onClick={() => {
							close();
						}}
					>
						Update
					</Button>
					<Button
						variant={'outlined'}
						className="update_btn"
						onClick={() => {
							setCancelDialog(true);
						}}
					>
						Cancel
					</Button>
				</Box>
			</DialogActions>
			<CancelDialog
				title={'Cancel Confirmation'}
				open={cancelDialog}
				close={() => {
					setCancelDialog(false);
				}}
				content={'You have not save your changes yet. Are you sure you want to cancel?'}
				acceptAction={() => {
					close();
					setCancelDialog(false);
				}}
			/>
		</Dialog>
	);
};

export default EditMultipleDialog;
