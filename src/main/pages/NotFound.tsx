import React from 'react';
import {mdiEmoticonConfused} from '@mdi/js';
import Icon from '@mdi/react';

const NotFound = () => {
	return (
		<div>
			<Icon path={mdiEmoticonConfused} title='Confused Icon' size={2}/>
			<span>Not Found</span>
		</div>
	);
};

export default NotFound;
