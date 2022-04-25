import React, {useEffect, useState} from 'react';
import {useAPI} from "../../hooks/useAPI";

const List: React.FC = () => {
	const api = useAPI();

	const [items, setItems] = useState([]);

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
		<>
			<h2>Listing Current IDs</h2>
			{items.map((i, j) => (
				<p key={j}>{i.year} -- {i.number}</p>
			))}
		</>
	);
};

export default List;
