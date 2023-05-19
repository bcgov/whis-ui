import CodeTables from "../../main/pages/admin/CodeTables";
import {CODE_TABLES_LOAD_REQUEST, CODE_TABLES_LOAD_REQUEST_COMPLETE, CODE_TABLES_LOAD_REQUEST_ERROR} from "../actions";

export interface Code {
	name: string,
	code: string | number,
}

export interface CodeTable {
	name: string;
	displayed_name: string;
	codes: Code[]
}

export interface CodeTables {
	initialized: boolean;
	error: boolean;
	tables: { [key: string]: CodeTable };
}

function createCodeTablesReducer() {

	const initialState: CodeTables = {
		tables: {},
		initialized: false,
		error: false
	}

	return (state = initialState, action) => {
		switch (action.type) {
		case CODE_TABLES_LOAD_REQUEST:
			return {
				...state,
				initialized: false
			};
		case CODE_TABLES_LOAD_REQUEST_COMPLETE:
			return {
				...state,
				tables: {...action.payload},
				error: false,
				initialized: true
			};
		case CODE_TABLES_LOAD_REQUEST_ERROR:
			return {
				...state,
				tables: [],
				error: true,
				initialized: false
			};
		}

		return state;
	};
}

const selectCodeTables: (state) => CodeTables = (state) => state.CodeTables;

export {createCodeTablesReducer, selectCodeTables};
