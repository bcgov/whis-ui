import Expandable from '../../pageElements/Expandable';
import {Box, Button, IconButton, InputAdornment, MenuItem, TextField, Tooltip, Typography} from '@mui/material';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import React, {useState} from 'react';
import '../../../styles/updateID.scss';
import {DataGrid, GridColDef, GridEditInputCell} from '@mui/x-data-grid';
import LightTooltip from './LightTooltip';

const AnimalDetails = ({expansionEvent}) => {
	const columns: GridColDef[] = [
		{field: 'id', headerName: 'WLH ID', width: 260, cellClassName: 'id_cell'},
		{field: 'species', headerName: 'Species', sortable: false, disableColumnMenu: true, width: 300},
		{
			field: 'home_region',
			sortable: false,
			disableColumnMenu: true,
			width: 300,
			cellClassName: 'region_cell',
			renderHeader: () => {
				return (
					<>
						<span>Home Region</span>
						<LightTooltip title="Edit Region of IDs">
							<IconButton onClick={() => {}}>
								<EditIcon color="primary" />
							</IconButton>
						</LightTooltip>
					</>
				);
			},
			renderCell: params => {
				return <TextField defaultValue={params.row.home_region} size="small" />;
			}
		},

		{
			field: 'sex',
			sortable: false,
			disableColumnMenu: true,
			width: 260,
			cellClassName: 'sex_cell',
			renderHeader: () => {
				return (
					<>
						<span>Sex</span>
						<LightTooltip title="Edit Sex of IDs">
							<IconButton onClick={() => {}}>
								<EditIcon color="primary" />
							</IconButton>
						</LightTooltip>
					</>
				);
			},
			renderCell: params => {
				return <TextField defaultValue={params.row.sex} size="small" />;
			}
		}
	];

	const rows = [
		{id: '22-00001', species: 'Moose', home_region: '', sex: 'Female'},
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
						sx={{width: '100%', marginTop: '50px'}}
						label="Type any keyword to find the species (The selected species will be applied to all of the WLH IDs)"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<AccountTreeOutlinedIcon />
								</InputAdornment>
							)
						}}
					/>
					<Box sx={{marginTop: '30px', height: '400px', width: '100%'}}>
						<DataGrid
							rows={rows}
							columns={columns}
							disableSelectionOnClick
							// autoHeight={true}
							hideFooter={true}
							onCellKeyDown={(params, events) => events.stopPropagation()}
						/>
					</Box>
				</Box>
				<Box className="cardButtons">
					<Button variant={'contained'} className="update_btn">
						Update
					</Button>
					<Button variant={'outlined'} className="update_btn">
						Cancel
					</Button>
				</Box>
			</Expandable.Detail>
		</Expandable>
	);
};

export default AnimalDetails;
