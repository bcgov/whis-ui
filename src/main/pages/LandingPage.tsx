import React, {useEffect, useState} from 'react';
import {useSelector} from "../../state/utilities/use_selector";
import {useAPI} from "../hooks/useAPI";
import FriendlyTime from "../components/util/FriendlyTime";
import {Link} from "@mui/material";


const LandingPage: React.FC = () => {

	const bestName = useSelector(state => state.Auth.bestName);
	const roles = useSelector(state => state.Auth.roles);

	const api = useAPI();

	const [accessRequest, setAccessRequest] = useState(null);
	const [working, setWorking] = useState(false);
	const [sent, setSent] = useState(false);

	async function checkAccessRequest() {
		setWorking(true);
		try {
			const result = await api.getAccessRequestStatus();
			setAccessRequest(result);
		} finally {
			setWorking(false);
		}
	}

	useEffect(() => {
		checkAccessRequest();
	}, [sent, roles])

	async function sendAccessRequest() {
		setWorking(true);
		try {
			await api.sendAccessRequest();
			setSent(true);
		} finally {
			setWorking(false);
		}
	}

	return (
		<div>
			<h1>Welcome to WHIS, {bestName}</h1>
			{roles.length === 0 && (
				<>
					<p>You do not currently have roles granted to access this application.</p>
					{(accessRequest === null && !sent) && (
						<>
							{!working && (<Link onClick={() => sendAccessRequest()}>Click here to request access</Link>)}
							{working && (<p>...working</p>)}
						</>
					)}
					{accessRequest !== null &&
						<p>Your access request status is <strong>{accessRequest.status}</strong> as of <FriendlyTime from time value={accessRequest.update_time}/></p>}
				</>
			)}
			{roles.length > 0 && (
				<>
					<p>Your assigned roles: <strong>[{roles.join(',')}]</strong></p>
					<p>Use the navigation links on the left to access site functions.</p>
				</>
			)}
		</div>
	);
};

export default LandingPage;
