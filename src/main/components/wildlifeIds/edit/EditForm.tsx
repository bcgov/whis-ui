import React, {useEffect, useReducer, useState} from 'react';
import {Box, Button, Typography} from "@mui/material";
import '../../../styles/updateID.scss';
import {useSelector} from "../../../../state/utilities/use_selector";
import {selectCodeTables} from "../../../../state/reducers/code_tables";
import {ExpansionOverrideEvent} from "../../pageElements/Expandable";
import Status from "./Status";
import Purpose from "./Purpose";
import AnimalDetails from "./AnimalDetails";
import {getDevMode} from "../../../../state/utilities/config_helper";
import Loading from "../../util/Loading";
import _ from 'lodash';
import EventsContainer from "./EventsContainer";

const EditForm = ({wildlifeHealthId}) => {

	const devMode = useSelector(getDevMode);

	function formReducerInit(initialState) {
		return {
			"metadata": {
				"year": "2022",
				"id": 2041,
				"wildlifeHealthId": "22-0002",
				"generationDate": "2021-12-01",
				"creator": {
					"name": "Sample Creator",
				},
				"status": "Unassigned",
			},
			"status": {
				"history": [
					{
						"status": "Assigned",
						"reason": "Sent to field",
						"date": "2022-04-01",
						"additionalAttributes": {}
					},
					{
						"status": "Unassigned",
						"reason": "Newly generated",
						"date": "2022-01-01",
						"additionalAttributes": {}
					}
				],
				"status": "RETIRED",
				"reason": "Not in use",
				"additionalAttributes": {
					"recaptureKitsReturned": false
				}
			},
			"purpose":
					{
						"primaryPurpose": "HERD_HEALTH",
						"secondaryPurpose": "TARGETED",
						"associatedProject": "Sample project",
						"projectDetails":
							"Sample detail text",
						"requester":
							{
								"region": "THOMPSON",
								"firstName": "Sample",
								"lastName": "Persion",
								"organization": "ORGANIZATION2",
								"role": "TRAPPER",
								"phoneNumber": "5551234",
								"email": "test@email"
							}
					}
			,
			"animalDetails":
					{
						"species": "Deer",
						"homeRegion": "THOMPSON",
						"sex":
							"male",
						"identifiers":
							[
								{
									"id": -1,
									"type": "NICKNAME",
									"identifier": "Steve",
									"additionalAttributes": {}
								}
							]
					}
			,
			"events":
					[
						{
							"type": "capture",
							"ageClass": "juvenile",
							"startDate": null,
							"endDate": null,
							"submitter": null,
							"locations": [
								{
									"type": "HERD_NAME",
									"attributes": {
										"herdName": "Sample Herd"
									}
								}
							],
							"additionalAttributes": {},
							"history": "Sample history entry"
						}
					]
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
		case 'events.copyFromRequester':
			_.set(updatedState, action.payload.destinationField, state.purpose.requester);
			break;
		case 'events.add':
			updatedState.events.push(
				{
					"type": 'capture',
					"ageClass": '',
					"startDate": '',
					"endDate": '',
					"submitter": null,
					"locations": [],
					"additionalAttributes": {},
					"history": ''
				}
			);
			break;
		case 'locations.add':
			updatedState.events[action.payload.eventIndex].locations.push({
				"type": '',
				"attributes": {}
			});
			break;
		case 'locations.delete':
			updatedState.events[action.payload.eventIndex].locations.splice(action.payload.locationIndex, 1);
			break;
		}

		return updatedState;
	}

	const [formState, formDispatch] = useReducer(formReducer, null, formReducerInit);

	const {tables, initialized: codeTablesInitialized} = useSelector(selectCodeTables);

	useEffect(() => {
		if (!codeTablesInitialized) {
			return;
		}
	}, [tables, codeTablesInitialized]);


	const [expansionEvent, setExpansionEvent] = useState<ExpansionOverrideEvent>({
		event: 'none',
		id: 0
	});

	if (!codeTablesInitialized) {
		return <Loading/>;
	}

	return (
		<Box className='container'>
			<Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
				<Box>
					<Typography fontFamily={'BCSans-Bold'} sx={{fontSize: '32px'}}>WLH ID {formState.metadata.wildlifeHealthId}</Typography>
					<Typography sx={{marginBottom: '28px', fontSize: '16px', color: '#787f81'}}>Update the WLH ID details and events.</Typography>
				</Box>

				<Button variant={'contained'} sx={{height: '41px', textTransform: 'capitalize', fontSize: '14px', marginRight: '8px'}} onClick={() => {
					formDispatch({
						type: 'events.add'
					})
				}
				}>+ Add
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

			<Status expansionEvent={expansionEvent}
				dispatch={formDispatch}
				state={formState}/>

			<Purpose
				expansionEvent={expansionEvent}
				dispatch={formDispatch}
				state={formState}
			/>

			<AnimalDetails
				expansionEvent={expansionEvent}
				dispatch={formDispatch}
				state={formState}
			/>

			<EventsContainer
				state={formState}
				dispatch={formDispatch}
				expansionEvent={expansionEvent}
			/>

		</Box>
	);
}
;
export default EditForm;
