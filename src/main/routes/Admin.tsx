import React from 'react';
import {Route} from 'react-router';
import CodeTables from "../pages/admin/CodeTables";
import Years from "../pages/admin/Years";

const AdminRoutes = [
	<Route path="/admin/codeTables" element={<CodeTables />} />,
	<Route path="/admin/years" element={<Years />} />,
];
export default AdminRoutes;
