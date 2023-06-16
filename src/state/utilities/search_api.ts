import _ from 'lodash';

interface SearchFormState {
	keywords: string;
	minimumId: string;
	maximumId: string;
	namedDateRanges: string[],
	creation: {
		startDate: string;
		endDate: string;
	},
	status: string;
	purpose: string;
	requester: {
		name: string;
		organization: string;
	},
	species: string;
	region: string;
	identifier: {
		type: string;
		details: string;
	},
	events: {
		type: string;
		startDate: string;
		endDate: string;
		submitter: {
			name: string;
			organization: string;
		},
		location: {
			type: string;
			details: string;
		},
		ageClass: string;
		samples: string;
	}
}

// the form actual request to be sent to the API
interface SearchRequest {
	keywords?: string[];
	minimumId?: string;
	maximumId?: string;
	namedDateRanges?: string[],
	creation?: {
		startDate?: string;
		endDate?: string;
	},
	status?: string;
	purpose?: string;
	requester?: {
		name?: string;
		organization?: string;
	},
	species?: string;
	region?: string;
	identifier?: {
		type?: string;
		details?: string;
	},
	events?: {
		type?: string;
		startDate?: string;
		endDate?: string;
		submitter?: {
			name?: string;
			organization?: string;
		},
		location?: {
			type?: string;
			details?: string;
		},
		ageClass?: string;
		samples?: string;
	}
}

function tokenizeKeywords(keywords: string): string[] {
	return _.uniq(keywords.match(/(?:[^\s"]+|"[^"]*")+/g))
}

// convert the internal state used by the form into an API request
export function getSearchRequestFromSearchFormState(formState: SearchFormState): SearchRequest {
	const transformed = {
		...formState,
		keywords: tokenizeKeywords(formState.keywords)
	}
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
	new FilterChipMapping('creation.startDate', 'Creation Start Date'),
	new FilterChipMapping('creation.endDate', 'Creation End Date'),
	new FilterChipMapping('namedDateRanges', 'Date Range', true),

	new FilterChipMapping('status', 'Status'),
	new FilterChipMapping('purpose', 'Purpose'),
	new FilterChipMapping('requester.name', 'Requester Name'),
	new FilterChipMapping('requester.organization', 'Requester Organization'),
	new FilterChipMapping('species', 'Species'),
	new FilterChipMapping('region', 'Region'),
	new FilterChipMapping('identifier.type', 'Identifier Type'),
	new FilterChipMapping('identifier.details', 'Identifier'),
	new FilterChipMapping('events.type', 'Event Type'),
	new FilterChipMapping('events.startDate', 'Event Start'),
	new FilterChipMapping('events.endDate', 'Event End'),
	new FilterChipMapping('events.submitter.name', 'Submitter Name'),
	new FilterChipMapping('events.submitter.organization', 'Submitter Organization'),
	new FilterChipMapping('events.location.type', 'Event Location Type'),
	new FilterChipMapping('events.location.details', 'Event Location'),
	new FilterChipMapping('events.location.ageClass', 'Event Age Class'),
	new FilterChipMapping('events.samples', 'Samples Collected?'),

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
