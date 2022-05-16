import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {useSelector} from "../../../state/utilities/use_selector";
import {
	ACQUIRE_GENERATION_LOCK_REQUEST,
	RELEASE_GENERATION_LOCK_REQUEST,
	RENEW_GENERATION_LOCK_REQUEST,
	TEST_GENERATION_LOCK_REQUEST
} from "../../../state/actions";
import {Button} from "@mui/material";

const GenerationLockWidget: React.FC = () => {
	const dispatch = useDispatch();

	const lockStatus = useSelector(state => state.GenerationLock)

	return (
		<>
			<p>Generation Lock Status:</p>
			<p>
				{JSON.stringify(lockStatus)}
			</p>
			<Button variant={"contained"} onClick={() => dispatch({type: TEST_GENERATION_LOCK_REQUEST})}>Refresh Status</Button>
			<Button variant={"contained"}  onClick={() => dispatch({type: ACQUIRE_GENERATION_LOCK_REQUEST})}>Acquire</Button>

			<Button variant={"contained"}  onClick={() => dispatch({type: RENEW_GENERATION_LOCK_REQUEST})}>Renew</Button>

			<Button variant={"contained"}  onClick={() => dispatch({type: RELEASE_GENERATION_LOCK_REQUEST})}>Release</Button>

		</>
	);
};

export default GenerationLockWidget;
