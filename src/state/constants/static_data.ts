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
	'status': {
		name: 'status',
		displayed_name: 'Valid Status',
		codes: [
			validCodeFromLabelAndValue({value: 'ASSIGNED', label: 'Assigned'}),
			validCodeFromLabelAndValue({value: 'UNASSIGNED', label: 'Unassigned'}),
			validCodeFromLabelAndValue({value: 'RETIRED', label: 'Retired'})
		]
	},
	'regions': {
		name: 'regions',
		displayed_name: 'Valid Regions',
		codes: [
			validCodeFromLabelAndValue({value: 'VANCOUVER_ISLAND', label: '1 - Vancouver Island'}),
			validCodeFromLabelAndValue({value: 'LOWER_MAINLAND', label: '2 - Lower Mainland'}),
			validCodeFromLabelAndValue({value: 'THOMPSON', label: '3 - Thompson'}),
			validCodeFromLabelAndValue({value: 'KOOTENAY', label: '4 - Kootenay'}),
			validCodeFromLabelAndValue({value: 'CARIBOO', label: '5 - Cariboo'}),
			validCodeFromLabelAndValue({value: 'SKEENA', label: '6 - Skeena'}),
			validCodeFromLabelAndValue({value: 'OMINECA', label: '7 - Omineca'}),
			validCodeFromLabelAndValue({value: 'OKANAGAN', label: '8 - Okanagan'}),
			validCodeFromLabelAndValue({value: 'PEACE', label: '9 - Peace'}),
			validCodeFromLabelAndValue({value: 'NOT_RECORDED', label: 'Not Recorded'}),
		]
	},
	'organizations': {
		name: 'organizations',
		displayed_name: 'Valid Organizations',
		codes: [
			validCodeFromLabelAndValue({value: 'ORGANIZATION1', label: 'Organization1'}),
			validCodeFromLabelAndValue({value: 'ORGANIZATION2', label: 'Organization2'}),
			validCodeFromLabelAndValue({value: 'ORGANIZATION3', label: 'Organization3'}),
			validCodeFromLabelAndValue({value: 'ORGANIZATION4', label: 'Organization4'})
		]
	},
	'roles': {
		name: 'roles',
		displayed_name: 'Valid Roles',
		codes: [
			validCodeFromLabelAndValue({value: 'CONSERVATION_OFFICER', label: 'Conservation Officer'}),
			validCodeFromLabelAndValue({value: 'CONTRACTOR', label: 'Contractor'}),
			validCodeFromLabelAndValue({value: 'COMPULSORY_INSPECTOR', label: 'Compulsory Inspector'}),
			validCodeFromLabelAndValue({value: 'FIRST_NATION', label: 'First Nation'}),
			validCodeFromLabelAndValue({value: 'GOVERNMENT_BIOLOGIST', label: 'Government Biologist'}),
			validCodeFromLabelAndValue({value: 'HIGHWAY_CREW', label: 'Highway Crew'}),
			validCodeFromLabelAndValue({value: 'HUNTER', label: 'Hunter'}),
			validCodeFromLabelAndValue({value: 'PUBLIC', label: 'Public'}),
			validCodeFromLabelAndValue({value: 'TRAPPER', label: 'Trapper'}),
		]
	}
};
