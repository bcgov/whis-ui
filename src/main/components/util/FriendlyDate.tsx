import React from 'react';
import moment from 'moment';

const FriendlyDate = ({value}) => {

	const formatString = 'yyyy-MM-DD';

	if (value == null) {
		return <></>;
	}

	return (
		<span className={'date'}>{moment(value).format(formatString)}</span>
	);
};

export default FriendlyDate;
