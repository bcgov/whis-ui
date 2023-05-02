import {Dialog, DialogContent, Typography, Autocomplete, TextField, IconButton, DialogActions, Button, Stack} from '@mui/material';
import React, {useState} from 'react';
import LightTooltip from '../editMultiple/LightTooltip';
import FlagIcon from '@mui/icons-material/Flag';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

const DeflagDialog = ({open, close}) => {
	const [flagR, setFlagR] = useState(false);

	const fakeIDs = [
		{id: '23-00001'},
		{id: '23-00010'},
		{id: '23-00023'},
		{id: '23-00022'},
		{id: '23-00066'},
		{id: '22-00022'},
		{id: '22-00077'},
		{id: '22-00055'},
		{id: '22-00044'},
		{id: '22-00033'}
	];

	function isFlag() {
		if (flagR) {
			return (
				<TextField className="correctIdNumber" id="correctIdNumber" name="correctIdNumber" label="Correct WLH ID Number" defaultValue="PENDING" disabled />
			);
		} else {
			return (
				<Autocomplete
					freeSolo
					options={fakeIDs.map(option => option.id)}
					renderInput={params => (
						<TextField
							{...params}
							className="correctIdNumber"
							id="correctIdNumber"
							name="correctIdNumber"
							label="Correct WLH ID Number"
							// value={state.status.dirty.additionalAttributes.correctIdNumber || ''}
							// onChange={e => {
							// 	dispatch({
							// 		type: 'fieldChange',
							// 		payload: {
							// 			field: 'status.dirty.additionalAttributes.correctIdNumber',
							// 			value: e.target.value
							// 		}
							// 	});
							// }}
							// helperText={'Please enter the correct WLH ID below.'}
							required
						/>
					)}
				/>
			);
		}
	}

	return (
		<Dialog open={open} onClose={close} className='deflagDialog'>
			<DialogContent>
				<Typography>Please deflag for entering the Correct WL ID below</Typography>
				<Stack flexDirection={'row'}>
					{isFlag()}
					<LightTooltip title="Flag it if the ID is not available as a to do list for the future">
						<IconButton
							onClick={() => {
								setFlagR(!flagR);
							}}
							className="flagIcon"
						>
							{flagR && <FlagIcon sx={{fontSize: '40px', color: '#d8292f'}} />}
							{flagR || <FlagOutlinedIcon sx={{fontSize: '40px'}} />}
						</IconButton>
					</LightTooltip>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button variant="contained" onClick={close}>
					Save
				</Button>
				<Button variant="outlined" onClick={close}>
					Cancel
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeflagDialog;
