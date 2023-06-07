import Expandable from '../../pageElements/Expandable';
import {Box, Button, IconButton, InputAdornment, TextField, Typography} from '@mui/material';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import React, {useState} from 'react';
import '../../../styles/updateID.scss';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import LightTooltip from './LightTooltip';
import AnimalDetailsDialog from './AnimalDetailsDialog';
import ConfirmDialog from '../../util/ConfirmDialog';
import CancelDialog from '../../util/CancelDialog';
import {useSelector} from '../../../../state/utilities/use_selector';

const AnimalDetails = ({expansionEvent}) => {
	const {region: regions, animal_sex: animal_sex} = useSelector(state => state.CodeTables.tables);

	const [updateRegion, setUpdateRegion] = useState(false);
	const [updateSex, setUpdateSex] = useState(false);

	const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
	const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

	const columns: GridColDef[] = [
		{field: 'id', headerName: 'WLH ID', width: 240, cellClassName: 'id_cell'},
		{field: 'species', headerName: 'Species', sortable: false, disableColumnMenu: true, width: 310},
		{
			field: 'home_region',
			sortable: false,
			disableColumnMenu: true,
			width: 310,
			editable: true,
			cellClassName: 'region_cell',
			renderHeader: () => {
				return (
					<>
						<span>Home Region</span>
						<LightTooltip title="Update Region to IDs">
							<IconButton
								onClick={() => {
									setUpdateRegion(true);
								}}
							>
								<AddIcon color="primary" />
							</IconButton>
						</LightTooltip>
					</>
				);
			},
			type: 'singleSelect',
			valueOptions: () => {
				const options = [];
				regions?.codes?.map(type => options.push(type.name));
				return options;
			}
		},

		{
			field: 'sex',
			sortable: false,
			disableColumnMenu: true,
			width: 230,
			editable: true,
			cellClassName: 'sex_cell',
			renderHeader: () => {
				return (
					<>
						<span>Sex</span>
						<LightTooltip title="Edit Sex of IDs">
							<IconButton
								onClick={() => {
									setUpdateSex(true);
								}}
							>
								<EditIcon color="primary" />
							</IconButton>
						</LightTooltip>
					</>
				);
			},
			type: 'singleSelect',
			valueOptions: () => {
				const options = [];
				animal_sex?.codes?.map(type => options.push(type.name));
				return options;
			}
		}
	];

	const rows = [
		{id: '22-00001', species: 'Moose', home_region: 'Lower Homeland', sex: 'Female'},
		{id: '22-00002', species: 'Deer', home_region: '', sex: 'Male'},
		{id: '22-00003', species: 'Moose', home_region: '', sex: 'Female'},
		{id: '22-00004', species: 'Deer', home_region: '', sex: 'Male'},
		{id: '22-00005', species: 'Moose', home_region: '', sex: 'Female'},
		{id: '22-00006', species: 'Deer', home_region: '', sex: 'Male'},
		{id: '22-00007', species: 'Moose', home_region: '', sex: 'Female'},
		{id: '22-00008', species: 'Deer', home_region: '', sex: 'Male'},
		{id: '22-00009', species: 'Moose', home_region: '', sex: 'Female'},
		{id: '22-00010', species: 'Deer', home_region: '', sex: 'Male'}
	];

	return (
		<Expandable expansionEvent={expansionEvent} expansionCardsClassName={'multiple_card'}>
			<Expandable.Title>
				<span className="cardSubtitle">
					<Typography>Animal Details</Typography>
				</span>
				<Box className="info">
					<span>
						<Typography variant="body2">Species</Typography>
						<Typography variant="body1">Moose</Typography>
					</span>
					<span>
						<Typography variant="body2">Sex</Typography>
						<Typography variant="body1">Multiple</Typography>
					</span>
					<span>
						<Typography variant="body2">Home Region</Typography>
						<Typography variant="body1">Multiple</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box className="cardDetails">
					<TextField
						className="findSpecies"
						label="Type any keyword to find the species (The selected species will be applied to all of the WLH IDs)"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<AccountTreeOutlinedIcon />
								</InputAdornment>
							)
						}}
					/>
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
					title={'Cancel WLH ID Animal Details Update'}
					content={'You have not saved your changes. Are you sure you want to cancel?'}
				/>

				<AnimalDetailsDialog
					attr="region"
					open={updateRegion}
					close={() => {
						setUpdateRegion(false);
					}}
					title="Update Region for Multiple WLH IDs"
					acceptAction={() => {
						setUpdateRegion(false);
					}}
					options={regions}
				/>
				<AnimalDetailsDialog
					attr="sex"
					open={updateSex}
					close={() => {
						setUpdateSex(false);
					}}
					title="Update Sex for Multiple WLH IDs"
					acceptAction={() => {
						setUpdateSex(false);
					}}
					options={animal_sex}
				/>
			</Expandable.Detail>
		</Expandable>
	);
};

export default AnimalDetails;
