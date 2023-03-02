import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useSelector} from '../../../../state/utilities/use_selector';
import {ACQUIRE_GENERATION_LOCK_REQUEST, RELEASE_GENERATION_LOCK_REQUEST} from '../../../../state/actions';
import {Box, Typography} from '@mui/material';
import {LockSharp} from '@mui/icons-material';

const GenerationLockWidget: React.FC = () => {
	const dispatch = useDispatch();

	const lockStatus = useSelector(state => state.GenerationLock);

	useEffect(() => {
		dispatch({type: ACQUIRE_GENERATION_LOCK_REQUEST});
		return () => {
			dispatch({type: RELEASE_GENERATION_LOCK_REQUEST});
		};
	}, [dispatch]);

	if (!lockStatus.initialized) {
		return null;
	}

	if (!lockStatus.status?.lockHolder?.isSelf) {
		return (
			<Box className="lockWidget">
				<LockSharp color={'error'} fontSize={'large'} />
				<Typography color={'error'}>The lock is held by {lockStatus.status?.lockHolder?.email}</Typography>
			</Box>
		);
	}

	return (
		<Box className="lockWidget">
			<LockSharp color={'primary'} fontSize={'large'} /> Exclusive Lock Held
		</Box>
	);
};

export default GenerationLockWidget;
