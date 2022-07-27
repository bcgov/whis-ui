import {Code} from "../reducers/code_tables";

function validCodeFromLabelAndValue({label, value}): Code {
	const code: Code = {
		id: value,
		value,
		displayed_value: label,
		effective: '',
		expires: '',
		categories: ['static_data']
	};
	return code;
}

/* static placeholder data for development purposes */
export const staticData = {

	'purposes': {
		name: 'purposes',
		displayed_name: 'Valid Purposes',
		codes: [
			validCodeFromLabelAndValue({value: 'HERD_HEALTH', label: 'Herd Health'}),
			validCodeFromLabelAndValue({value: 'PASSIVE', label: 'Passive Surveillance'}),
			validCodeFromLabelAndValue({value: 'TARGETED', label: 'Targeted Surveillance'}),
			validCodeFromLabelAndValue({value: 'UNKNOWN', label: 'Unknown'})
		]
	},
	'regions': {
		name: 'regions',
		displayed_name: 'Valid Regions',
		codes: [
			validCodeFromLabelAndValue({value: 'REGION1', label: 'Region1'}),
			validCodeFromLabelAndValue({value: 'REGION2', label: 'Region2'}),
			validCodeFromLabelAndValue({value: 'REGION3', label: 'Region3'}),
			validCodeFromLabelAndValue({value: 'REGION4', label: 'Region4'})
		]
	},
	'organizations': {
		name: 'organizations',
		displayed_name: 'Valid Organizations',
		codes: [
			validCodeFromLabelAndValue({value: 'ORGANIZATION1', label: 'Organization1'}),
			validCodeFromLabelAndValue({value: 'ORGANIZATION2', label: 'Organization'}),
			validCodeFromLabelAndValue({value: 'ORGANIZATION3', label: 'Organization3'}),
			validCodeFromLabelAndValue({value: 'ORGANIZATION4', label: 'Organization4'})
		]
	},
	'roles': {
		name: 'roles',
		displayed_name: 'Valid Roles',
		codes: [
			validCodeFromLabelAndValue({value: 'ROLE1', label: 'Role1'}),
			validCodeFromLabelAndValue({value: 'ROLE2', label: 'Role2'}),
			validCodeFromLabelAndValue({value: 'ROLE3', label: 'Role3'}),
			validCodeFromLabelAndValue({value: 'ROLE4', label: 'Role4'})
		]
	}
};
