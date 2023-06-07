import {TextField, MenuItem} from '@mui/material';
import React from 'react';
import {useSelector} from '../../../state/utilities/use_selector';

const AdvancedSearchFields = () => {
	const {
		region: regions,
		organization: organizations,
		organizational_role: roles
	} = useSelector(state => state.CodeTables.tables);

	const validFirstNation = [
		{value: 'FIRST_NATION_1', label: 'First Nation 1'},
		{value: 'FIRST_NATION_2', label: 'First Nation 2'},
		{value: 'FIRST_NATION_3', label: 'First Nation 3'},
		{value: 'FIRST_NATION_4', label: 'First Nation 4'},
		{value: 'FIRST_NATION_5', label: 'First Nation 5'}
	];

	return (
		<>
			<TextField label="First Name" id="firstName" className="leftColumn" required />

			<TextField label="Last Name" id="lastName" required className="rightColumn" />
			<TextField select className="leftColumn" id="role" label="Role">
				{roles?.codes?.map(m => (
					<MenuItem key={m.code} value={m.code}>
						{m.name}
					</MenuItem>
				))}
			</TextField>
			<TextField className="rightColumn" select id="firstNation" label="First Nation">
				{validFirstNation.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField select className="leftColumn" id="region" label="Region">
				{regions?.codes?.map(m => (
					<MenuItem key={m.code} value={m.code}>
						{m.name}
					</MenuItem>
				))}
			</TextField>
			<TextField select className="rightColumn" id="organization" label="Organization">
				{organizations?.codes?.map(m => (
					<MenuItem key={m.code} value={m.code}>
						{m.name}
					</MenuItem>
				))}
			</TextField>

			<TextField className="leftColumn" id="email" label="Email" required />

			<TextField className="rightColumn" id="phone" label="Phone" />

			<TextField sx={{width: '100%', marginBlock: '32px'}} label="Description" multiline rows={3} />
		</>
	);
};

export default AdvancedSearchFields;
