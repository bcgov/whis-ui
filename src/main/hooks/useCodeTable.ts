import {useSelector} from "../../state/utilities/use_selector";
import {selectCodeTables} from "../../state/reducers/code_tables";
import {useEffect, useState} from "react";

export const useCodeTable = (name) => {

	const {tables, initialized} = useSelector(selectCodeTables);

	const [internalState, setInternalState] = useState({
		table: null,
		codes: [],
		mappedCodes: []
	});

	useEffect(() => {
		if (initialized) {
			if (!tables.hasOwnProperty(name)) {
				console.log(`Warning, no code table ${name} found`);
				return;
			}
			setInternalState({
				table: tables[name],
				codes: tables[name].codes,
				mappedCodes: tables[name].codes.map(c => ({
					code: c.code,
					name: c.name
				}))
			})
		}
	}, [initialized]);

	return internalState;


}

export default useCodeTable;
