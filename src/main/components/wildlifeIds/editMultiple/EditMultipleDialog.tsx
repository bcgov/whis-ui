import React, {useState} from 'react';
import {Dialog, DialogTitle, DialogContent, Typography, TextField, MenuItem, DialogActions, Box, Button} from '@mui/material';
import useCodeTable from '../../../hooks/useCodeTable';
import CancelDialog from '../../util/CancelDialog';

const EditMultipleDialog = ({open, close, acceptAction, noun, title}) => {
	const {mappedCodes: status} = useCodeTable('status');
	const {mappedCodes: purposes} = useCodeTable('purposes');
	const {mappedCodes: organizations} = useCodeTable('organizations');
	const {mappedCodes: roles} = useCodeTable('roles');

	const [cancelDialog, setCancelDialog] = useState(false);

	function renderForm() {
		switch (noun) {
			case 'status':
				return (
					<>
						<TextField
							className="changeStatus"
							id="idStatus"
							label="Change WLH Status *"
							select
							onChange={e => {
								acceptAction(e.target.value);
							}}
						>
							{status.map(m => (
								<MenuItem key={m.value} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<TextField
							className="oneColumn"
							label="Reason (Enter a reason why you are changing the WLH ID status)"
							id="reason"
							name="reason"
							multiline
							rows={3}
						/>
					</>
				);
				break;
			case 'information':
				return (
					<>
						<TextField className="twoColumns marginR" id="pri_purpose" label="Primary Purpose" required select>
							{purposes.map(m => (
								<MenuItem key={m.value} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<TextField className="twoColumns" id="sec_purpose" label="Secondary Purpose" required select>
							{purposes.map(m => (
								<MenuItem key={m.value} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<TextField className="oneColumn" label="Associated Project" id="associated_proj" />
						<TextField className="oneColumn" label="Project Details" id="proj_details" multiline rows={3} />
					</>
				);
				break;
			case 'requester':
				return (
					<>
						<TextField className="twoColumns marginR" label="First Name" id="first_name" required />
						<TextField className="twoColumns" label="Last Name" id="last_name" required />
						<TextField className="oneColumn" label="Region" id="region" />
						<TextField className="twoColumns marginR" id="organization" label="Organization" required select>
							{organizations.map(m => (
								<MenuItem key={m.value} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<TextField className="twoColumns" id="roles" label="Roles" required select>
							{roles.map(m => (
								<MenuItem key={m.value} value={m.value}>
									{m.label}
								</MenuItem>
							))}
						</TextField>
						<TextField className="twoColumns marginR" label="Phone Number" id="phone_number" />
						<TextField className="twoColumns" label="Email" id="email" />
					</>
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
				{renderForm()}
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
						Add
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
