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


    const [identifier, setIdentifier] = useState('+ Add Identifier Types');
    const [earTag, setEarTag] = useState('');
    const [sex, setSex] = useState('');


    function renderDetailed() {
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
                    <Box sx={{ display: 'flex', width: '55%' }}>
                        <TextField
                            sx={{ m: 2, width: '80%' }}
                            label="Identifier"
                            id="identifier"
                            name="identifier"
                        />
                        <IconButton sx={{ width: '20%' }}>
                            <DeleteIcon color='primary' />
                        </IconButton>
                    </Box>
                );
                break;
            case "EAR_TAG":
            case "RAPP_TAG":
                return (<Box sx={{ display: 'flex', width: '55%' }}>
                    <TextField
                        sx={{ m: 2, width: '30%' }}
                        label="Identifier"
                        id="identifier"
                        name="identifier"
                    />
                    <TextField sx={{ m: 2, width: '30%' }}
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
                        sx={{ width: '20%' }}
                        name="controlled-radio-buttons-group"
                        value={earTag}
                        onChange={(e) => {
                            setEarTag(e.target.value);
                        }}
                    >
                        <FormControlLabel value="left" control={<Radio />} label="Left" />
                        <FormControlLabel value="right" control={<Radio />} label="Right" />
                    </RadioGroup>
                    <IconButton sx={{ width: '20%' }}>
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