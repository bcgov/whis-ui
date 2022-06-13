import React, { useState, createElement } from 'react';
import { Box, Button, Card, TextField, Typography, InputAdornment, FormControl, Checkbox, FormControlLabel, FormGroup, MenuItem, FormLabel, Paper, IconButton, IconButtonProps, styled, Collapse, CardContent, CardActions, Table, TableBody, TableCell, TableHead, TableRow, TableContainer, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Radio, RadioGroup, Switch } from "@mui/material";
import '../../styles/updateID.scss';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

//Expand form
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));


const Search: React.FC = () => {

    const validPurposes = [
        { value: 'UNKNOWN', label: 'Unknown' },
        { value: 'HERD_HEALTH', label: 'Herd Health' },
        { value: 'PASSIVE', label: 'Passive Surveillance' },
        { value: 'TARGETED', label: 'Targeted Surveillance' }
    ];
    const validIdentifier = [
        { value: '+ Add Identifier Types', label: '+ Add Identifier Types' },
        { value: 'UNKNOWN', label: 'Alternate Animal ID' },
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
    const validLocation = [
        { value: '+ Add Location', label: '+ Add Location' },
        { value: 'REGION', label: 'Region' },
        { value: 'MANAGEMENT_UNIT', label: 'Management Unit' },
        { value: 'POPULATION_UNIT', label: 'Population Unit' },
        { value: 'HERD_NAME', label: 'Herd Name' },
        { value: 'LATITUDE', label: 'Latitude/ Longitude (in decimal degrees)' },
        { value: 'NICKNAME', label: 'Nickname' },
        { value: 'UTM_EASTING', label: 'UTM Easting Band' },
        { value: 'URM_NORTHING', label: 'URM Northing' },
        { value: 'CITY', label: 'City' },
        { value: 'CIVIC_ADDRESS', label: 'Civic Address' }
    ];
    const validOrganization = [
        { value: 'ONE', label: 'Organization 1' },
        { value: 'TWO', label: 'Organization 2' },
        { value: 'THREE', label: 'Organization 3' },
        { value: 'FOUR', label: 'Organization 4' }
    ];
    const validSex = [
        { value: 'FEMALE', label: 'Female' },
        { value: 'MALE', label: 'Male' },
        { value: 'UNKNOW', label: 'Unknown' }
    ];
    const validAgeClass = [
        { value: 'YOUNG', label: 'Young of the year' },
        { value: 'JUVENILE', label: 'Juvenile' },
        { value: 'ADULT', label: 'Adult' },
        { value: 'AGED_ADULT', label: 'Aged adult' },
        { value: 'UNCLASSIFIED', label: 'Unclassified' }
    ];

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

    const [checked1, setSamplesChecked1] = useState(false);
    const [checked2, setSamplesChecked2] = useState(false);
    const [checked3, setSamplesChecked3] = useState(false);
    const [showOptional, setShowOptional] = useState(false);
    const [showInnerOption, setInnerOption] = useState(true);
    const [identifier, setIdentifier] = useState('');
    const [organization, setOrganization] = useState('');
    const [purpose, setPurpose] = useState(formState.purpose);
    const [sex, setSex] = useState('');
    const [ageClass, setAgeClass] = useState('');
    const [earTag, setEarTag] = useState('');
    const [eventType, setEventType] = useState('');
    const [inputFields, setInputFields] = useState([
        { value: '', label: '' },
    ]);

    const [expanded_purpose, setExpandedPurpose] = useState(false);
    const [expanded_WLD, setExpandedWLD] = useState(false);
    const [expanded_event, setExpandedEvent] = useState(false);
    const handleExpandClick = () => {
        setExpandedPurpose(!expanded_purpose);
    };
    const handleExpandClick2 = () => {
        setExpandedWLD(!expanded_WLD);
    };
    const handleExpandClick3 = () => {
        setExpandedEvent(!expanded_event);
    };
    const handleSubmit = () => { }
    const handleUpdate = () => { }
    const handleShowOptional = (e) => {
        if (e.target.value == 'EAR_TAG' || e.target.value == 'RAPP_TAG') {
            setShowOptional(true);  //show options
            setInnerOption(false);  //eartag
        } else {
            setShowOptional(true);  //show options
            setInnerOption(true);  //eartag
        }
        console.log(e.target.value);
    }


    //update requester dialog
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    //Add Select element
    const handleChangeSelect = (index, e) => {
        const values = [...inputFields];
        values[index][e.target.value] = e.target.value;
        setInputFields(values);
    }
    const handleAddFields = (index) => {
        if (index === (inputFields.length - 1)) {
            setInputFields([...inputFields, { value: '', label: '' }])
        }
    }

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

        <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
            <Typography variant={'h4'}>Update WLH ID</Typography><br />
            <p>Update the WLH ID details and add one or more events.</p>

            <Paper sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '20px', alignItems: 'center', padding: '30px' }}>
                <span>
                    <p>General</p>
                    <p>Information</p>
                </span>
                <span>
                    <Typography variant="body2" color="text.secondary">
                        WLH ID Number
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        22-00001
                    </Typography>
                </span>
                <span>
                    <Typography variant="body2" color="text.secondary">
                        Creator
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        Jane Doe
                    </Typography>
                </span>
                <span>
                    <Typography variant="body2" color="text.secondary">
                        Generated Date
                    </Typography>
                    <Typography variant="body2" color="text.primary">
                        2022-03-05
                    </Typography>
                </span>
                <span>
                    <Typography variant="body2" color="text.secondary">
                        Status
                    </Typography>
                    <Typography variant="body2" color="text.white" className='assigned'>
                        Assigned
                    </Typography>
                </span>
            </Paper>
            <Card sx={{ marginTop: '20px', width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <p>Purpose Update</p>
                <ExpandMore
                    expand={expanded_purpose}
                    onClick={handleExpandClick}
                    aria-expanded={expanded_purpose}
                >
                    <KeyboardArrowDownIcon />
                </ExpandMore>
            </Card>
            <Collapse in={expanded_purpose}>
                <Paper sx={{ width: '100%', marginTop: '2px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', alignContent: 'flex-end' }}>
                        <TextField sx={{ m: 2, width: '40%' }}
                            id="purpose1"
                            select
                            label="Primary Purpose"
                            value={purpose}
                            onChange={(e) => {
                                setPurpose(e.target.value);
                            }}
                        >
                            {validPurposes.map((m, i) => (
                                <MenuItem key={i} value={m.value}>
                                    {m.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField sx={{ m: 2, width: '40%' }}
                            id="purpose2"
                            select
                            label="Secondary Purpose"
                            value={purpose}
                            onChange={(e) => {
                                setPurpose(e.target.value);
                            }}
                        >
                            {validPurposes.map((m, i) => (
                                <MenuItem key={i} value={m.value}>
                                    {m.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField
                            sx={{ m: 2, width: '60%' }}
                            label="Associated Project"
                            id="associatedProject"
                            defaultValue={formState.requesterRegion}
                            name="associatedProject"
                            onChange={handleUpdate}
                        />
                        <TextField
                            sx={{ m: 2, width: '60%' }}
                            label="Reason"
                            id="reason"
                            name="reason"
                            multiline
                            rows={5}
                            defaultValue={formState.requesterRegion}
                            onChange={handleUpdate}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '15px' }}>
                        <Typography variant="h6" sx={{ marginLeft: '10%' }}>
                            Requester
                        </Typography>
                        <Box sx={{ width: '60%' }}>
                            <Paper elevation={2} sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '10px' }}>
                                <p>Name</p>
                                <p>Family</p>
                                <p>Region</p>
                                <p>Organization</p>
                                <p>Role</p>
                                <p>Phone</p>
                                <p>Email</p>
                                <div>
                                    <IconButton onClick={handleClickOpen}>
                                        <EditIcon color='primary' />
                                    </IconButton>
                                    <IconButton>
                                        <DeleteIcon color='primary' />
                                    </IconButton>

                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>Update Requester</DialogTitle>
                                        <DialogContent sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                            <TextField sx={{ m: 2, width: '40%' }}
                                                label="Submitter First Name"
                                                id="first_name"
                                                name="first_name"
                                                onChange={handleUpdate}
                                            />
                                            <TextField sx={{ m: 2, width: '40%' }}
                                                label="Submitter Last Name"
                                                id="last_name"
                                                name="last_name"
                                                onChange={handleUpdate}
                                            />
                                            <TextField sx={{ m: 2, width: '40%' }}
                                                id="organization-select"
                                                select
                                                label="Organization"
                                                value={organization}
                                                onChange={(e) => {
                                                    setOrganization(e.target.value);
                                                }}
                                            >
                                                {validOrganization.map((m, i) => (
                                                    <MenuItem key={i} value={m.value}>
                                                        {m.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <TextField sx={{ m: 2, width: '40%' }}
                                                id="role-select"
                                                select
                                                label="Role"
                                                value={organization}
                                                onChange={(e) => {
                                                    setOrganization(e.target.value);
                                                }}
                                            >
                                                {validOrganization.map((m, i) => (
                                                    <MenuItem key={i} value={m.value}>
                                                        {m.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <TextField sx={{ m: 2, width: '40%' }}
                                                label="Phone Number"
                                                id="phone"
                                                name="phone"
                                                onChange={handleUpdate}
                                            />
                                            <TextField sx={{ m: 2, width: '40%' }}
                                                label="Email"
                                                id="email"
                                                name="email"
                                                onChange={handleUpdate}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button variant={'contained'} onClick={handleClose}>Update</Button>
                                            <Button variant={'outlined'} onClick={handleClose}>Cancel</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </Paper>
                            <Paper id={'line2'} elevation={2} sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '10px', marginTop: '1px' }}>
                                <p>Sultana</p>
                                <p>Majid</p>
                            </Paper>
                        </Box>

                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant={'contained'}
                            sx={{ m: 3, marginRight: '10px', width: '140px', height: '60px' }}
                        >
                            Update
                        </Button>
                        <Button variant={'outlined'}
                            sx={{ m: 3, width: '140px', height: '60px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Paper>
            </Collapse>


            <Card sx={{ marginTop: '20px', width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <p>WLH ID 220000-1</p>
                <ExpandMore
                    expand={expanded_WLD}
                    onClick={handleExpandClick2}
                    aria-expanded={expanded_WLD}
                >
                    <KeyboardArrowDownIcon />
                </ExpandMore>
            </Card>
            <Collapse in={expanded_WLD}>
                <Paper sx={{ width: '100%', marginTop: '2px', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                            <Typography variant="subtitle1" sx={{ width: '20%', textAlign: 'center', margin: '0 35px' }}>
                                Identifier Type (s)
                            </Typography>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <TextField
                                        sx={{ m: 2, width: '40%' }}
                                        label="Species"
                                        id="species"
                                        name="species"
                                        onChange={handleUpdate}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><AccountTreeOutlinedIcon /></InputAdornment>,
                                        }}
                                    />
                                    <TextField sx={{ m: 2, width: '40%' }}
                                        id="sex"
                                        select
                                        label="Sex"
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
                                </Box>
                                {inputFields.map((inputField, index) => (
                                    <div>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }} key={index}>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <TextField sx={{ m: 2, width: '40%' }}
                                                    id="identifier"
                                                    select
                                                    defaultValue={formState.identifier}
                                                    onChange={(e) => {
                                                        handleChangeSelect(index, e);
                                                        handleAddFields(index);
                                                        handleShowOptional(e);
                                                    }}
                                                >
                                                    {validIdentifier.map((m, i) => (
                                                        <MenuItem key={i} value={m.value}>
                                                            {m.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                <Box sx={{ width: '40%', display: 'flex', flexDirection: 'row' }}>
                                                    <Box sx={{ display: showOptional ? 'auto' : 'none' }}>

                                                        <TextField
                                                            sx={{ m: 2, width: '50%', display: showInnerOption ? 'auto' : 'none' }}
                                                            label="Identifier"
                                                            id="identifier"
                                                            name="identifier"
                                                            onChange={handleUpdate}
                                                        />
                                                        <TextField
                                                            sx={{ m: 2, width: '50%', display: showInnerOption ? 'none' : 'auto' }}
                                                            label="Identifier"
                                                            id="identifier"
                                                            name="identifier"
                                                            onChange={handleUpdate}
                                                        />
                                                        <TextField sx={{ m: 2, width: '25%', display: showInnerOption ? 'none' : 'auto' }}
                                                            id="sex"
                                                            select
                                                            label="Sex"
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
                                                            sx={{ width: '25%', display: showInnerOption ? 'none' : 'auto' }}
                                                            name="controlled-radio-buttons-group"
                                                            value={earTag}
                                                            onChange={(e) => {
                                                                setEarTag(e.target.value);
                                                            }}
                                                        >
                                                            <FormControlLabel value="left" control={<Radio />} label="Left" />
                                                            <FormControlLabel value="right" control={<Radio />} label="Right" />
                                                        </RadioGroup>
                                                        <IconButton>
                                                            <DeleteIcon color='primary' />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </div>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant={'contained'}
                            sx={{ m: 3, marginRight: '10px', width: '140px', height: '60px' }}
                        >
                            Update
                        </Button>
                        <Button variant={'outlined'}
                            sx={{ m: 3, width: '140px', height: '60px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Paper>
            </Collapse>
            <Card sx={{ marginTop: '20px', width: '100%', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <p>Event Update</p>
                <ExpandMore
                    expand={expanded_event}
                    onClick={handleExpandClick3}
                    aria-expanded={expanded_event}
                >
                    <KeyboardArrowDownIcon />
                </ExpandMore>
            </Card>
            <Collapse in={expanded_event}>
                <Paper sx={{ width: '100%', marginTop: '2px', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                        <FormControl sx={{ width: '20%', margin: '3% 0 0 7%' }}>
                            <FormLabel id="demo-controlled-radio-buttons-group">Event Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={eventType}
                                onChange={(e) => {
                                    setEventType(e.target.value);
                                }}
                            >
                                <FormControlLabel value="capture" control={<Radio />} label="Capture" />
                                <FormControlLabel value="mortality" control={<Radio />} label="Mortality" />
                                <FormControlLabel value="recapture" control={<Radio />} label="Recapture" />
                            </RadioGroup>
                        </FormControl>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                            <Typography variant="subtitle1" sx={{ width: '20%', textAlign: 'center', margin: '0 35px' }}>
                                Location (s)
                            </Typography>
                            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <TextField
                                        sx={{ m: 2, width: '40%' }}
                                        label="Date(DD-MM-YYYY)"
                                        id="date"
                                        name="date"
                                        onChange={handleUpdate}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end"><CalendarTodayIcon /></InputAdornment>,
                                        }}
                                    />
                                    <TextField sx={{ m: 2, width: '40%' }}
                                        id="ageClass"
                                        select
                                        label="Age Class"
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
                                </Box>
                                {inputFields.map((inputField, index) => (
                                    <div>
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }} key={index}>
                                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                <TextField sx={{ m: 2, width: '40%' }}
                                                    id="location"
                                                    select
                                                    defaultValue={formState.location}
                                                    onChange={(e) => {
                                                        handleChangeSelect(index, e);
                                                        handleAddFields(index);
                                                        handleShowOptional(e);
                                                    }}
                                                >
                                                    {validLocation.map((m, i) => (
                                                        <MenuItem key={i} value={m.value}>
                                                            {m.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                                <Box sx={{ width: '40%', display: 'flex', flexDirection: 'row', alignItems:'center' }}>
                                                    <Box sx={{ display: showOptional ? 'auto' : 'none' }}>

                                                        <TextField
                                                            sx={{ m: 2, width: '50%', display: showInnerOption ? 'auto' : 'none' }}
                                                            label="Identifier"
                                                            id="identifier"
                                                            name="identifier"
                                                            onChange={handleUpdate}
                                                        />
                                                        <TextField
                                                            sx={{ m: 2, width: '50%', display: showInnerOption ? 'none' : 'auto' }}
                                                            label="Identifier"
                                                            id="identifier"
                                                            name="identifier"
                                                            onChange={handleUpdate}
                                                        />
                                                        <TextField sx={{ m: 2, width: '25%', display: showInnerOption ? 'none' : 'auto' }}
                                                            id="sex"
                                                            select
                                                            label="Sex"
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
                                                            sx={{ width: '25%', display: showInnerOption ? 'none' : 'auto' }}
                                                            name="controlled-radio-buttons-group"
                                                            value={earTag}
                                                            onChange={(e) => {
                                                                setEarTag(e.target.value);
                                                            }}
                                                        >
                                                            <FormControlLabel value="left" control={<Radio />} label="Left" />
                                                            <FormControlLabel value="right" control={<Radio />} label="Right" />
                                                        </RadioGroup>
                                                        <IconButton>
                                                            <DeleteIcon color='primary' />
                                                        </IconButton>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </div>
                                ))}
                            </Box>
                        </Box>

                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                            <Typography variant="subtitle1" sx={{ width: '18%', textAlign: 'center', margin: '0 35px' }}>
                                Submitter (s)
                            </Typography>
                            <Box sx={{ width: '70%', display: 'flex', flexDirection: 'column' }}>
                                <FormGroup >
                                    <FormControlLabel control={<Checkbox />} label="Submitter is the same as the requester" sx={{ width: '80%' }} />
                                </FormGroup>
                            </Box>
                            <Button variant={'outlined'} sx={{ m: 3, width: '12%', height: '50px' }} onClick={handleClickOpen}>
                                + Add Submitter
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Update Requester</DialogTitle>
                                <DialogContent sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                                    <TextField sx={{ m: 2, width: '40%' }}
                                        label="Submitter First Name"
                                        id="first_name"
                                        name="first_name"
                                        onChange={handleUpdate}
                                    />
                                    <TextField sx={{ m: 2, width: '40%' }}
                                        label="Submitter Last Name"
                                        id="last_name"
                                        name="last_name"
                                        onChange={handleUpdate}
                                    />
                                    <TextField sx={{ m: 2, width: '40%' }}
                                        id="organization-select"
                                        select
                                        label="Organization"
                                        value={organization}
                                        onChange={(e) => {
                                            setOrganization(e.target.value);
                                        }}
                                    >
                                        {validOrganization.map((m, i) => (
                                            <MenuItem key={i} value={m.value}>
                                                {m.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField sx={{ m: 2, width: '40%' }}
                                        id="role-select"
                                        select
                                        label="Role"
                                        value={organization}
                                        onChange={(e) => {
                                            setOrganization(e.target.value);
                                        }}
                                    >
                                        {validOrganization.map((m, i) => (
                                            <MenuItem key={i} value={m.value}>
                                                {m.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField sx={{ m: 2, width: '40%' }}
                                        label="Phone Number"
                                        id="phone"
                                        name="phone"
                                        onChange={handleUpdate}
                                    />
                                    <TextField sx={{ m: 2, width: '40%' }}
                                        label="Email"
                                        id="email"
                                        name="email"
                                        onChange={handleUpdate}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button variant={'contained'} onClick={handleClose}>Update</Button>
                                    <Button variant={'outlined'} onClick={handleClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'baseline' }}>
                        <Typography variant="subtitle1" sx={{ width: '20%', textAlign: 'center', margin: '0 35px' }}>
                            Samples
                        </Typography>
                        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                            <FormGroup sx={{ width: '35%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginLeft: '2%' }}>
                                <p>Samples Were Collected?</p>
                                <FormControlLabel control={<Switch onChange={toggleChecked1} />} label={`${checked1 ? 'Yes' : 'No'}`} />
                                <p>Samples Sent for Testing?</p>
                                <FormControlLabel control={<Switch onChange={toggleChecked2} />} label={`${checked2 ? 'Yes' : 'No'}`} />
                                <p>Test Results Received?</p>
                                <FormControlLabel control={<Switch onChange={toggleChecked3} />} label={`${checked3 ? 'Yes' : 'No'}`} />
                            </FormGroup>
                            <TextField
                                sx={{ m: 2, width: '85%' }}
                                label="History (Max 500 Characters)"
                                id="history"
                                name="history"
                                multiline
                                rows={5}
                                defaultValue={formState.requesterRegion}
                                onChange={handleUpdate}
                                inputProps={{ maxLength: 500 }}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant={'contained'}
                            sx={{ m: 3, marginRight: '10px', width: '140px', height: '60px' }}
                        >
                            Update
                        </Button>
                        <Button variant={'outlined'}
                            sx={{ m: 3, width: '140px', height: '60px' }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Paper>
            </Collapse>
        </Box>
    );
};
export default Search;