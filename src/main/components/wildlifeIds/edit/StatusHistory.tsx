import React, { useState } from "react";
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import CodeLookup from "../../util/CodeLookup";

const StatusHistory = ({ history }) => {
	return (
		<>
			<Typography sx={{ fontSize: '16px' }}>History</Typography>
			<TableContainer>
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
							<TableCell>{`${h.changedAt}`}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TableContainer>
		</>
	);
}

export default StatusHistory;
