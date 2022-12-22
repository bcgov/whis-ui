import { Box, Paper, Table, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React from "react";

const HideableDetails = ({ state, index }) => {
    const submitters = state.events[index].submitter;
    return (
        <>
            <Box className="details_margin">
                <Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBottom: '19px' }}>Location</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className='tablehead'>
                                <TableCell>Location</TableCell>
                                <TableCell>Details</TableCell>
                            </TableRow>
                        </TableHead>
                        {state.events[index].locations.map((location, i) => {
                            const attributes = location.attributes;
                            const attr = Object.entries(attributes).map(([key, value]) => {
                                return (
                                    <>{key} : {value.toString()}&emsp;&emsp;&emsp;&emsp;</>
                                );
                            })
                            return (
                                <TableRow key={i} >
                                    <TableCell>{location.type}</TableCell>
                                    <TableCell>{attr}</TableCell>
                                </TableRow>
                            )
                        })}
                    </Table>
                </TableContainer>
                <Box className="details_margin">
                    <Typography variant='body2'>
                        History
                    </Typography>
                    <Typography variant='body1'>
                        {state.events[index].history}
                    </Typography>
                </Box>

                <Box className="details_margin">
                    <Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBottom: '19px' }}>Submitters</Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow className='tablehead'>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Family</TableCell>
                                    <TableCell>Region</TableCell>
                                    <TableCell>Organization</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Email</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{submitters.firstName}</TableCell>
                                    <TableCell>{submitters.lastName}</TableCell>
                                    <TableCell>{submitters.region}</TableCell>
                                    <TableCell>{submitters.organization}</TableCell>
                                    <TableCell>{submitters.role}</TableCell>
                                    <TableCell>{submitters.phoneNumber}</TableCell>
                                    <TableCell>{submitters.email}</TableCell>
                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </Box>
                <Box className="details_margin">

                    <Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '18px', marginBottom: '19px' }}>Samples</Typography>
                    <Box className="details_samples">
                        <span>
                            <Typography variant='body2'>
                                Samples Were Collected?
                            </Typography>
                            <Typography variant='body1'>
                                {state.events[index].additionalAttributes.samplesCollected ? 'Yes' : 'No'}
                            </Typography>
                        </span>
                        <span>
                            <Typography variant='body2'>
                                Samples Sent to Testing?
                            </Typography>
                            <Typography variant='body1'>
                                {state.events[index].additionalAttributes.samplesSentForTesting ? 'Yes' : 'No'}
                            </Typography>
                        </span>
                        <span>
                            <Typography variant='body2'>
                                Test Results Received?
                            </Typography>
                            <Typography variant='body1'>
                                {state.events[index].additionalAttributes.testResultsReceived ? 'Yes' : 'No'}
                            </Typography>
                        </span>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default HideableDetails;