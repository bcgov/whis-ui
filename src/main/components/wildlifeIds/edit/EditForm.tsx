import React, {useEffect, useReducer, useState} from 'react';
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
import {getDevMode} from "../../../../state/utilities/config_helper";
import useCodeTable from "../../../hooks/useCodeTable";
import Loading from "../../util/Loading";
import _ from 'lodash';

const EditForm = ({wildlifeHealthId}) => {

	const devMode = useSelector(getDevMode);

	function formReducerInit(initialState) {
		return {
			status: {
				status: 'RETIRED'
			},
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
			location: '+ Add Location',
			"animalDetails": {
				"species": {
					"displayName": "Deer",
					"id": -1
				},
				"homeRegion": {
					"id": -1,
					"displayName": "Region1"
				},
				"sex": "male",
				"identifiers": [
					{
						"id": -1,
						"type": "NICKNAME",
						"identifier": "APLSADF",
						"additionalAttributes": {}
					}
				]
			}
		}
	}

	function formReducer(state, action) {
		const updatedState = {...state};

		switch (action.type) {
		case 'fieldChange':
			// for simple field changes
			_.set(updatedState, action.payload.field, action.payload.value);
			return updatedState;
		case 'status.statusChange':
			updatedState.status.status = action.payload;
			break;
		case 'animalDetails.identifiers.typeChange':
			updatedState.animalDetails.identifiers[action.payload.index].type = action.payload.newType;
			break;
		case 'animalDetails.identifiers.valueChange':
			updatedState.animalDetails.identifiers[action.payload.index].identifier = action.payload.newValue;
			break;
		case 'animalDetails.identifiers.additionalAttributesChange':
			// some types of identifier (eg. ear tags have additional attributes beyond identifier)
			updatedState.animalDetails.identifiers[action.payload.index].additionalAttributes = action.payload.newAttributes;
			break;
		case 'animalDetails.identifiers.delete':
			updatedState.animalDetails.identifiers.splice(action.payload.index, 1);
			break;
		case 'animalDetails.identifiers.add':
			updatedState.animalDetails.identifiers.push({
				type: '',
				identifier: '',
				additionalAttributes: {}
			});
			break;
		}

		return updatedState;
	}

	const [formState, formDispatch] = useReducer(formReducer, null, formReducerInit);

	const {mappedCodes: validPurposes} = useCodeTable('wlh_id_purpose');
	const [validAgeClass, setValidAgeClass] = useState([]);
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

	const {tables, initialized: codeTablesInitialized} = useSelector(selectCodeTables);

	useEffect(() => {
		if (!codeTablesInitialized) {
			return;
		}


	}, [tables, codeTablesInitialized]);


	const [organization, setOrganization] = useState('');
	const [role, setRole] = useState('');
	const [purpose, setPurpose] = useState(formState.purpose);
	const [ageClass, setAgeClass] = useState('');
	const [eventType, setEventType] = useState('');

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


	if (!codeTablesInitialized) {
		return <Loading/>;
	}

	return (
		<Box className='container'>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Box>
					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '32px'}}>WLH ID [Number]</Typography>
					<Typography sx={{marginBottom: '28px', fontSize: '16px', color: '#787f81'}}>Update the WLH ID details and events.</Typography>
				</Box>

				<Button variant={'contained'} sx={{height: '41px', textTransform: 'capitalize', fontSize: '14px', marginRight: '8px'}} onClick={handleNewEvent}>+ Add
					New
					Event</Button>
			</Box>

			<Box sx={{display: 'flex', justifyContent: 'flex-end', marginTop: '70px', margin: '70px 8px 0 0'}}>
				<Button
					variant='outlined' className='expand_btn' onClick={() => {
					setExpansionEvent({event: 'expandAll', id: expansionEvent.id + 1});
				}}
				>Expand All</Button>
				<Button
					variant='outlined' className='expand_btn' onClick={() => {
					setExpansionEvent({event: 'collapseAll', id: expansionEvent.id + 1});
				}
				} sx={{marginLeft: '8px'}}
				>Collapse All</Button>
			</Box>


			{devMode && (<>
				<strong>Redux Store State</strong>
				<pre>
					{JSON.stringify(wildlifeHealthId, '\t', 1)}
				</pre>
				<strong>Form Store State</strong>
				<pre>
					{JSON.stringify(formState, '\t', 1)}
				</pre>
			</>)}

			<Status expansionEvent={expansionEvent} dispatch={formDispatch} state={formState}/>

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
				dispatch={formDispatch}
				state={formState}
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
