import React from 'react';
import '../../styles/components/loading.scss';
import Icon from '@mdi/react';
import {mdiLoading} from '@mdi/js';

const Loading: React.FC = () => (
	<div>
		<Icon path={mdiLoading} title='Loading' spin size={2}/>
		<span>Loading...</span>
	</div>
);

export default Loading;
