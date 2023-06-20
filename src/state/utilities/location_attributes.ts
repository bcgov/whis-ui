export function descriptionForLocation(location) {
	switch (location.type) {
	case 'REGION':
		return location.region.name;
	case 'MANAGEMENT_UNIT':
		return location.managementUnit.name;
	case 'POPULATION_UNIT':
		return location.populationUnit.name;
	case 'HERD_NAME':
		return location.herdName;
	case 'COORDINATES':
		return `${location.latitude}, ${location.longitude}`
	case 'UTM_COORDINATES':
		return `${location.northing} N, ${location.easting} E, Zone ${location.zone}`
	case 'CITY':
		return location.city;
	case 'CIVIC_ADDRESS':
		return `${location.address}, ${location.city}`
	default:
		return JSON.stringify(location, null, 2);
	}
}
