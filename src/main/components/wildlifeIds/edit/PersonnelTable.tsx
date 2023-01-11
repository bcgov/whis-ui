import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
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
import React, { useState } from "react";
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

	return (
		<TableContainer component={Paper}>
			<Table
				sx={{tableLayout:'auto'}}
			>
				<TableHead>
					<TableRow className='tablehead'>
						<TableCell>First</TableCell>
						<TableCell>Last</TableCell>
						<TableCell>Region</TableCell>
						<TableCell>Organization</TableCell>
						<TableCell>Role</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>Email</TableCell>
						<TableCell>Action</TableCell>
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
							<TableCell>{p.phoneNumber}</TableCell>
							<TableCell>{p.email}</TableCell>
							<TableCell
								sx={{width:'112px'}}
							>
								{!!p.editAction && <IconButton onClick={() => {
									setCurrentEditAction({ handler: p.editAction });
									setEditingPerson(p);
									setEditDialogOpen(true);
								}}><EditIcon color='primary' /></IconButton>}
								{!!p.deleteAction && <IconButton><DeleteIcon onClick={() => {
									setCurrentDeletionAction({ handler: p.deleteAction });
									setDeleteConfirmationDialogOpen(true);
								}} color='primary' /></IconButton>}
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
					/>
				</TableHead>
			</Table>
		</TableContainer>
	)
}

export default PersonnelTable;
