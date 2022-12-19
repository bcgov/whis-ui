import React, { useEffect, useReducer, useState } from 'react';
import { Box, Button, IconButton, Typography } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import '../../../styles/updateID.scss';
import { useSelector } from "../../../../state/utilities/use_selector";
import { selectCodeTables } from "../../../../state/reducers/code_tables";
import { ExpansionOverrideEvent } from "../../pageElements/Expandable";
import Status from "./Status";
import Purpose from "./Purpose";
import AnimalDetails from "./AnimalDetails";
import { getDevMode } from "../../../../state/utilities/config_helper";
import Loading from "../../util/Loading";
import _ from 'lodash';
import { useDispatch } from "react-redux";
import { WILDLIFE_HEALTH_ID_PERSIST_REQUEST } from "../../../../state/actions";
import { useParams } from "react-router";
import Event from "./Event";
import AddEventConfirm from "../edit/AddEventConfirm";

const DetailForm = ({ wildlifeHealthId }) => {

    const devMode = useSelector(getDevMode);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [addEventConfirmationDialogOpen, setAddEventConfirmationDialogOpen] = useState(false);

    function resetState() {
        // return the state of the form to whatever was last received from the api
        // we could do fancier undo-tracking given the use of a reduce/dispatch pattern on this form if desired
        formDispatch({
            type: 'reset',
            payload: wildlifeHealthId
        });
    }

    function saveState() {
        // this is redux-store dispatch, not form-local dispatch
        dispatch({
            type: WILDLIFE_HEALTH_ID_PERSIST_REQUEST,
            payload: {
                id,
                state: formState
            }
        });
    }

    function formReducerInit(initialState) {
        return initialState;
    }

    function formReducer(state, action) {
        let updatedState = { ...state };

        switch (action.type) {
            case 'reset':
                updatedState = action.payload;
                break;
            case 'fieldChange':
                // for simple field changes
                _.set(updatedState, action.payload.field, action.payload.value);
                break;
            case 'status.statusChange':
                updatedState.status.dirty.status = action.payload;
                break;
            case 'status.promote':
                updatedState.status.history.push({
                    status: state.status.dirty.status,
                    reason: state.status.dirty.reason,
                    additionalAttributes: state.status.dirty.additionalAttributes,
                    changedAt: new Date()
                });
                updatedState.status.dirty = {
                    status: '',
                    reason: '',
                    additionalAttributes: {}
                };
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

    const [formState, formDispatch] = useReducer(formReducer, wildlifeHealthId, formReducerInit);

    const { tables, initialized: codeTablesInitialized } = useSelector(selectCodeTables);

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
        return <Loading />;
    }

    if (!(formState?.metadata?.wildlifeHealthId)) {
        return <Loading />;
    }

    return (
        <Box className='container'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                    <Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '32px' }}>WLH ID {formState.metadata.wildlifeHealthId}</Typography>
                    <Typography sx={{ marginBottom: '28px', fontSize: '16px', color: '#787f81' }}>View the WLH ID details and events.</Typography>
                </Box>
                <Box>
                    <Button variant={'contained'} sx={{ height: '41px', textTransform: 'capitalize', fontSize: '14px', marginRight: '8px' }}
                    // onClick={() => {
                    //     if (formState.events.length > 0) {
                    //         // confirmation is required
                    //         setAddEventConfirmationDialogOpen(true);
                    //     } else {
                    //         // just add it
                    //         formDispatch({
                    //             type: 'events.add'
                    //         })
                    //     }
                    // }}
                    >Update WLH ID</Button>
                    <IconButton>
                        <PrintIcon />
                    </IconButton>
                    <IconButton>
                        <DownloadIcon />
                    </IconButton>
                </Box>
            </Box>

            {/* <AddEventConfirm open={addEventConfirmationDialogOpen}
                cancelAction={() => {
                    setAddEventConfirmationDialogOpen(false);
                }}
                acceptAction={() => {
                    formDispatch({
                        type: 'events.add'
                    });
                    setAddEventConfirmationDialogOpen(false);
                }
                } /> */}


            {devMode && (<>
                <strong>Redux Store State</strong>
                <pre>
                    {JSON.stringify(wildlifeHealthId, null, 1)}
                </pre>
                <strong>Form Store State</strong>
                <pre>
                    {JSON.stringify(formState, null, 1)}
                </pre>
            </>)}

            <Status
                state={formState}
            />

            <Purpose
                state={formState}
            />

            <AnimalDetails
                state={formState}
            />

            <Event
                state={formState}
                dispatch={formDispatch}
                expansionEvent={expansionEvent}
            />

        </Box>
    );
}
    ;
export default DetailForm;
