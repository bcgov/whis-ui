import React, {useEffect} from 'react';
import {useLocation, useParams} from "react-router";
import EditForm from "../../components/wildlifeIds/edit/EditForm";
import {useDispatch} from "react-redux";
import {WILDLIFE_HEALTH_ID_CLEAR, WILDLIFE_HEALTH_ID_LOAD_REQUEST} from "../../../state/actions";

import {useSelector} from "../../../state/utilities/use_selector";
import Loading from "../../components/util/Loading";

const Edit = () => {
	const {id} = useParams();
	const {pathname} = useLocation();

	const dispatch = useDispatch();
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
			<EditForm wildlifeHealthId={data}/>
		</>
	);
};

export default Edit;
