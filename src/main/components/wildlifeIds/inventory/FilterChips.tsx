import {Box, Chip, Stack, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, {useEffect, useState} from "react";
import {useSelector} from "../../../../state/utilities/use_selector";
import {useDispatch} from "react-redux";
import _ from 'lodash';
import {getChipsFromSearchRequest, SearchFilterChip} from "../../../../state/utilities/search_api";
import {SEARCH_CLEAR, SEARCH_DELETE_CHIP, SEARCH_RESET} from "../../../../state/actions";

const FilterChips = () => {
	const {searchRequest} = useSelector(state => state.Search);
	const dispatch = useDispatch();
	const [chips, setChips] = useState<SearchFilterChip[]>([]);

	useEffect(() => {
		setChips(getChipsFromSearchRequest(searchRequest));
	}, [searchRequest]);


	if (chips.length === 0) {
		return null;
	}

	return (

		<Box className="filters">
			<Typography className="filters_title">Filters</Typography>
			<Stack direction="row" justifyContent={'space-between'}>
				<Stack direction="row" className="chips_container">
					{chips.map((c) => (
						<Chip key={c.objectPath} label={`${c.name}: ${c.value}`} onDelete={() => {
							dispatch({
								type: SEARCH_DELETE_CHIP,
								payload: {
									chip: c
								}
							})
						}
						} className="filter_chips" deleteIcon={<CloseIcon/>}/>))}
				</Stack>
				<Chip label="Clear all" onClick={() => {
					dispatch({
						type: SEARCH_RESET
					})
				}
				} className="clear_filters"/>
			</Stack>
		</Box>

	);
}

export {FilterChips};
