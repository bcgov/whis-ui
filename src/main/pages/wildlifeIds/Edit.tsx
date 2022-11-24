import React, {useEffect} from 'react';
import {useParams} from "react-router";
import EditForm from "../../components/wildlifeIds/edit/EditForm";
import {useDispatch} from "react-redux";
import {WILDLIFE_HEALTH_ID_CLEAR, WILDLIFE_HEALTH_ID_LOAD_REQUEST} from "../../../state/actions";

import '../../styles/inventory.scss';
import {useSelector} from "../../../state/utilities/use_selector";
import {getWildlifeHealthId} from "../../../state/utilities/wildlife_health_id_helper";

const Edit: React.FC = () => {
	const {id} = useParams();

	const dispatch = useDispatch();
	const data = useSelector(getWildlifeHealthId);

	useEffect(() => {
		dispatch({
			type: WILDLIFE_HEALTH_ID_LOAD_REQUEST, payload: {
				id
			}
		});
		return () => {
			dispatch({
				type: WILDLIFE_HEALTH_ID_CLEAR
			}
			);
		}


	}, [id]);

	return (
		<>
			<EditForm wildlifeHealthId={data}/>
		</>
	);
};

export default Edit;
