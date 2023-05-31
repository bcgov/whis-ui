import React, {useEffect, useState} from 'react';
import {Paper, Typography} from "@mui/material";
import '../../styles/list.scss';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {WILDLIFE_HEALTH_ID_LIST_ALL_REQUEST} from "../../../state/actions";
import {useSelector} from "../../../state/utilities/use_selector";

const List: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({type: WILDLIFE_HEALTH_ID_LIST_ALL_REQUEST});
	}, []);

	const {items} = useSelector(state => state.WildlifeHealthId.list);

	return (
		<Paper className='list_page'>
			<Typography variant='h1'>WLH ID Inventory</Typography>

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
							<td><a
								onClick={() => {
									navigate(`/wildlifeIds/edit/${i.id}`)
								}}
							>Edit</a></td>
							<td><a
								onClick={() => {
									navigate(`/wildlifeIds/detail/${i.id}`)
								}}
							>Details</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>

		</Paper>
	);
};

export default List;
