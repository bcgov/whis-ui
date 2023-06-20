import _ from 'lodash';

export interface SearchFormState {
	keywords: string;
	minimumId: string;
	maximumId: string;
	namedDateRanges: string[],
	creationStartDate: string;
	creationEndDate: string;
	status: string;
	purpose: string;
	requesterName: string;
	requesterOrganization: number | '';
	speciesObject: {
		id: string;
		label: string;
	},
	region: number | '';
	identifierType: string;
	identifierDetails: string;
	eventType: string;
	eventStartDate: string;
	eventEndDate: string;
	eventSubmitterName: string;
	eventSubmitterOrganization: number | '';
	eventLocationType: string;
	eventLocationDetails: string;
	eventAgeClass: string;
	eventSamples: string;
}

// the form actual request to be sent to the API
interface SearchRequest {
	keywords: string[];
	minimumId: number | null;
	maximumId: number | null;
	namedDateRanges: string[],
	creationStartDate: string,
	creationEndDate: string,
	status: string;
	purpose: string;
	requesterName: string,
	requesterOrganization: number | null;
	speciesId: number | null;
	region: number | null;
	identifierType: string;
	identifierDetails: string;
	eventType: string;
	eventStartDate: string;
	eventEndDate: string;
	eventSubmitterName: string;
	eventSubmitterOrganization: number | null;
	eventLocationType: string;
	eventLocationDetails: string;
	eventAgeClass: string;
	eventSamples: string;
}

function tokenizeKeywords(keywords: string): string[] {
	return _.uniq(keywords.match(/(?:[^\s"]+|"[^"]*")+/g))
}

// convert the internal state used by the form into an API request
export function getSearchRequestFromSearchFormState(formState: SearchFormState): SearchRequest {
	const transformed = {
		...formState,
		keywords: tokenizeKeywords(formState.keywords),
		speciesId: formState.speciesObject?.id ? parseInt(formState.speciesObject.id) : null,
		minimumId: formState.minimumId !== '' ? parseInt(formState.minimumId) : null,
		maximumId: formState.maximumId !== '' ? parseInt(formState.maximumId) : null,
		region: formState.region !== '' ? formState.region : null,
		requesterOrganization: formState.requesterOrganization !== '' ? formState.requesterOrganization : null,
		eventSubmitterOrganization: formState.eventSubmitterOrganization !== '' ? formState.eventSubmitterOrganization : null,
	}
	delete transformed['speciesObject'];

	return transformed;
}

export class SearchFilterChip {
	constructor(readonly objectPath: string, readonly value: string, readonly name: string) {
	}
}

class FilterChipMapping {
	constructor(readonly path: string, readonly name: string, readonly isArray: boolean = false) {
	}
}

const mappings = [
	//kw
	new FilterChipMapping('keywords', 'Keyword', true),

	new FilterChipMapping('minimumId', 'From ID'),
	new FilterChipMapping('maximumId', 'To ID'),
	new FilterChipMapping('creationStartDate', 'Creation Start Date'),
	new FilterChipMapping('creationEndDate', 'Creation End Date'),
	new FilterChipMapping('namedDateRanges', 'Date Range', true),

	new FilterChipMapping('status', 'Status'),
	new FilterChipMapping('purpose', 'Purpose'),
	new FilterChipMapping('requesterName', 'Requester Name'),
	new FilterChipMapping('requesterOrganization', 'Requester Organization'),
	new FilterChipMapping('speciesId', 'Species'),
	new FilterChipMapping('region', 'Region'),
	new FilterChipMapping('identifierType', 'Identifier Type'),
	new FilterChipMapping('identifierDetails', 'Identifier'),
	new FilterChipMapping('eventType', 'Event Type'),
	new FilterChipMapping('eventStartDate', 'Event Start'),
	new FilterChipMapping('eventEndDate', 'Event End'),
	new FilterChipMapping('eventSubmitterName', 'Submitter Name'),
	new FilterChipMapping('eventSubmitterOrganization', 'Submitter Organization'),
	new FilterChipMapping('eventLocationType', 'Event Location Type'),
	new FilterChipMapping('eventLocationDetails', 'Event Location'),
	new FilterChipMapping('eventLocationAgeClass', 'Event Age Class'),
	new FilterChipMapping('eventSamples', 'Samples Collected?'),

];

export function getChipsFromSearchRequest(request: SearchRequest): SearchFilterChip[] {
	const chips = [];
	for (let i = 0; i < mappings.length; i++) {
		const mapping = mappings[i];
		if (_.has(request, mapping.path)) {
			const value: string | string[] = _.get(request, mapping.path);
			if (mapping.isArray) {
				for (let j = 0; j < (value as string[]).length; j++) {
					const kw: string = value[j];
					chips.push(new SearchFilterChip(`${mapping.path}`, kw, mapping.name));
				}
			} else {
				if (value) {
					chips.push(new SearchFilterChip(mapping.path, value as string, mapping.name));
				}
			}

		}
	}
	return chips;
}

export function deleteChipAndRecomputeSearchRequest(request: SearchRequest, deleteChip: SearchFilterChip): SearchRequest {
	const update = {...request};
	const mapping = mappings.find(m => m.path === deleteChip.objectPath);
	if (!mapping) {
		// that's odd
		return;
	}
	if (mapping.isArray) {
		const array = _.get(update, deleteChip.objectPath);
		_.pull(array, deleteChip.value);
	} else {
		_.unset(update, deleteChip.objectPath)
	}

	return update;
}
