import React, {useEffect, useState} from 'react';
import {useAPI} from "../../hooks/useAPI";

const List: React.FC = () => {
	const api = useAPI();

	const [years, setYears] = useState([]);

	useEffect(() => {

		const doAPIRequest = async () => {
			setYears([]);

			const data = await api.getYears();
			setYears(data);

		};

		doAPIRequest().catch(e => {
			console.error(e)
		});

	}, []);

	return (
		<>
			<h2>Years</h2>
			<ul>
				{years.map((year, i) => (
					<li key={i}>Year {JSON.stringify(year)}</li>
				))}
			</ul>
		</>
	);
};

export default List;
