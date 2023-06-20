import React, {useEffect} from 'react';
import {useSelector} from "../../../state/utilities/use_selector";
import {useDispatch} from "react-redux";
import {useLocation, useParams} from "react-router";
import {WILDLIFE_HEALTH_ID_CLEAR, WILDLIFE_HEALTH_ID_LOAD_REQUEST} from "../../../state/actions";
import Loading from "../../components/util/Loading";
import DetailForm from '../../components/wildlifeIds/detail/DetailForm';
import {useNavigate} from "react-router-dom";

const Detail: React.FC = () => {

	const {id} = useParams();
	const {pathname} = useLocation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {working, initialized, data} = useSelector(state => state.WildlifeHealthId.single);

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
	}, [pathname, id]);

	if (!initialized || working) {
		return (<Loading/>);
	}

	return (
		<>
			<DetailForm
				wildlifeHealthId={data}
				onEditButtonClick={() => {
					navigate(`/wildlifeIds/edit/${id}`)
				}}
			/>
		</>


	);
};

export default Detail;
