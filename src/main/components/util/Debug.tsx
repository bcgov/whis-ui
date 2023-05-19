import React from 'react';
import '../../styles/components/loading.scss';
import {useSelector} from "../../../state/utilities/use_selector";

const Debug = ({item, title = 'Debug info'}) => {
	const {devMode} = useSelector(state => state.Configuration);
	if (!devMode) {
		return null;
	}

	return (
		<>
			<p>{title}</p>
			<pre className={'debug'}>{JSON.stringify(item, null, 1)}</pre>
		</>
	);
}

export default Debug;
