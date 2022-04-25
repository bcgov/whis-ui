import React, {useEffect, useState} from 'react';
import {useAPI} from "../../hooks/useAPI";

const List: React.FC = () => {
	const api = useAPI();

	const [items, setItems] = useState([]);

	useEffect(() => {

		const doAPIRequest = async () => {
			const data = await api.getCodeTables();
			setItems(data);
		};

		doAPIRequest().catch(e => {
			console.error(e)
		});

	}, []);

	return (
		<>
			<h2>Listing Current IDs</h2>
		</>
	);
};

export default List;
