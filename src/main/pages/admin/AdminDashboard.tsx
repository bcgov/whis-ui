import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

import '../../styles/dashboard.scss';
import {useSelector} from "../../../state/utilities/use_selector";
import {Card} from "@mui/material";


const AdminDashboard: React.FC = () => {

	return (
		<>
			<Link to={'codeTables'}>Code Tables</Link>
			<br/>
			<Link to={'years'}>Years</Link>
		</>
	)

};

export default AdminDashboard;
