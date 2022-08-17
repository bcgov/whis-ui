import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../styles/dashboard.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { useSelector } from "../../../state/utilities/use_selector";
import { Box, Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, Divider, FormControlLabel, IconButton, InputAdornment, MenuItem, Stack, Switch, TextField, Typography } from "@mui/material";
import { LocalizationProvider, MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const ActionManagement: React.FC = () => {
    const me = useSelector(state => state.Auth);
    const navigate = useNavigate();

    const [date, setDate] = React.useState<Date | null>(new Date());
    const [time, setTime] = React.useState<Date | null>(new Date());

    const receivers = [
        { label: 'Shari', value: 'Shari' },
        { label: 'Cati', value: 'Cati' },
        { label: 'Maeve', value: 'Maeve' },
        { label: 'Sultana', value: 'Sultana' },
    ]
    const [checked1, setSamplesChecked1] = useState(false);
    const toggleChecked1 = () => {
        setSamplesChecked1((prev) => !prev);
    }

    //handle blur
    const [requiredTitle, setRequiredTitle] = useState(false);
    const handleOnblur = (e) => {
        const value = e.target.value;
        if (value == "" || value == undefined || value == null) {
            setRequiredTitle(true);
        } else
            setRequiredTitle(false);
    }

    //submit dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ width: 'inherit' }}>
            <Stack direction="row" spacing={1}>
                <Card sx={{ borderRadius: '15px', boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 5px 0px', marginRight: '2%', width: '350px' }}>
                    <IconButton
                        // onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            left: 70,
                            top: 68,
                            fontSize: 'large'
                        }}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <CardHeader
                        title={'Profile'}
                        titleTypographyProps={{ sx: { paddingTop: '10px', color: '#666666' } }}
                        sx={{ textAlign: 'center', paddingTop: '30px' }}
                    />

                    <CardContent className={'profile_card'}>

                        <Box className='card_user_icon'>
                            <AccountCircleIcon color={'primary'} sx={{ fontSize: '140px' }} />
                        </Box>

                        <Box className={'name'}>

                            <PersonIcon color={'primary'} /><Typography>{me.bestName}</Typography>

                            <Typography color='textSecondary' sx={{ gridColumn: '2', paddingBottom: '1.5rem' }}>{me.roles.join(', ')}</Typography>

                            <LocalPhoneIcon color={'primary'} sx={{ marginBottom: '20px' }} /><Typography variant='subtitle2'>phone_placeholder</Typography>

                            <EmailIcon color={'primary'} sx={{ marginBottom: '20px' }} /><Typography variant='subtitle2'>{me.email}</Typography>

                            <BusinessIcon color={'primary'} sx={{ marginBottom: '20px' }} /><Typography variant='subtitle2'>org_placeholder</Typography>
                        </Box>

                        <Box className={'quick_access'} sx={{ marginTop: '2rem' }}>
                            <Divider variant="middle" sx={{ position:'relative', top:'-175px' }} />
                            <Divider variant="middle" sx={{ marginBottom: '25px' }} />
                            <Typography variant={'h6'} sx={{ marginBottom: '10px' }}>
                                Quick Access
                            </Typography>
                            <Box className={'actions'}>
                                <IconButton>
                                    <AddCircleOutlineIcon color={'primary'} />
                                </IconButton>
                                <IconButton>
                                    <ManageSearchIcon color={'primary'} />
                                </IconButton>
                                <IconButton>
                                    <NotificationsNoneIcon color={'primary'} />
                                </IconButton>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                <Card sx={{ borderRadius: '15px', boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 5px 0px', width: '850px' }} >
                    <CardHeader
                        title={'Action & Notification Management'}
                        titleTypographyProps={{ sx: { paddingTop: '10px', color: '#666666' } }}
                        subheader={'You may set some actions that you need reminders for them'}
                        subheaderTypographyProps={{ variant: 'subtitle1', sx: { paddingTop: '10px', color: 'black' } }}
                        sx={{ padding: '30px 0px 10px 50px' }}
                    />
                    <CardContent sx={{ paddingLeft: '50px' }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <TextField
                                    sx={{ width: '45%' }}
                                    label="Action Title"
                                    id="actionTitle"
                                    name="actionTitle"
                                    error={requiredTitle}
                                    onBlur={(e) => { handleOnblur(e) }}
                                    required
                                />
                                <Box sx={{ display: 'flex' }}>
                                    <MobileDatePicker
                                        label="Date"
                                        value={date}
                                        onChange={(newValue) => {
                                            setDate(newValue);
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                sx={{ width: '45%', marginRight: '50px' }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end"><CalendarTodayIcon color='primary' /></InputAdornment>,
                                                }}
                                            />}
                                    />
                                    <MobileTimePicker
                                        label="Time"
                                        value={time}
                                        onChange={(newValue) => {
                                            setTime(newValue);
                                        }}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                sx={{ width: '45%' }}
                                                InputProps={{
                                                    endAdornment: <InputAdornment position="end"><CalendarTodayIcon color='primary' /></InputAdornment>,
                                                }}
                                            />}
                                    />
                                </Box>
                                <TextField
                                    sx={{ width: '45%' }}
                                    id="receiver"
                                    name="receiver"
                                    select
                                    label="Receiver (Optional)"
                                    placeholder='Receiver (Optional)'
                                >
                                    {receivers.map((m, i) => (
                                        <MenuItem key={i} value={m.value}>
                                            {m.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    sx={{ width: '97%' }}
                                    id="note"
                                    name="note"
                                    label="Note (Optional)"
                                    multiline
                                    rows={3}
                                // onChange={handleUpdate}
                                />
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', color: 'rgb(140, 140, 140)' }}>
                                    <Typography variant='subtitle1' sx={{ marginRight: '15%' }}>Notification Method (s)</Typography>
                                    <FormControlLabel control={<Switch />} label='Dashboard' sx={{ marginRight: '8%' }} />
                                    <FormControlLabel control={<Switch onChange={toggleChecked1} />} label='Email' />
                                </Box>
                            </Stack>
                            <Button
                                variant='contained'
                                sx={{ textTransform: 'capitalize', margin: '40px 20px 20px 0px', float: 'right' }}
                                onClick={handleClickOpen}
                            >
                                Set Reminder
                            </Button>
                        </LocalizationProvider>

                    </CardContent>

                </Card>
            </Stack>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: { overflowY: 'inherit', width: '450px', height: '280px', borderRadius: '15px' }
                }}
            >
                <CheckCircleIcon sx={{ margin: 'auto', fontSize: '7rem', position: 'inherit', top: '-30px', fill: 'rgb(58, 219, 118)' }} />
                <IconButton
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ margin: 'auto', padding: '0 24px', textAlign: 'center' }}>
                    <p style={{ color: 'rgb(102, 102, 102)', fontSize: '16px' }}>You have successfully set a reminder</p>
                </DialogContent>
                <DialogActions sx={{ margin: 'auto', marginBottom: '25px' }}>
                    <Button sx={{ width: '110px', height: '45px', backgroundColor: 'rgb(58, 219, 118)', color: '#fff', ":hover": { backgroundColor: 'rgb(58, 219, 118)' } }}>OK</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ActionManagement;