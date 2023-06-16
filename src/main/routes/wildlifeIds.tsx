import React from 'react';
import {Route} from 'react-router';
import Dashboard from '../pages/Dashboard';
import List from '../pages/wildlifeIds/List';
import Inventory from '../pages/wildlifeIds/Inventory';
import Generate from '../pages/wildlifeIds/Generate';
import DefaultLayout from "../layouts/DefaultLayout";
import Detail from "../pages/wildlifeIds/Detail";
import Edit from "../pages/wildlifeIds/Edit";
import ActionManagement from '../pages/wildlifeIds/ActionManagement';
import EditMultiple from '../pages/wildlifeIds/EditMultiple';
import ContactList from '../pages/ContactList';

const WildlifeIdRoutes = [
	<Route key='/wildlifeIds' path='/wildlifeIds' element={<DefaultLayout showNavigation={true}><Dashboard/></DefaultLayout>}/>,
	<Route key='/wildlifeIds/list' path='/wildlifeIds/list' element={<DefaultLayout><List/></DefaultLayout>}/>,
	<Route key='/wildlifeIds/inventory' path='/wildlifeIds/inventory' element={<DefaultLayout><Inventory/></DefaultLayout>}/>,
	<Route key='/wildlifeIds/generate' path='/wildlifeIds/generate' element={<DefaultLayout><Generate/></DefaultLayout>}/>,
	<Route key='/wildlifeIds/detail/:id' path='/wildlifeIds/detail/:id' element={<DefaultLayout><Detail/></DefaultLayout>}/>,
	<Route key='/wildlifeIds/edit/:id' path='/wildlifeIds/edit/:id' element={<DefaultLayout><Edit/></DefaultLayout>}/>,
	<Route key='/wildlifeIds/multiEdit' path='/wildlifeIds/multiEdit' element={<DefaultLayout><EditMultiple/></DefaultLayout>}/>,
	<Route key='/wildlifeIds/actionManagement' path='/wildlifeIds/actionManagement' element={<DefaultLayout><ActionManagement/></DefaultLayout>}/>,
	<Route key='/contacts' path='/contacts' element={<DefaultLayout><ContactList/></DefaultLayout>}/>,
];
export default WildlifeIdRoutes;
