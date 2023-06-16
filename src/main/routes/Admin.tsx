import React from 'react';
import {Route} from 'react-router';
import CodeTables from "../pages/admin/CodeTables";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminDashboard from '../pages/admin/AdminDashboard';

const AdminRoutes = [
	<Route key='/admin' path='/admin' element={<DefaultLayout><AdminDashboard/></DefaultLayout>}/>,
	<Route key='/admin/codeTables' path='/admin/codeTables' element={<DefaultLayout><CodeTables/></DefaultLayout>}/>,
];
export default AdminRoutes;
