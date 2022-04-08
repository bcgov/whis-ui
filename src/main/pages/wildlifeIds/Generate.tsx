import React, {useState} from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  makeStyles, MenuItem,
  Select,
  Slider,
  TextField,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

const Generate: React.FC = () => {
  const classes = useStyles();

  const validQuantities = [
    {value: 1, label: '1'},
    {value: 5, label: '5'},
    {value: 10, label: '10'},
    {value: 25, label: '25'},
    {value: 50, label: '50'},
    {value: 100, label: '100'}
  ];
  const validPurposes = [
    {value: 'UNKNOWN', label: 'Unknown'},
    {value: 'HERD_HEALTH', label: 'Herd Health'},
    {value: 'PASSIVE', label: 'Passive Surveillance'},
    {value: 'TARGETED', label: 'Targeted Surveillance'}
  ];

  const [formState, setFormState] = useState({
    quantity: 1,
    year: '2022',
    purpose: 'Unknown',
    species: '',
    requesterName: '',
    requesterContactEmail: '',
    requesterContactPhone: '',
    requesterRegion: '',
    requesterRole: 'WLHBiologist',
    associatedProject: '',
    reason: ''
  });

  const handleSubmit = (event) => {
    console.dir(formState);
  }

  const handleUpdate = (event) => {
    const currentState = formState;
    let matches = null;
    console.log(event);

    switch (event.target.name) {
      default:
        currentState[event.target.name] = event.target.value;
    }

    setFormState(currentState);
  }
  return (
    <>
      <Box style={{margin: 0, padding: 0}} display="flex" flexDirection={'column'}>

        <Typography variant={'h5'}>Generate New Wildlife Health Identifiers</Typography>

        <FormControl className={classes.formControl}>
          <Typography gutterBottom>Generated Quantity</Typography>
          <Slider
          aria-label="Quantity"
          value={formState.quantity}
          valueLabelDisplay="auto"
          name="quantity"
          step={null}
          marks={validQuantities}
          onChange={(e, val: number) => {
            setFormState({...formState, quantity: val})
          }}
        />
        </FormControl>

        <TextField className={classes.formControl}
                   label='Year'
                   id="year"
                   defaultValue={formState.year}
                   name="year"
                   onChange={handleUpdate}
        />


        <TextField className={classes.formControl}
                   label='Species'
                   id="species"
                   defaultValue={formState.species}
                   name="species"
                   onChange={handleUpdate}
        />


        <FormControl className={classes.formControl}>
          <InputLabel id="label-purpose-select">Purpose</InputLabel>
          <Select
            labelId="label-purpose-select"
            id="purpose-select"
            defaultValue={formState.purpose}
            name="modeOfTransport"
            onChange={handleUpdate}>
            {validPurposes.map((m, i) => (
              <MenuItem key={i} value={m.value}>{m.label}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField className={classes.formControl}
                   label='Requester Name'
                   id="requesterName"
                   defaultValue={formState.requesterName}
                   name="requesterName"
                   onChange={handleUpdate}
        />

        <TextField className={classes.formControl}
                   label='Requester Contact Email'
                   id="requesterContactEmail"
                   defaultValue={formState.requesterContactEmail}
                   name="requesterContactEmail"
                   onChange={handleUpdate}
        />

        <TextField className={classes.formControl}
                   label='Requester Contact Phone'
                   id="requesterContactPhone"
                   defaultValue={formState.requesterContactPhone}
                   name="requesterContactPhone"
                   onChange={handleUpdate}
        />

        <TextField className={classes.formControl}
                   label='Requester Region'
                   id="requesterRegion"
                   defaultValue={formState.requesterRegion}
                   name="requesterRegion"
                   onChange={handleUpdate}
        />

        <TextField className={classes.formControl}
                   label='Requester Role'
                   id="requesterRole"
                   defaultValue={formState.requesterRole}
                   name="requesterRole"
                   onChange={handleUpdate}
        />

        <TextField className={classes.formControl}
                   label='Associated Project'
                   id="associatedProject"
                   defaultValue={formState.associatedProject}
                   name="associatedProject"
                   onChange={handleUpdate}
        />

        <TextField className={classes.formControl}
                   label='Reason'
                   id="reason"
                   defaultValue={formState.reason}
                   name="reason"
                   onChange={handleUpdate}
        />

        <Button variant={'contained'} onClick={handleSubmit}>Generate</Button>

      </Box>
    </>
  )
};

export default Generate;
