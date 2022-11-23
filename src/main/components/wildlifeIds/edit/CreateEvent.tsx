import Expandable from "../../pageElements/Expandable";
import {
	Box, Button,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel, IconButton,
	InputAdornment,
	MenuItem, Paper,
	Radio,
	RadioGroup,
	Switch, Table, TableCell, TableContainer, TableHead, TableRow,
	TextField,
	Typography
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationEntry from "../LocationEntry";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {useState} from "react";

const CreateEvent = ({
	expansionEvent,
	eventType,
	setEventType,
	ageClass,
	validAgeClass,
	handleUpdate,
	locationOptions,
	handleSelectLocation,
	handleAddLocation,
	handleSubmitterChecked,
	submitterChecked,
	setAgeClass,
	handleOpenEditRequester,
	handleDeleteConfirmation,
	handleOpenAddRequester
}) => {


	const [checked1, setSamplesChecked1] = useState(false);
	const [checked2, setSamplesChecked2] = useState(false);
	const [checked3, setSamplesChecked3] = useState(false);

	//Samples Checked
	const toggleChecked1 = () => {
		setSamplesChecked1((prev) => !prev);
	};
	const toggleChecked2 = () => {
		setSamplesChecked2((prev) => !prev);
	};
	const toggleChecked3 = () => {
		setSamplesChecked3((prev) => !prev);
	};

	return (
		<Expandable expansionEvent={expansionEvent}>
			<Expandable.Title>
				<span>
					<Typography sx={{fontSize: '18px', width: '90px'}}>New Event</Typography>
				</span>
			</Expandable.Title>
			<Expandable.Detail>
				<Box sx={{width: '1091px', margin: '0 auto'}}>
					<FormControl sx={{width: '380px', marginTop: '62px'}}>
						<FormLabel>Event Type</FormLabel>
						<RadioGroup
							row
							aria-labelledby='demo-controlled-radio-buttons-group'
							name='controlled-radio-buttons-group'
							value={eventType}
							onChange={(e) => {
								setEventType(e.target.value);
							}}
						>
							<FormControlLabel value='capture' control={<Radio/>} label='Capture'/>
							<FormControlLabel value='mortality' control={<Radio/>} label='Mortality'/>
							<FormControlLabel value='recapture' control={<Radio/>} label='Recapture'/>
							<FormControlLabel value='release' control={<Radio/>} label='Release'/>
						</RadioGroup>
					</FormControl>

					<TextField
						sx={{width: '529px', marginTop: '24px'}}
						id='ageClass'
						select
						label='Age Class'
						value={ageClass}
						onChange={(e) => {
							setAgeClass(e.target.value);
						}}
					>
						{validAgeClass.map((m, i) => (
							<MenuItem key={i} value={m.value}>
								{m.label}
							</MenuItem>
						))}
					</TextField>

					<Box sx={{width: 'inherit', display: 'flex', flexDirection: 'row', marginTop: '24px'}}>
						<TextField
							sx={{width: '529px'}}
							label='Event Start Date(DD-MM-YYYY)'
							id='start_date'
							name='start_date'
							onChange={handleUpdate}
							InputProps={{
								endAdornment: <InputAdornment position='end'><CalendarTodayIcon/></InputAdornment>,
							}}
						/>
						<TextField
							sx={{width: '529px', marginLeft: '32px'}}
							label='Event End Date(DD-MM-YYYY)'
							id='end_date'
							name='end_date'
							onChange={handleUpdate}
							InputProps={{
								endAdornment: <InputAdornment position='end'><CalendarTodayIcon/></InputAdornment>,
							}}
						/>
					</Box>

					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '49px 0 0 0'}}>Location</Typography>
					{locationOptions.map((locationOption, index) => (
						<div>
							<Box sx={{display: 'flex', flexDirection: 'column'}} key={index}>
								<LocationEntry
									key={index}
									handleUpdate={(e) => {
										handleSelectLocation(index, e);
										handleAddLocation(index);
									}}
									handleDelete={() => {
										console.log("delete");
									}}
								/>
							</Box>
						</div>
					))}

					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '100px 0 0 0'}}>Submitter</Typography>
					<FormGroup sx={{display: 'flex', flexDirection: 'row', alignItems: 'baseline'}}>
						<Typography sx={{fontSize: '16px', margin: '16px 50px 20px 0', color: '#868e96'}}>Is submitter same as the requester?</Typography>
						<FormControlLabel control={<Switch onClick={handleSubmitterChecked}/>} label={`${submitterChecked ? 'Yes' : 'No'}`}/>
					</FormGroup>

					<TableContainer component={Paper} sx={{display: submitterChecked ? 'auto' : 'none'}}>
						<Table>
							<TableHead>
								<TableRow className='tablehead'>
									<TableCell>Name</TableCell>
									<TableCell>Family</TableCell>
									<TableCell>Region</TableCell>
									<TableCell>Organization</TableCell>
									<TableCell>Role</TableCell>
									<TableCell>Phone</TableCell>
									<TableCell>Email</TableCell>
									<TableCell>Action</TableCell>

								</TableRow>
							</TableHead>
							<TableHead>
								<TableRow>
									<TableCell>Sultana</TableCell>
									<TableCell>Majid</TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
									<TableCell>
										<IconButton onClick={handleOpenEditRequester}>
											<EditIcon color='primary'/>
										</IconButton>
										<IconButton onClick={handleDeleteConfirmation}>
											<DeleteIcon color='primary'/>
										</IconButton>
									</TableCell>
								</TableRow>
							</TableHead>
						</Table>
					</TableContainer>

					<Button variant={'outlined'} sx={{
						width: '128px',
						height: '32px',
						fontSize: '14px',
						padding: '0',
						textTransform: 'capitalize',
						display: submitterChecked ? 'none' : 'auto'
					}}
					onClick={handleOpenAddRequester}
					>
						+ Add Submitter
					</Button>

					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '18px', margin: '35px 0 16px 0'}}>Samples</Typography>

					<FormGroup sx={{width: '400px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
						<Typography variant='body1' sx={{color: '#868e96'}}>Samples Were Collected?</Typography>
						<FormControlLabel control={<Switch onChange={toggleChecked1}/>} label={`${checked1 ? 'Yes' : 'No'}`}/>
						<Typography variant='body1' sx={{color: '#868e96'}}>Samples Sent for Testing?</Typography>
						<FormControlLabel control={<Switch onChange={toggleChecked2}/>} label={`${checked2 ? 'Yes' : 'No'}`}/>
						<Typography variant='body1' sx={{color: '#868e96'}}>Test Results Received?</Typography>
						<FormControlLabel control={<Switch onChange={toggleChecked3}/>} label={`${checked3 ? 'Yes' : 'No'}`}/>
					</FormGroup>

					<TextField
						sx={{width: '1079px', marginTop: '29px'}}
						label='History (Max 500 Characters)'
						id='history'
						name='history'
						multiline
						rows={5}
						onChange={handleUpdate}
						inputProps={{maxLength: 500}}
					/>
				</Box>
				<Box sx={{display: 'flex', justifyContent: 'flex-end', margin: '48px 94px 48px 0'}}>
					<Button
						variant={'contained'}
						className='update_btn'
					>
						Save
					</Button>
					<Button
						variant={'outlined'}
						className='update_btn'
					>
						Add New Event
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

export default CreateEvent;
