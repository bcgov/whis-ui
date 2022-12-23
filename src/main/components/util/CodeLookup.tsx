import React, {useEffect, useState} from 'react';
import '../../styles/components/loading.scss';
import '../../styles/components/friendly_time.scss';
import {useSelector} from "../../../state/utilities/use_selector";
import {selectCodeTables} from "../../../state/reducers/code_tables";
import Loading from "./Loading";

const CodeLookup = ({codeTable, code}) => {

	const {initialized, tables} = useSelector(selectCodeTables);
	const [value, setValue] = useState('');

	useEffect(() => {
		if (!initialized) {
			setValue('Loading');
		}

		const table = tables[codeTable];
		if (table === undefined) {
			setValue(`Code table ${codeTable} not loaded or does not exist`)
		}

		const found = table.codes.find(c => c.value === code);
		if (found)
			setValue(found.displayed_value);
		else
			setValue(code);

	}, [codeTable, code, initialized]);

	return (
		<>
			{value}
		</>
	);
};

export default CodeLookup;
