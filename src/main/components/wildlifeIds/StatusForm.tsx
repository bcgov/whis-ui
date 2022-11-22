import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, Grid, IconButton, MenuItem, Switch, TextField, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import '../../styles/updateID.scss';

import CloseIcon from '@mui/icons-material/Close';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import FlagIcon from '@mui/icons-material/Flag';
import { margin } from "@mui/system";

const handleSubmit = (e) => {
    console.log(e.target.value);
}
const handleUpdate = (e) => {

}


const StatusForm = ({ handleUpdate, IdStatus }) => {

    //Retired Checked
    const [recaptureReturned, setRecaptureReturned] = useState(false);
    const [recaptureStatus, setRecaptureStatus] = useState(false);

    const isRecaptureReturned = () => {
        setRecaptureReturned(!recaptureReturned);
    };
    const handleRecaptureStatus = () => {
        setRecaptureStatus(!recaptureStatus);
    };

    //correct WLH ID number dialog
    const [IdConfirmation, setIdConfirmation] = useState(false);
    const handleIdConfirmation = () => {
        setIdConfirmation(true);
    };
    const handleCloseIdConfirmation = () => {
        setIdConfirmation(false);
    };

    const [isAvailable, setisAvailable] = useState(false);
    const handleFlag = () => {
        setisAvailable(!isAvailable);
    }

    const isFlagChecked = () => {
        if (isAvailable) {
            return (
                <FlagIcon sx={{ fontSize: '40px', color: '#d8292f' }} />
            )
        } else {
            return (
                <FlagOutlinedIcon sx={{ fontSize: '40px' }} />
            )
        }
    }




    const validSingleIdStatus = [
        { value: 'ASSIGNED', label: 'Assigned' },
        { value: 'RETIRED', label: 'Retired' },
        { value: 'UNASSIGNED', label: 'Unassigned' }
    ];

    const [status, setStatus] = useState(IdStatus);

    function renderDetailed() {
        switch (status) {
            case 'ASSIGNED':
            case 'UNASSIGNED':
                return (
                    <TextField
                        sx={{ minWidth: '1091px', marginTop: '28px' }}
                        label='Reason (Enter a reason why you are changing the WLH ID status)'
                        id='reason'
                        name='reason'
                        multiline
                        rows={3}
                    />
                );
                break;
            case 'RETIRED':
                return (
                    <>
                        <FormGroup sx={{ width: '330px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '28px' }}>
                            <Typography variant='body1' >Recapture Kits Returned</Typography>
                            <FormControlLabel control={<Switch onChange={isRecaptureReturned} sx={{ marginInline: '20px' }} />} label={`${recaptureReturned ? 'Yes' : 'No'}`} />
                            <Typography variant='body1' >Recapture Status</Typography>
                            <FormControlLabel control={<Switch onChange={handleRecaptureStatus} onClick={handleIdConfirmation} sx={{ marginInline: '20px' }} />} label={`${recaptureStatus ? 'On' : 'Off'}`} sx={{ marginTop: '20px' }} />
                        </FormGroup>

                        <TextField
                            sx={{ width: '529px', marginTop: '28px', display: recaptureStatus ? 'auto' : 'none' }}
                            id='correctIdNumber'
                            name='correctIdNumber'
                            label='Correct WLH ID Number'
                            defaultValue='Pending'
                        />

                        <TextField
                            sx={{ minWidth: '1091px', marginTop: '28px' }}
                            label='Reason (Enter a reason why you are changing the WLH ID status)'
                            id='reason'
                            name='reason'
                            multiline
                            rows={3}
                        />

                        <Dialog
                            open={IdConfirmation}
                            onClose={handleCloseIdConfirmation}
                            maxWidth={false}
                            PaperProps={{
                                sx: { width: '600px', maxHeight: '272px', height: '279px' }
                            }}
                        >
                            <IconButton
                                onClick={handleCloseIdConfirmation}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <DialogTitle sx={{ fontSize: '16px', padding: '50px 0 20px 72px' }}>
                                {"Please enter the Correct WL ID below"}
                            </DialogTitle>
                            <DialogContent sx={{ padding: '0 72px', overflowY: 'unset' }}>
                                <TextField
                                    sx={{ width: '305px' }}
                                    id='correctId'
                                    name='correctId'
                                    label='Correct WLH ID'
                                />
                                <Tooltip
                                    title="Flag it if the ID is not availabe as a to do list for the future"
                                    arrow
                                    placement="right"
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                color: "#313132",
                                                backgroundColor: "white",
                                                border: '1px solid #E6E8ED',
                                                width: "140px",
                                                height: "70px",
                                                padding:'10px'
                                            }
                                        },
                                        arrow: {
                                            sx: {
                                                color: "white",
                                                "&:before": {
                                                    border: "1px solid #E6E8ED"
                                                }
                                            }
                                        }
                                    }}
                                >
                                    <IconButton onClick={handleFlag} className='flagIcon'>
                                        {isFlagChecked()}
                                    </IconButton>
                                </Tooltip>
                            </DialogContent>
                            <DialogActions sx={{ padding: '0 32px 35px 0' }}>
                                <Button variant={'contained'} onClick={handleCloseIdConfirmation} className='requesterFormBtn' >Save</Button>
                                <Button variant={'outlined'} onClick={handleCloseIdConfirmation} className='requesterFormBtn' sx={{ marginLeft: '11px' }}>Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </>
                );
                break;

            default:
                return (<></>);
        }
    }

    return (
        <Box sx={{ width: '1091px', margin: '48px auto' }}>
            <TextField
                sx={{ width: '529px', marginTop: '8px' }}
                id='idStatus'
                label='Change WLH Status *'
                name='idStatus'
                defaultValue={IdStatus}
                select
                onChange={(e) => {
                    setStatus(e.target.value);
                }}
                onSelect={handleUpdate}
            >
                {validSingleIdStatus.map((m) => (
                    <MenuItem key={m.value} value={m.value} >
                        {m.label}
                    </MenuItem>
                ))}
            </TextField>
            {
                renderDetailed()
            }
        </Box>

    )
};

export default StatusForm;
