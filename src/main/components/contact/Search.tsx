import React, {useLayoutEffect, useRef, useState} from 'react';
import '../../styles/search.scss'
import {Box, Button, Card, TextField, Typography} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import HidableSearchForm from './AdvancedSearchFields';
import SearchResults from './SearchResults';
import NewContactDialog from './NewContactDialog';
import {Add} from '@mui/icons-material';


const Search: React.FC = () => {

	const [addContactDialog, setAddContactDialog] = useState(false);
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
					<Typography variant="h6">Search for the existing contacts, add a new contact or edit one.</Typography>
				</Box>
				<Button
					variant={'contained'}
					onClick={() => {
						setAddContactDialog(true);
					}}
				>
					<Add /> Add New Contact
				</Button>
				<NewContactDialog
					open={addContactDialog}
					title={'Add New Contact'}
					updateAction={(contact) => {
						console.dir(contact);
						setAddContactDialog(false);
					}}
					cancelAction={() => {
						setAddContactDialog(false);
					}}
					buttonText={'Add'}
					confirmTitle={'Add Contact Confirmation'}
					confirmContent={'You will create a new contact list entry. Proceed?'}
				/>
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
								Hide Filters <FilterAltOutlinedIcon />
							</>
						) : (
							<>
								Show Filters <FilterAltOutlinedIcon />
							</>
						)}
					</Button>
				</Box>

				<Box ref={ref} className="filterForm" sx={{display: advancedSearchExpand ? 'box' : 'none'}}>
					<HidableSearchForm />
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
			</Card>

			<SearchResults />
		</Box>
	);
};
export default Search;
