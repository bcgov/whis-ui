import React from 'react';
import {Link} from 'react-router-dom';

import '../../styles/dashboard.scss';


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
