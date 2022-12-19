const getWildlifeHealthId = state => state.WildlifeHealthId;

export { getWildlifeHealthId };

export function buildFormStateFromLegacyJSON(legacy) {

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
			"identifiers": [
				{
					"identifierType": '',
					"identifierNameorNumber": '',
					"Additionalinfo": '',
				}
			],
		}
		,
		"events": [
			{
				"eventType": 'Capture',
				"eventDate": '',
				"ageClass": 'Adult',
				"location": [
					{
						"location": 'Region',
						"details": 'Number: 3235362',
					}
				],
				"history": 'asdasdfasdfasfa',
				"samples": [
					{
						"isCollected": 'Yes',
						"isSenttoTesting": 'Yes',
						"testResultReceived": 'No',
					}
				],
			},
		]
	};
	return built;
}
