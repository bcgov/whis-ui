import {TextField, MenuItem} from '@mui/material';
import React, {useState} from 'react';
import TaxonomySearch from '../../util/TaxonomySearch';
import useCodeTable from '../../../hooks/useCodeTable';

const AdvancedSearchFields = ({formState, dispatch}) => {
	const {mappedCodes: organizations} = useCodeTable('organizations');
	// const {mappedCodes: roles} = useCodeTable('roles');
	const {mappedCodes: regions} = useCodeTable('regions');

	const validRoles = [
		{value: 'CONSERVATION_OFFICER', label: 'Conservation Officer'},
		{value: 'CONTRACTOR', label: 'Contractor'},
		{value: 'COMPULSORY_INSPECTOR', label: 'Compulsory Inspector'},
		{value: 'FIRST_NATION', label: 'First Nation'},
		{value: 'GOVERNMENT_BIOLOGIST', label: 'Government Biologist'},
		{value: 'HIGHWAY_CREW', label: 'Highway Crew'},
		{value: 'HUNTER', label: 'Hunter'},
		{value: 'LABORATORY', label: 'Laboratory'},
		{value: 'PUBLIC', label: 'Public'},
		{value: 'RESEARCHER', label: 'Researcher'},
		{value: 'TRAPPER', label: 'Trapper'}
	];
	const validFirstNation = [
		{value: 'FIRST_NATION_1', label: 'First Nation 1'},
		{value: 'FIRST_NATION_2', label: 'First Nation 2'},
		{value: 'FIRST_NATION_3', label: 'First Nation 3'},
		{value: 'FIRST_NATION_4', label: 'First Nation 4'},
		{value: 'FIRST_NATION_5', label: 'First Nation 5'},
	];

	return (
		<>
			<TextField
				label="First Name"
				id="firstName"
				className="leftColumn"
				required
			/>

			<TextField label="Last Name" id="lastName" required className="rightColumn" />
			<TextField select className="leftColumn" id="role" label="Role">
				{validRoles.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
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
			<TextField className="leftColumn" id="region" label="Region">
				{regions.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
					</MenuItem>
				))}
			</TextField>
			<TextField select className="rightColumn" id="organization" label="Organization">
				{organizations.map((m, i) => (
					<MenuItem key={i} value={m.value}>
						{m.label}
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
