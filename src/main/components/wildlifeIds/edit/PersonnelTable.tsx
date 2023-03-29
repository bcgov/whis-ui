import {Box, IconButton, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, {useEffect, useState} from 'react';
import DeleteConfirm from './DeleteConfirm';
import PersonnelDialog from './PersonnelDialog';
import CodeLookup from '../../util/CodeLookup';
import LightTooltip from '../editMultiple/LightTooltip';
import TrashBinIcon from '../../util/TrashBinIcon';

const PersonnelTable = ({people, noun = 'Requester'}) => {
	function unsetDeletionHandler() {
		setDeleteConfirmationDialogOpen(false);
	}

	const [deleteConfirmationDialogOpen, setDeleteConfirmationDialogOpen] = useState(false);
	const [currentDeletionAction, setCurrentDeletionAction] = useState({
		handler: unsetDeletionHandler
	});

	const [editDialogOpen, setEditDialogOpen] = useState(false);
	const [currentEditAction, setCurrentEditAction] = useState({handler: unsetEditActionHandler});

	function unsetEditActionHandler(newPerson) {
		setEditDialogOpen(false);
	}

	const [editingPerson, setEditingPerson] = useState(null);

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const menuOpen = Boolean(anchorEl);

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const [menuCurrentActions, setMenuCurrentActions] = useState([]);
	const [menuCurrentPerson, setMenuCurrentPerson] = useState(null);

	function deletable(noun, p) {
		switch (noun) {
		case 'Submitter':
			return (
				<IconButton
					aria-controls={menuOpen ? 'positioned-menu' : undefined}
					aria-haspopup="true"
					aria-expanded={menuOpen ? 'true' : undefined}
					onClick={e => {
						setMenuCurrentPerson(p);
						handleMenuClick(e);
					}}
				>
					<MoreVertIcon color="primary" className="moreActionIcon"/>
				</IconButton>
			);
			break;
		case 'Requester':
			return (
				<LightTooltip title="Edit Requester">
					<IconButton
						aria-controls={menuOpen ? 'positioned-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={menuOpen ? 'true' : undefined}
						onClick={e => {
							setMenuCurrentPerson(p);
							// setCurrentEditAction({handler: menuCurrentPerson.editAction});
							setEditingPerson(menuCurrentPerson);
							setEditDialogOpen(true);
						}}
					>
						<EditIcon color="primary"/>
					</IconButton>
				</LightTooltip>
			);
			break;
		}
	}

	useEffect(() => {
		const actions = [];
		if (menuCurrentPerson != null) {
			if (menuCurrentPerson.editAction) {
				actions.push(
					<MenuItem
						className="personnelTableMenu"
						onClick={() => {
							setCurrentEditAction({handler: menuCurrentPerson.editAction});
							setEditingPerson(menuCurrentPerson);
							setEditDialogOpen(true);
							setAnchorEl(null);
						}}
					>
						<EditIcon color="primary" className="tableActionIcon"/>
						Edit {noun}
					</MenuItem>
				);
			}
			if (menuCurrentPerson.deleteAction) {
				actions.push(
					<MenuItem
						className="personnelTableMenu"
						onClick={() => {
							setCurrentDeletionAction({handler: menuCurrentPerson.deleteAction});
							setDeleteConfirmationDialogOpen(true);
							setAnchorEl(null);
						}}
					>
						<TrashBinIcon/>
						Remove {noun}
					</MenuItem>
				);
			}
		}
		setMenuCurrentActions(actions);
	}, [menuCurrentPerson, noun]);

	return (
		<TableContainer component={Box}>
			<Table className="personnelTable">
				<TableHead>
					<TableRow className="tableHead">
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
				<TableBody>
					{people.map(p => (
						<TableRow key={`${p.firstName} - ${p.lastName}`}>
							<TableCell>{p.firstName}</TableCell>
							<TableCell>{p.lastName}</TableCell>
							<TableCell>
								<CodeLookup codeTable={'regions'} code={p.region}/>
							</TableCell>
							<TableCell>
								<CodeLookup codeTable={'organizations'} code={p.organization}/>
							</TableCell>
							<TableCell>
								<CodeLookup codeTable={'roles'} code={p.role}/>
							</TableCell>
							<TableCell className="phone">{p.phoneNumber}</TableCell>
							<TableCell>{p.email}</TableCell>
							<TableCell>{deletable(noun, p)}</TableCell>
						</TableRow>
					))}
					<DeleteConfirm
						noun={noun}
						open={deleteConfirmationDialogOpen}
						cancelAction={() => {
							setDeleteConfirmationDialogOpen(false);
							setCurrentDeletionAction({handler: unsetDeletionHandler});
						}}
						acceptAction={() => {
							setDeleteConfirmationDialogOpen(false);
							currentDeletionAction.handler();
						}}
					/>
					<Menu
						id="positioned-menu"
						aria-labelledby="positioned-button"
						anchorEl={anchorEl}
						open={menuOpen}
						onClose={handleMenuClose}
						anchorOrigin={{
							vertical: 'center',
							horizontal: 'center'
						}}
						transformOrigin={{
							vertical: 'bottom',
							horizontal: 'right'
						}}
					>
						{menuCurrentActions}
					</Menu>
					<PersonnelDialog
						open={editDialogOpen}
						acceptAction={newPerson => {
							currentEditAction.handler(newPerson);
							setEditDialogOpen(false);
						}}
						cancelAction={() => {
							setCurrentEditAction({handler: unsetEditActionHandler});
							setEditDialogOpen(false);
						}}
						initialState={editingPerson}
						noun={`Update ${noun}`}
					/>
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PersonnelTable;
