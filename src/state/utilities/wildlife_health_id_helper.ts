const getWildlifeHealthId = state => state.WildlifeHealthId;

export {getWildlifeHealthId};

export function buildFormStateFromLegacyJSON(legacy) {

	console.log('upgrading legacy data');

	// build a template object for the forms based on data returned by the v1 API

	const built = {
		"metadata": {
			'apiVersion': '20221206',
			"year": null,
			"id": `${legacy['id']}`,
			"wildlifeHealthId": legacy['wlh_id'],
			"generationDate": legacy['created_at'],
			"creator": {
				"name": legacy['email'],
			},
		},
		"status": {
			"history": [
				{
					"status": legacy['initial_status'],
					"reason": '',
					"additionalAttributes": {},
					"changedAt": legacy['created_at']
				}
			],
			"dirty": {
				"status": '',
				"reason": '',
				"additionalAttributes": {}
			}
		},
		"purpose":
			{
				"primaryPurpose": legacy['purpose'],
				"secondaryPurpose": '',
				"associatedProject": legacy['project'],
				"projectDetails": legacy['project_detail'],
				"requester": {
					"firstName": legacy['requester_first_name'],
					"lastName": legacy['requester_last_name'],
					"role": legacy['requester_role'],
					"region": legacy['requester_region'],
					"organization": legacy['requester_organization'],
					"phoneNumber": legacy['requester_phone_number'],
					"email": legacy['requester_email'],
				}
			}
		,
		"animalDetails":
			{
				"species": legacy['species'],
				"homeRegion": '',
				"sex": '',
				"identifiers": []
			}
		,
		"events": []
	};
	return built;
}

export function updateJSONStructure(toUpgrade) {
	const apiVersion = toUpgrade?.metadata?.apiVersion;

	if (!apiVersion) {
		return toUpgrade;
	}

	const upgraded = {...toUpgrade};

	switch (apiVersion) {
	case '20221206': {
		console.log(`upgrading from old version ${apiVersion}`);
		// need to remove event endDate, and change submitters to an array
		for (const e of toUpgrade.events) {

			// add the old one to the array, if it exists
			if (e.submitter !== null) {
				e['submitters'] = [{...e.submitter}];
			} else {
				e['submitters'] = [];
			}

			// remove legacy properties
			delete e['submitter'];
			delete e['endDate'];
		}
		upgraded.metadata.apiVersion = '20230119';
	}
	}

	console.dir('init state:');
	console.dir(toUpgrade);
	console.dir('upgraded state:');
	console.dir(upgraded);

	return upgraded;

}
