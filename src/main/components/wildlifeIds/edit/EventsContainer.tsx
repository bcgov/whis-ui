import React, {useEffect, useReducer, useState} from "react";
import EventDetails from "./EventDetails";
import {useSelector} from "../../../../state/utilities/use_selector";
import Loading from "../../util/Loading";
import _ from "lodash";
import {Button} from "@mui/material";

const EventsContainer = ({expansionEvent, wildlifeHealthId, applyChanges}) => {

	function buildInitialLocalState(seed) {
		function mapLocations(event) {
			return event.locations.map(e => {
				const m = {type: e.type};
				switch (e.type) {
				case 'POPULATION_UNIT':
					m['populationUnit'] = e.populationUnit?.id || '';
					break;
				case 'MANAGEMENT_UNIT':
					m['managementUnit'] = e.managementUnit?.id || '';
					break;
				case 'HERD_NAME':
					m['herdName'] = e.herdName || '';
					break;
				case 'COORDINATES':
					m['latitude'] = e.latitude || '';
					m['longitude'] = e.latitude || '';
					break;
				case 'UTM_COORDINATES':
					m['northing'] = e.northing || '';
					m['easting'] = e.easting || '';
					m['zone'] = e.zone || '';
					break;
				case 'CITY':
					m['city'] = e.city || '';
					break;
				case 'CIVIC_ADDRESS':
					m['city'] = e.city || '';
					m['civicAddress'] = e.civicAddress || '';
					break;
				case 'REGION':
					m['region'] = e.region?.id || '';
					break;
				}
				return m;
			});
		}

		// function mapSubmitter() {}

		return seed.events.map(e => ({
			type: e.type,
			ageClass: e.ageClass?.code || '',
			startDate: e.startDate,
			history: e.history,
			locations: mapLocations(e),
			submitter: e.submitter?.contactListEntry?.id || '',
			samples: {
				collected: e.samples?.collected || false,
				resultsReceived: e.samples?.resultsReceived || false,
				sentForTesting: e.samples?.sentForTesting || false
			},
			_local: {
				/* we track some original values for display */
				submitter: e.submitter,
				requester: wildlifeHealthId.requester,
				type: e.type,
				startDate: e.startDate
			}
		}));
	}

	function formReducerInit(seed) {
		return buildInitialLocalState(seed);
	}

	function formReducer(state, action) {
		let updatedState = [...state];

		switch (action.type) {
		case 'reset':
			updatedState = buildInitialLocalState(wildlifeHealthId);
			break;
		case 'fieldChange':
			_.set(updatedState, action.payload.field, action.payload.value);
			break;
		case 'events.add':
			updatedState.push({
				type: 'capture',
				ageClass: '',
				startDate: '',
				submitter: '',
				locations: [],
				samples: {
					collected: false,
					resultsReceived: false,
					sentForTesting: false
				},
				history: '',
				_local: {
					requester: wildlifeHealthId.requester,
					submitter: null,
					type: '',
					startDate: ''
				}
			});
			break;
		case 'locations.add':
			updatedState[action.payload.eventIndex].locations.push({
				type: '',
			});
			break;
		case 'locations.delete':
			updatedState[action.payload.eventIndex].locations.splice(action.payload.locationIndex, 1);
			break;
		case 'submitters.add':
			updatedState[action.payload.eventIndex].submitters.push(action.payload.submitter);
			break;
		case 'submitters.delete':
			updatedState[action.payload.eventIndex].submitters.splice(action.payload.submitterIndex, 1);
			break;
		}

		return updatedState;
	}

	const [localState, localDispatch] = useReducer(formReducer, wildlifeHealthId, formReducerInit);

	const [dirty, setDirty] = useState(false);

	useEffect(() => {
		const compareBasis = buildInitialLocalState(wildlifeHealthId);
		setDirty(!_.isEqual(compareBasis, localState));
	}, [wildlifeHealthId, localState]);

	return (
		<>

			{localState.map((event, i) => (
				<EventDetails
					key={`event-${event.id || i}`}
					dirty={dirty}
					expansionEvent={expansionEvent}
					event={event}
					index={i}
					formDispatch={localDispatch}
					applyChanges={() => {
						applyChanges('events', {
							events: localState.map(e => {
								const updated = _.cloneDeep(e);
								delete updated['_local'];
								return updated;
							})
						})
					}}
				/>
			))}

			<Button
				variant={'contained'}
				onClick={() => {
					localDispatch({
						type: 'events.add'
					});
				}}
			>
				+ Add New Event
			</Button>

		</>
	);
}

export default EventsContainer;
