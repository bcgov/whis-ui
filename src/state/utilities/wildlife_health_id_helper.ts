const getWildlifeHealthId = state => state.WildlifeHealthId;

export {getWildlifeHealthId};

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
			"history": [],
			"dirty": {
				"status": '',
				"reason": '',
				"additionalAttributes": {}
			}
		},
		"purpose":
			{
				"primaryPurpose": '',
				"secondaryPurpose": '',
				"associatedProject": '',
				"projectDetails":  '',
				"requester": null
			}
		,
		"animalDetails":
			{
				"species": '',
				"homeRegion": '',
				"sex": '',
				"identifiers": []
			}
		,
		"events": []
	};
	return built;
}
