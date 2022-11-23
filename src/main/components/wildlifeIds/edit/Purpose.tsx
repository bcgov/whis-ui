import Expandable from "../../pageElements/Expandable";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, TextField, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {useState} from "react";

const Purpose = ({
	expansionEvent,
	handleUpdate,
	setRole,
	validRole,
	setPurpose,
	validPurposes,
	organization,
	setOrganization,
	validOrganization,
	role
}) => {

	//add requester dialog
	const [openAddRequester, setOpenAddRequester] = useState(false);
	const handleOpenAddRequester = () => {
		setOpenAddRequester(true);
	};
	const handleCloseAddRequester = () => {
		setOpenAddRequester(false);
	};


	return (
		<Expandable expansionEvent={expansionEvent}>
			<Expandable.Title>
				<span>
					<Typography sx={{fontSize: '18px', width: '90px'}}>Purpose</Typography>
				</span>
				<Box className='info' sx={{display: 'flex', alignItems: 'center'}}>
					<span>
						<Typography variant='body2'>
							Primary Purpose
						</Typography>
						<Typography variant='body1'>
							Herd Health
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Requester
						</Typography>
						<Typography variant='body1'>
							Sultana Majid
						</Typography>
					</span>
					<span>
						<Typography variant='body2'>
							Organization
						</Typography>
						<Typography variant='body1'>
							Organization 1
						</Typography>
					</span>
				</Box>
			</Expandable.Title>
			<Expandable.Detail>
				<Box sx={{width: '1091px', margin: '0 auto'}}>
					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '32px 0 21px 0'}}>WLH ID information</Typography>
					<TextField
						sx={{width: '529px'}}
						id='purpose1'
						select
						label='Primary Purpose'
						// value={purpose}
						onChange={(e) => {
							setPurpose(e.target.value);
						}}
					>
						{validPurposes.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>
					<TextField
						sx={{width: '529px', marginLeft: '32px'}}
						id='purpose2'
						select
						label='Secondary Purpose'
						// value={purpose}
						onChange={(e) => {
							setPurpose(e.target.value);
						}}
					>
						{validPurposes.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>

					<TextField
						sx={{minWidth: '1091px', marginTop: '32px'}}
						label='Associated Project'
						id='associatedProject'
						name='associatedProject'
						onChange={handleUpdate}
					/>
					<TextField
						sx={{minWidth: '1091px', marginTop: '32px'}}
						label='Project Details'
						id='projectDetails'
						name='projectDetails'
						multiline
						rows={3}
						onChange={handleUpdate}
					/>

					<Box className='requester'>
						<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '32px 0 21px 0'}}>
							Requester(1)
						</Typography>

						<Button variant={'outlined'} sx={{marginTop: '7px', width: '128px', height: '32px', fontSize: '14px', padding: '0', textTransform: 'capitalize'}}
										onClick={handleOpenAddRequester}
						>
							+ Add Requester
						</Button>
						<Dialog
							open={openAddRequester}
							onClose={handleCloseAddRequester}
							maxWidth={false}
							PaperProps={{
								sx: {width: '975px', maxHeight: '432px'}
							}}
						>
							<IconButton
								onClick={handleCloseAddRequester}
								sx={{
									position: 'absolute',
									right: 8,
									top: 8
								}}
							>
								<CloseIcon/>
							</IconButton>
							<DialogTitle sx={{fontSize: '18px', fontFamily: 'BCSans-Bold', padding: '59px 0 5px 31px'}}>Add Requester</DialogTitle>
							<DialogContent sx={{display: 'block', padding: ' 0 15px'}}>
								<TextField
									className='requesterFormInput'
									label='First Name'
									id='first_name'
									name='first_name'
									required
									onChange={handleUpdate}
								/>
								<TextField
									className='requesterFormInput'
									label='Last Name'
									id='last_name'
									name='last_name'
									required
									onChange={handleUpdate}
								/>
								<TextField
									className='requesterFormInput'
									id='organization-select'
									select
									label='Organization'
									value={organization}
									onChange={(e) => {
										setOrganization(e.target.value);
									}}
								>
									{validOrganization.map((m, i) => (
										<MenuItem key={i} value={m.value}>
											{m.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									className='requesterFormInput'
									id='role-select'
									select
									label='Role'
									value={role}
									onChange={(e) => {
										setRole(e.target.value);
									}}
								>
									{validRole.map((m, i) => (
										<MenuItem key={i} value={m.value}>
											{m.label}
										</MenuItem>
									))}
								</TextField>
								<TextField
									className='requesterFormInput'
									label='Phone Number'
									id='phone'
									name='phone'
									onChange={handleUpdate}
								/>
								<TextField
									className='requesterFormInput'
									label='Email'
									id='email'
									name='email'
									onChange={handleUpdate}
								/>
							</DialogContent>
							<DialogActions sx={{padding: '29px 32px 32px 0'}}>
								<Button variant={'contained'} onClick={handleCloseAddRequester} className='requesterFormBtn'>Add</Button>
								<Button variant={'outlined'} onClick={handleCloseAddRequester} className='requesterFormBtn' sx={{marginLeft: '11px'}}>Cancel</Button>
							</DialogActions>
						</Dialog>
					</Box>
				</Box>
				<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
					<Button
						variant={'contained'}
						className='update_btn'
					>
						Update
					</Button>
					<Button
						variant={'outlined'}
						className='update_btn'
					>
						Cancel
					</Button>
				</Box>
			</Expandable.Detail>
		</Expandable>
	);
}

export default Purpose;
