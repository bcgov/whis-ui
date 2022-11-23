import React, {useEffect, useState} from 'react';
import {useAPI} from "../../hooks/useAPI";
import {Button, Stack} from "@mui/material";
import '../../styles/inventory.scss';
import {useSelector} from "../../../state/utilities/use_selector";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";
import EditForm from "../../components/wildlifeIds/edit/EditForm";

const Edit: React.FC = () => {

	const me = useSelector(state => state.Auth);
	const api = useAPI();
	const {id} = useParams();
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

	return (
		<>
			<EditForm wildlifeId={data}/>
		</>
	);
};

export default Edit;
