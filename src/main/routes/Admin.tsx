import React from 'react';
import {Route} from 'react-router';
import CodeTables from "../pages/admin/CodeTables";
import Years from "../pages/admin/Years";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminDashboard from '../pages/admin/AdminDashboard';

const AdminRoutes = [
	<Route path='/admin' element={<DefaultLayout><AdminDashboard/></DefaultLayout>}/>,
	<Route path='/admin/codeTables' element={<DefaultLayout><CodeTables/></DefaultLayout>}/>,
	<Route path='/admin/years' element={<DefaultLayout><Years/></DefaultLayout>}/>,
];
export default AdminRoutes;
