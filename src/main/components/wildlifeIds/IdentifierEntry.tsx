import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, FormControlLabel, IconButton, Radio, RadioGroup, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const IdentifierEntry = ({ handleUpdate, handleDelete }) => {

    const validIdentifier = [
        { value: '+ Add Identifier Types', label: '+ Add Identifier Types' },
        { value: 'ANIMAL_ID', label: 'Alternate Animal ID' },
        { value: 'COMPULSORY', label: 'Compulsory Inspection Number' },
        { value: 'EAR_TAG', label: 'Ear Tag Number' },
        { value: 'HUMAN_WILDLIFE', label: 'Human Wildlife Conflict Number' },
        { value: 'COORS', label: 'COORS Number' },
        { value: 'LEG_BAND', label: 'Leg Band' },
        { value: 'MICROCHIP', label: 'Microchip' },
        { value: 'NICKNAME', label: 'Nickname' },
        { value: 'PIT_TAG', label: 'Pit Tag' },
        { value: 'RAPP_TAG', label: 'RAPP Ear Tag' },
        { value: 'RECAPTURE_ID', label: 'Recapture ID' },
        { value: 'CWD', label: 'CWD Ear Card' },
        { value: 'VAGINAL', label: 'Vaginal Implant Transmitter' },
        { value: 'WING_BAND', label: 'Wing Band' },
        { value: 'COLOR_ID', label: 'Color ID' }
    ];
    const validSex = [
        { value: 'FEMALE', label: 'Female' },
        { value: 'MALE', label: 'Male' },
        { value: 'UNKNOW', label: 'Unknown' }
    ];

    const [data, setData] = useState({
        entryType: 'TYPE_A',
        detailed: defaultValuesForEntryType('TYPE_A')
    });


    const [identifier, setIdentifier] = useState('+ Add Identifier Types');
    const [earTag, setEarTag] = useState('');
    const [sex, setSex] = useState('');

    useEffect(() => {
        console.log('updating parent component with our new data');
        // handleUpdate(identifier);
    }, [identifier]);


    function defaultValuesForEntryType(entryType) {
        switch (entryType) {
            case 'TYPE_A':
                return { checkboxIsChecked: false }
            case 'TYPE_B':
                return { textA: 'Sample', textB: 'Another Sample' }
            case 'TYPE_C':
                return { selected: 'b', inventoryCount: 1 }
            default:
                return {}
        }
    }

    function changeEntryType(event) {
        setData({
            ...data,
            entryType: event.target.value, // set entry type to whatever the select has select now.
            detailed: defaultValuesForEntryType(event.target.value)
        });
    }

    function renderDetailed() {
        // this is what chooses how to render data. you can write them here, or use subcomponents for better clarity.

        switch (identifier) {
            case "ANIMAL_ID":
            case "COMPULSORY":
            case "HUMAN_WILDLIFE":
            case "COORS":
            case "LEG_BAND":
            case "MICROCHIP":
            case "NICKNAME":
            case "PIT_TAG":
            case "RECAPTURE_ID":
            case "CWD":
            case "VAGINAL":
            case "WING_BAND":
            case "COLOR_ID":
                return (
                    <Box sx={{ display: 'flex' }}>
                        <TextField
                            sx={{ m: 2, width: '40%' }}
                            label="Identifier"
                            id="identifier"
                            name="identifier"
                        />
                        <IconButton sx={{ width: '20%' }}>
                            <DeleteIcon color='primary' />
                        </IconButton>
                        {/* <input type={"checkbox"} checked={data.detailed.checkboxIsChecked} onChange={(event) => {
                        setData({ ...data, detailed: { ...data.detailed, checkboxIsChecked: event.target.checked } })
                    }} /> */}
                    </Box>
                );
                break;
            case "EAR_TAG":
            case "RAPP_TAG":
                return (<Box sx={{ display: 'flex' }}>
                    <TextField
                        sx={{ m: 2, width: '30%' }}
                        label="Identifier"
                        id="identifier"
                        name="identifier"
                    />
                    <TextField sx={{ m: 2, width: '20%' }}
                        id="sex"
                        select
                        label="Color"
                        value={sex}
                        onChange={(e) => {
                            setSex(e.target.value);
                        }}
                    >
                        {validSex.map((m, i) => (
                            <MenuItem key={i} value={m.value}>
                                {m.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <RadioGroup
                        name="controlled-radio-buttons-group"
                        value={earTag}
                        onChange={(e) => {
                            setEarTag(e.target.value);
                        }}
                    >
                        <FormControlLabel value="left" control={<Radio />} label="Left" />
                        <FormControlLabel value="right" control={<Radio />} label="Right" />
                    </RadioGroup>
                    <IconButton sx={{ width: '15%' }}>
                        <DeleteIcon color='primary' />
                    </IconButton>
                </Box>);
                break;
            default:
                return (<></>);
        }
    }

    return (
        <>
            {/* <select onChange={changeEntryType}>
                <option value={"TYPE_A"}>Type A</option>
                <option value={"TYPE_B"}>Type B</option>
                <option value={"TYPE_C"}>Type C</option>
            </select> */}
            <Box sx={{ display: 'flex', width: '100%' }}>
                <TextField sx={{ m: 2, width: '40%' }}
                    id="identifier"
                    name="identifier"
                    select
                    defaultValue={"+ Add Identifier Types"}
                    onChange={(e) => {
                        setIdentifier(e.target.value);
                        handleUpdate(e);
                    }}
                >
                    {validIdentifier.map((m, i) => (
                        <MenuItem key={i} value={m.value}>
                            {m.label}
                        </MenuItem>
                    ))}
                </TextField>
                {
                    renderDetailed()
                }
            </Box>
        </>
    );
};

export default IdentifierEntry;