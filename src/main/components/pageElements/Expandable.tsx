import {Card, Collapse, IconButton, Paper} from '@mui/material';
import React, {useEffect, useState} from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const ExpandableTitle = ({children}) => {
	return children;
};
ExpandableTitle.displayName = 'Expandable.Title';

const ExpandableDetail = ({children}) => {
	return children;
};
ExpandableDetail.displayName = 'Expandable.Detail';

export interface ExpansionOverrideEvent {
	event: 'expandAll' | 'collapseAll' | 'none';
	id: number;
}

const Expandable = ({children, initiallyExpanded = false, expansionEvent = {event: 'none', id: 0}, expansionCardsClassName}) => {
	const [expanded, setExpanded] = useState(initiallyExpanded);

	useEffect(() => {
		if (!expansionEvent) return;

		if (expansionEvent.event === 'expandAll') {
			setExpanded(true);
		}
		if (expansionEvent.event === 'collapseAll') {
			setExpanded(false);
		}
	}, [expansionEvent]);

	function renderTitle() {
		return (
			<>
				{React.Children.map(children, c => {
					if (c.type?.displayName === 'Expandable.Title') {
						return c;
					}
					return null;
				})}
			</>
		);
	}

	function renderDetail() {
		return (
			<>
				{React.Children.map(children, c => {
					if (c.type?.displayName === 'Expandable.Detail') {
						return c;
					}
					return null;
				})}
			</>
		);
	}

	return (
		<>
			<Card className={expansionCardsClassName}>
				{renderTitle()}
				<IconButton
					className="expand_icon"
					disableRipple
					onClick={() => {
						setExpanded(!expanded);
					}}
				>
					{expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
				</IconButton>
			</Card>
			<Collapse in={expanded} aria-expanded={expanded}>
				<Paper className="expand_paper">{renderDetail()}</Paper>
			</Collapse>
		</>
	);
};

Expandable.Title = ExpandableTitle;
Expandable.Detail = ExpandableDetail;

export default Expandable;
