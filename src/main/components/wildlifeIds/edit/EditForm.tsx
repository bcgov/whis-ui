import React, {useEffect, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import '../../../styles/updateID.scss';
import {useSelector} from "../../../../state/utilities/use_selector";
import {selectCodeTables} from "../../../../state/reducers/code_tables";
import {ExpansionOverrideEvent} from "../../pageElements/Expandable";
import Status from "./Status";
import CreateEvent from "./CreateEvent";
import Purpose from "./Purpose";
import AnimalDetails from "./AnimalDetails";
import EventDetails from "./EventDetails";


const EditForm = ({wildlifeId}) => {

	const [validPurposes, setValidPurposes] = useState([]);
	const [validSex, setValidSex] = useState([]);
	const [validAgeClass, setValidAgeClass] = useState([]);
	const [validSingleIdStatus, setValidSingleIdStatus] = useState([]);
	const [validOrganization, setValidOrganization] = useState([]);

	//@todo codetable this
	const validRole = [
		{value: 'HUNTER', label: 'Hunter'},
		{value: 'TRAPPER', label: 'Trapper'},
		{value: 'CONSERVATION_OFFICER', label: 'Conservation Officer'},
		{value: 'WILDLIFE_BIOLOGIST', label: 'Wildlife Biologist'},
		{value: 'PUBLIC', label: 'Public'},
		{value: 'OTHER', label: 'Other'}
	];

	function codeToSelect(table: string): { label: string, value: string }[] {
		return tables[table].codes.map(c => ({
			value: c.value,
			label: c.displayed_value
		}));
	}

	const {tables, initialized: codeTablesInitialized} = useSelector(selectCodeTables);
	useEffect(() => {
		if (!codeTablesInitialized) {
			return;
		}
		setValidAgeClass(codeToSelect('animal_age'));
		setValidSex(codeToSelect('animal_gender'))
		setValidPurposes(codeToSelect('wlh_id_purpose'));
		setValidOrganization(codeToSelect('organizations'));
		setValidSingleIdStatus(codeToSelect('status'));

	}, [tables, codeTablesInitialized]);

	const [formState, setFormState] = useState({
		quantity: 1,
		year: '2022',
		purpose: 'UNKNOWN',
		species: '',
		identifier: '+ Add Identifier Types',
		other_identifier: '',
		organization: '',
		requesterRegion: '',
		associatedProject: '',
		reason: '',
		location: '+ Add Location'
	});
	const [organization, setOrganization] = useState('');
	const [role, setRole] = useState('');
	const [purpose, setPurpose] = useState(formState.purpose);
	const [sex, setSex] = useState('');
	const [ageClass, setAgeClass] = useState('');
	const [eventType, setEventType] = useState('');
	const [identifierOptions, setIdentifierOption] = useState([
		{value: '', label: ''},
	]);
	const [locationOptions, setLocationOption] = useState([
		{value: '', label: ''},
	]);

	const [expansionEvent, setExpansionEvent] = useState<ExpansionOverrideEvent>({
		event: 'none',
		id: 0
	});

	const handleSubmit = (e) => {

	}
	const handleUpdate = (e) => {

	}


	//Add new event
	const [newEvent, setNewEvent] = useState(false);
	const handleNewEvent = () => {
		setNewEvent(true);
	};

	//Submitter Checked
	const [submitterChecked, setSubmitterChecked] = useState(false);
	const handleSubmitterChecked = () => {
		setSubmitterChecked(!submitterChecked);
	};

	//edit requester dialog
	const [openEditRequester, setOpenEditRequester] = useState(false);
	const handleOpenEditRequester = () => {
		setOpenEditRequester(true);
	};
	const handleCloseEditRequester = () => {
		setOpenEditRequester(false);
	};

	//requester delete confirmation
	const [DeleteConfirmation, setDeleteConfirmation] = useState(false);
	const handleDeleteConfirmation = () => {
		setDeleteConfirmation(true);
	};
	const handleCloseDeleteConfirmation = () => {
		setDeleteConfirmation(false);
	};

	//handle identifier options
	const handleSelectIdentifier = (index, e) => {
		const values = [...identifierOptions];
		values[index][e.target.value] = e.target.value;
		setIdentifierOption(values);
	}
	const handleAddIdentifier = (index) => {
		if (index === (identifierOptions.length - 1)) {
			setIdentifierOption([...identifierOptions, {value: '', label: ''}])
		}
	}

	//handle location options
	const handleSelectLocation = (index, e) => {
		const values = [...locationOptions];
		values[index][e.target.value] = e.target.value;
		setLocationOption(values);
	}
	const handleAddLocation = (index) => {
		if (index === (locationOptions.length - 1)) {
			setLocationOption([...locationOptions, {value: '', label: ''}])
		}
	}


	return (
		<Box className='container'>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Box>
					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '32px'}}>WLH ID [Number]</Typography>
					<Typography sx={{marginBottom: '28px', fontSize: '16px', color: '#787f81'}}>Update the WLH ID details and events.</Typography>
				</Box>

				<Button variant={'contained'} sx={{height: '41px', textTransform: 'capitalize', fontSize: '14px', marginRight: '8px'}} onClick={handleNewEvent}>+ Add
					New Event</Button>
			</Box>

			<Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '70px', margin: '70px 8px 0 0'}}>
				<Button variant='outlined' className='expand_btn' onClick={() => {
					setExpansionEvent({event: 'expandAll', id: expansionEvent.id + 1});
				}}>Expand All</Button>
				<Button variant='outlined' className='expand_btn' onClick={() => {
					setExpansionEvent({event: 'collapseAll', id: expansionEvent.id + 1});
				}
				} sx={{marginLeft: '8px'}}>Collapse All</Button>
			</Box>


			<Status expansionEvent={expansionEvent}/>

			<Purpose
				expansionEvent={expansionEvent}
				handleUpdate={handleUpdate}
				setRole={setRole}
				validRole={validRole}
				setPurpose={setPurpose}
				validPurposes={validPurposes}
				organization={organization}
				setOrganization={setOrganization}
				validOrganization={validOrganization}
				role={role}
			/>
			<AnimalDetails
				expansionEvent={expansionEvent}
				handleUpdate={handleUpdate}
				sex={sex}
				setSex={setSex}
				validSex={validSex}
				identifierOptions={identifierOptions}
				handleSelectIdentifier={handleSelectIdentifier}
				handleAddIdentifier={handleAddIdentifier}
			/>

			<EventDetails
				expansionEvent={expansionEvent}
				eventType={eventType}
				setEventType={setEventType}
				ageClass={ageClass}
				validAgeClass={validAgeClass}
				handleUpdate={handleUpdate}
				locationOptions={locationOptions}
				handleSelectLocation={handleSelectLocation}
				handleAddLocation={handleAddLocation}
				handleSubmitterChecked={handleSubmitterChecked}
				submitterChecked={submitterChecked}
				setAgeClass={setAgeClass}
				handleOpenEditRequester={handleOpenEditRequester}
				handleDeleteConfirmation={handleDeleteConfirmation}
				handleOpenAddRequester={handleOpenEditRequester}
				handleCloseDeleteConfirmation={handleCloseDeleteConfirmation}
				handleCloseEditRequester={handleCloseEditRequester}
				openEditRequester={openEditRequester}
				handleNewEvent={handleNewEvent}
				DeleteConfirmation={DeleteConfirmation}
			/>
			{newEvent &&
				<CreateEvent
					expansionEvent={expansionEvent}
					eventType={eventType}
					setEventType={setEventType}
					ageClass={ageClass}
					validAgeClass={validAgeClass}
					handleUpdate={handleUpdate}
					locationOptions={locationOptions}
					handleSelectLocation={handleSelectLocation}
					handleAddLocation={handleAddLocation}
					handleSubmitterChecked={handleSubmitterChecked}
					submitterChecked={submitterChecked}
					setAgeClass={setAgeClass}
					handleOpenEditRequester={handleOpenEditRequester}
					handleDeleteConfirmation={handleDeleteConfirmation}
					handleOpenAddRequester={handleOpenEditRequester}
				/>}

		</Box>
	);
};
export default EditForm;
