import {TextField, MenuItem, Grid} from '@mui/material';
import React from 'react';
import {useSelector} from '../../../state/utilities/use_selector';

const AdvancedSearchFields = () => {
	const {region: regions, organization: organizations, organizational_role: roles} = useSelector(state => state.CodeTables.tables);

	const validFirstNation = [
		{value: 'FIRST_NATION_1', label: 'First Nation 1'},
		{value: 'FIRST_NATION_2', label: 'First Nation 2'},
		{value: 'FIRST_NATION_3', label: 'First Nation 3'},
		{value: 'FIRST_NATION_4', label: 'First Nation 4'},
		{value: 'FIRST_NATION_5', label: 'First Nation 5'}
	];

	return (
		<>
			<Grid item xs={12} md={6}>
				<TextField label="First Name" id="firstName" required />
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField label="Last Name" id="lastName" required />
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField select id="role" label="Role">
					{roles?.codes?.map(m => (
						<MenuItem key={m.code} value={m.code}>
							{m.name}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField select id="firstNation" label="First Nation">
					{validFirstNation.map((m, i) => (
						<MenuItem key={i} value={m.value}>
							{m.label}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField select id="region" label="Region">
					{regions?.codes?.map(m => (
						<MenuItem key={m.code} value={m.code}>
							{m.name}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField select id="organization" label="Organization">
					{organizations?.codes?.map(m => (
						<MenuItem key={m.code} value={m.code}>
							{m.name}
						</MenuItem>
					))}
				</TextField>
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField id="email" label="Email" required />
			</Grid>
			<Grid item xs={12} md={6}>
				<TextField id="phone" label="Phone" />
			</Grid>
			<Grid item xs={12} md={12}>
				<TextField label="Description" multiline rows={3} />
			</Grid>
		</>
	);
};

export default AdvancedSearchFields;
