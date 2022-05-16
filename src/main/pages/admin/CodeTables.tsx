import React, {useEffect, useState} from 'react';
import {useAPI} from "../../hooks/useAPI";

const List: React.FC = () => {
	const api = useAPI();

	const [codeTables, setCodeTables] = useState([]);

	useEffect(() => {

		const doAPIRequest = async () => {
			setCodeTables([]);

			const data = await api.getCodeTables();

			const expanded = data.map(async (ct) => {
				return {
					...ct,
					items: await api.getCodeTable(ct.name)
				};
			});

			Promise.all(expanded).then(v => {
				setCodeTables(v);
			});

		};

		doAPIRequest().catch(e => {
			console.error(e)
		});

	}, []);

	return (
		<>
			<h2>Available Code Tables</h2>
			{codeTables.map((ct, i) => (
				<div key={i}>
					<h3>{ct.name} ~ {ct.displayed_name}</h3>
					<table>
						<thead>
							<tr>
								<th>value</th>
								<th>displayed value</th>
								<th>categories</th>
								<th>effective</th>
								<th>expires</th>
							</tr>
						</thead>
						<tbody>
							{ct.items.map(item => (
								<tr key={`${ct.name} - ${item.id}`}>
									<td>{item.value}</td>
									<td>{item.displayed_value}</td>
									<td>{item.categories?.join(', ')}</td>
									<td>{item.effective}</td>
									<td>{item.expires}</td>
								</tr>))}
						</tbody>
					</table>
				</div>))}
		</>
	);
};

export default List;
