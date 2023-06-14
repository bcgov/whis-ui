import React, {useLayoutEffect, useRef, useState} from 'react';
import {Box, Button, Card, Grid, TextField, Typography} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import HidableSearchForm from './AdvancedSearchFields';
import SearchResults from './SearchResults';
import NewContactComponent from "./NewContactComponent";

const Search: React.FC = () => {

	const [advancedSearchExpand, setAdvancedSearchExpand] = useState(false);
	const [searchButtonPosition, setSearchButtonPosition] = useState(false);
	const [spacerProps, setSpacerProps] = useState({});
	const ref = useRef(null);

	useLayoutEffect(() => {
		const {height} = ref.current.getBoundingClientRect();
		if (advancedSearchExpand) {
			setSpacerProps({
				minHeight: `${height + 300}px`
			});
		} else {
			setSpacerProps({
				minHeight: 'auto'
			});
		}
	}, [ref.current, advancedSearchExpand]);

	return (
		<Box className="container" sx={spacerProps}>
			<Box className="pageHead">
				<Box className="mainTitle">
					<Typography variant="h1">Contact List</Typography>
					<Typography variant="h6">Search for existing contacts, add a new contact or edit one.</Typography>
				</Box>
				<NewContactComponent createHandler={() => {
				}}/>
			</Box>

			<Card className="paperStyle">
				<Box className="searchBar">
					<TextField
						label="Enter First Name or Last Name of a Contact or any Other Keywords"
						className="eventKeywords"
						required
						InputProps={{
							endAdornment: (
								<Button
									className="searchButton"
									sx={searchButtonPosition ? {display: 'none'} : {display: 'auto'}}
									variant={'contained'}
								>
									Search
								</Button>
							)
						}}
					/>
					<Button
						className="hideFilterButton"
						onClick={() => {
							setAdvancedSearchExpand(!advancedSearchExpand);
							setSearchButtonPosition(!searchButtonPosition);
						}}
					>
						{advancedSearchExpand ? (
							<>
								Hide Filters <FilterAltOutlinedIcon/>
							</>
						) : (
							<>
								Show Filters <FilterAltOutlinedIcon/>
							</>
						)}
					</Button>
				</Box>

				<Box ref={ref} className="filterForm" sx={{display: advancedSearchExpand ? 'box' : 'none'}}>
					<HidableSearchForm/>
				</Box>
				<Button className="searchButton" variant="outlined" sx={searchButtonPosition ? {display: 'auto'} : {display: 'none'}}>
					Clear
				</Button>
				<Button
					className="searchButton"
					sx={searchButtonPosition ? {display: 'auto'} : {display: 'none'}}
					variant={'contained'}
					onClick={() => {
						setAdvancedSearchExpand(false);
						setSearchButtonPosition(false);
					}}
				>
					Search
				</Button>
				<Grid container spacing={4} className="grid_absolute">
					<Grid container item xs={12} md={12} spacing={{lg: 2, xl: 3}} alignItems={'center'}>
						<Grid item xs={12} md={10.8}>
							<TextField
								label="Enter First Name or Last Name of a Contact or any Other Keywords"
								required
								InputProps={{
									endAdornment: (
										<Button className="searchButton" sx={searchButtonPosition ? {display: 'none'} : {display: 'auto'}} variant={'contained'}>
											Search
										</Button>
									)
								}}
							/>
						</Grid>
						<Grid item xs={12} md={1.2}>
							<Button
								className="hideFilterButton"
								onClick={() => {
									setAdvancedSearchExpand(!advancedSearchExpand);
									setSearchButtonPosition(!searchButtonPosition);
								}}
							>
								{advancedSearchExpand ? (
									<>
										Hide Filters <FilterAltOutlinedIcon />
									</>
								) : (
									<>
										Show Filters <FilterAltOutlinedIcon />
									</>
								)}
							</Button>
						</Grid>
					</Grid>
					<Grid container item spacing={4} ref={ref} className="filterForm" sx={{display: advancedSearchExpand ? 'box' : 'none'}}>
						<HidableSearchForm />
					</Grid>
					<Grid item xs={12} md={12}>
						<Button className="searchButton" variant="outlined" sx={searchButtonPosition ? {display: 'auto'} : {display: 'none'}}>
							Clear
						</Button>
						<Button
							className="searchButton"
							sx={searchButtonPosition ? {display: 'auto'} : {display: 'none'}}
							variant={'contained'}
							onClick={() => {
								setAdvancedSearchExpand(false);
								setSearchButtonPosition(false);
							}}
						>
							Search
						</Button>
					</Grid>
				</Grid>
			</Card>

			<SearchResults/>
		</Box>
	);
};
export default Search;
