import React from 'react';
import {Route} from 'react-router';
import Dashboard from '../pages/wildlifeIds/Dashboard';
import List from '../pages/wildlifeIds/List';
import Generate from '../pages/wildlifeIds/Generate';
import CodeTables from "../pages/admin/CodeTables";

const AdminRoutes = [
	<Route path="/admin/codeTables" element={<CodeTables />} />,
	// <Route path="/admin/codeTables" element={}>
];
export default AdminRoutes;
