import React from 'react';
import '../../styles/updateID.scss';

const Display = ({wildlifeId}) => {
	return (
		<pre>
				{JSON.stringify(wildlifeId, null, 2)}
			</pre>
	)
};
export default Display;
