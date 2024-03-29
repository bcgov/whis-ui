import React from 'react';
import {useSelector} from "../../../state/utilities/use_selector";
import Loading from "../../components/util/Loading";
import {CodeTable} from "../../../state/reducers/code_tables";

const List: React.FC = () => {
	const loaded = useSelector(state => state.CodeTables.initialized);
	const codeTables = useSelector(state => state.CodeTables.tables);

	if (!loaded) {
		return <Loading/>;
	}

	return (
		<>
			<h2>Available Code Tables</h2>
			{Object.values(codeTables).map((ct: CodeTable, i) => (
				<div key={i}>
					<h3>{ct.name} ~ {ct.displayed_name}</h3>
					<table>
						<thead>
							<tr>
								<th>value</th>
								<th>displayed value</th>
							</tr>
						</thead>
						<tbody>
							{ct.codes.map(item => (
								<tr key={`${ct.name} - ${item.code}`}>
									<td>{item.name}</td>
									<td>{item.code}</td>
								</tr>))}
						</tbody>
					</table>
				</div>))}
		</>
	);
};

export default List;
