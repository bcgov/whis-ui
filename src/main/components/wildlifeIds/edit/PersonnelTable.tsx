import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Menu,
	MenuItem,
	Paper,
	Table,
	TableCell,
	TableContainer,
	TableHead,
	TableRow
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState, useEffect } from "react";
import DeleteConfirm from "./DeleteConfirm";
import PersonnelDialog from "./PersonnelDialog";
import CodeLookup from "../../util/CodeLookup";

const PersonnelTable = ({ people, noun = 'Requester' }) => {


	function unsetDeletionHandler() {
		setDeleteConfirmationDialogOpen(false);
	}

	const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState(false);
	const [currentDeletionAction, setCurrentDeletionAction] = useState({
		handler: unsetDeletionHandler
	});

	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [currentEditAction, setCurrentEditAction] = useState({ handler: unsetEditActionHandler })

	function unsetEditActionHandler(newPerson) {
		setEditDialogOpen(false);
	}

	const [editingPerson, setEditingPerson] = useState(null);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{ tableLayout: 'auto' }}
			>
				<TableHead>
					<TableRow className='tablehead'>
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>Region</TableCell>
						<TableCell>Organization</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Actions</TableCell>
					</TableRow>
				</TableHead>
				<TableHead>
					{people.map(p => (
						<TableRow key={`${p.firstName - p.lastName}`}>
							<TableCell>{p.firstName}</TableCell>
							<TableCell>{p.lastName}</TableCell>
							<TableCell>
								<CodeLookup codeTable={'regions'} code={p.region} />
							</TableCell>
							<TableCell>
								<CodeLookup codeTable={'organizations'} code={p.organization} />
							</TableCell>
							<TableCell>
								<CodeLookup codeTable={'roles'} code={p.role} />
							</TableCell>
							<TableCell sx={{whiteSpace:'nowrap'}}>{p.phoneNumber}</TableCell>
							<TableCell>{p.email}</TableCell>
							<TableCell>
								<IconButton
									id="demo-positioned-button"
									aria-controls={open ? 'demo-positioned-menu' : undefined}
									aria-haspopup="true"
									aria-expanded={open ? 'true' : undefined}
									onClick={handleClick}
								>
									<MoreVertIcon color='primary' />
								</IconButton>
								<Menu
									id="demo-positioned-menu"
									aria-labelledby="demo-positioned-button"
									anchorEl={anchorEl}
									open={open}
									onClose={handleClose}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'left',
									}}
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
								>
									{!!p.editAction && <MenuItem onClick={() => {
										setCurrentEditAction({ handler: p.editAction });
										setEditingPerson(p);
										setEditDialogOpen(true);
										setAnchorEl(null);
									}}><EditIcon color="primary" sx={{marginRight:'10px'}}/>Edit {noun}</MenuItem>}
									{!!p.deleteAction && <MenuItem onClick={() => {
										setCurrentDeletionAction({ handler: p.deleteAction });
										setDeleteConfirmationDialogOpen(true);
										setAnchorEl(null);
									}}><DeleteIcon color="primary" sx={{marginRight:'10px'}}/>Remove {noun}</MenuItem>}

								</Menu>
							</TableCell>

						</TableRow>
					))}
					<DeleteConfirm noun={noun} open={deleteConfirmationDialogOpen} cancelAction={() => {
						setDeleteConfirmationDialogOpen(false);
						setCurrentDeletionAction({ handler: unsetDeletionHandler });
					}} acceptAction={() => {
						setDeleteConfirmationDialogOpen(false);
						currentDeletionAction.handler();
					}} />
					<PersonnelDialog
						open={editDialogOpen}
						acceptAction={(newPerson) => {
							currentEditAction.handler(newPerson);
							setEditDialogOpen(false);
						}}
						cancelAction={() => {
							setCurrentEditAction({ handler: unsetEditActionHandler });
							setEditDialogOpen(false);
						}}
						initialState={editingPerson}
						noun={`Update ${noun}`}
					/>
				</TableHead>
			</Table>
		</TableContainer>
	)
}

export default PersonnelTable;
