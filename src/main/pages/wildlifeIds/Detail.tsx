import React, { useEffect } from 'react';
import '../../styles/inventory.scss';
import { useSelector } from "../../../state/utilities/use_selector";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { getWildlifeHealthId } from "../../../state/utilities/wildlife_health_id_helper";
import { WILDLIFE_HEALTH_ID_CLEAR, WILDLIFE_HEALTH_ID_LOAD_REQUEST } from "../../../state/actions";
import Loading from "../../components/util/Loading";
import DetailForm from '../../components/wildlifeIds/detail/DetailForm';
import {WildlifeHealthId} from '../../components/wildlifeIds/detail/SampleData'

const Detail: React.FC = () => {

	const { id } = useParams();

	const dispatch = useDispatch();
	const { loading, initialized, data } = useSelector(getWildlifeHealthId);

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

	if (!initialized || loading) {
		return (<Loading />);
	}

	return (
		<>
			<DetailForm wildlifeHealthId={WildlifeHealthId} />
		</>


	);
};

export default Detail;