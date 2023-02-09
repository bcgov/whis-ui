import React, { useState } from "react";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CodeLookup from "../../util/CodeLookup";
import FriendlyDate from "../../util/FriendlyDate";

const StatusHistory = ({ history }) => {
	return (
		<>
			<Typography className="detailsSubtitle">History</Typography>
			<TableContainer className="historyTable">
				<TableHead>
					<TableRow>
						<TableCell>Status</TableCell>
						<TableCell>Reason</TableCell>
						<TableCell>Date</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{history.map((h, i) => (
						<TableRow key={i}>
							<TableCell>
								<CodeLookup codeTable={'status'} code={h.status} />
							</TableCell>
							<TableCell>{h.reason}</TableCell>
							<TableCell><FriendlyDate value={h.changedAt}/></TableCell>
						</TableRow>
					))}
				</TableBody>
			</TableContainer>
		</>
	);
}

export default StatusHistory;
