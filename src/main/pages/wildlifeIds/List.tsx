import React, {useEffect, useState} from 'react';
import {useAPI} from "../../hooks/useAPI";
import {paperStyle} from "../../../state/style_constants";
import {Button, Paper, Typography} from "@mui/material";
import '../../styles/inventory.scss';
import {useNavigate} from "react-router-dom";
import Search from '../../components/wildlifeIds/Search';

const List: React.FC = () => {
	const api = useAPI();

	const [items, setItems] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {

		const doAPIRequest = async () => {
			const data = await api.getHealthIDs();
			setItems(data);
		};

		doAPIRequest().catch(e => {
			console.error(e)
		});

	}, []);

	return (
		<Paper sx={paperStyle}>
			<Typography variant={'h3'}>WLH ID Inventory</Typography>

			<table className={'inventory_table'}>
				<thead>
				<tr>
					<th>Year</th>
					<th>WLH ID</th>
					<th></th>
				</tr>
				</thead>
				<tbody>
				{items.map((i, j) => (
					<tr key={j}>
						<td>{i.year}</td>
						<td>{i.wlh_id}</td>
						<td><a onClick={() => {
							navigate(`/wildlifeIds/${i.id}`)
						}}>Details</a></td>
					</tr>
				))}
				</tbody>
			</table>

			<Search/>
		</Paper>
	);
};

export default List;
