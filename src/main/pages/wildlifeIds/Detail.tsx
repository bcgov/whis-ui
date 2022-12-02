import React, { useEffect, useState, useReducer } from 'react';
import { useAPI } from "../../hooks/useAPI";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import '../../styles/inventory.scss';
import { useSelector } from "../../../state/utilities/use_selector";
import { useNavigate } from "react-router-dom";
import { paperStyle } from "../../../state/style_constants";
import { useParams } from "react-router";
import Status from "../../components/wildlifeIds/detail/Status";
import Purpose from "../../components/wildlifeIds/detail/Purpose";
import AnimalDetails from "../../components/wildlifeIds/detail/AnimalDetails";
import Event from "../../components/wildlifeIds/detail/Event";

const Detail: React.FC = () => {

	const me = useSelector(state => state.Auth);
	const api = useAPI();
	const { id } = useParams();
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		api.getHealthID(id).then(data => {
			setData(data);
			setLoading(false);
		});
	}, [id]);

	const navigate = useNavigate();


	const [formState, formDispatch] = useReducer(formReducer, null, formReducerInit);

	function formReducerInit(initialState) {
		return {
			status: {
				status: 'RETIRED'
			},
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
		}
	}

	function formReducer(state, action) {

		switch (action.type) {
			case 'status.statusChange':
				return {
					...state,
					status: {
						...state.status,
						status: action.payload
					},
				}
				break;
		}

		return state;
	}

	return (
		<Box className='container'>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<Box>
					<Typography fontFamily={'BCSans-Bold'} sx={{ fontSize: '32px' }}>WLH ID [Number]</Typography>
					<Typography sx={{ marginBottom: '28px', fontSize: '16px', color: '#787f81' }}>View the WLH ID details and events.</Typography>
				</Box>

				<Button variant={'contained'} sx={{ height: '41px', textTransform: 'capitalize', fontSize: '14px', marginRight: '8px' }} >
					Update WLH ID
				</Button>
			</Box>
			<Status />
			<Purpose />
			<AnimalDetails />
			<Event />
			<Button variant={'contained'} sx={{ height: '41px', textTransform: 'capitalize', fontSize: '14px', float:'right' }} >
					Update WLH ID
			</Button>
		</Box>



	);
};

export default Detail;
