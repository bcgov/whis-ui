import React from 'react';
import {Route} from 'react-router';
import Dashboard from '../pages/wildlifeIds/Dashboard';
import List from '../pages/wildlifeIds/List';
import Inventory from '../pages/wildlifeIds/Inventory';
import Generate from '../pages/wildlifeIds/Generate';
import DefaultLayout from "../layouts/DefaultLayout";
import Detail from "../pages/wildlifeIds/Detail";
import Edit from "../pages/wildlifeIds/Edit";
import ActionManagement from '../pages/wildlifeIds/ActionManagement';
import EditMultiple from '../pages/wildlifeIds/EditMultiple';
import ContactList from '../pages/wildlifeIds/ContactList';

const WildlifeIdRoutes = [
	<Route path='/wildlifeIds' element={<DefaultLayout showNavigation={true}><Dashboard/></DefaultLayout>}/>,
	<Route path='/wildlifeIds/list' element={<DefaultLayout><List/></DefaultLayout>}/>,
	<Route path='/wildlifeIds/inventory' element={<DefaultLayout><Inventory/></DefaultLayout>}/>,
	<Route path='/wildlifeIds/generate' element={<DefaultLayout><Generate/></DefaultLayout>}/>,
	<Route path='/wildlifeIds/detail/:id' element={<DefaultLayout><Detail/></DefaultLayout>}/>,
	<Route path='/wildlifeIds/edit/:id' element={<DefaultLayout><Edit/></DefaultLayout>}/>,
	<Route path='/wildlifeIds/multiEdit' element={<DefaultLayout><EditMultiple/></DefaultLayout>}/>,
	<Route path='/wildlifeIds/actionManagement' element={<DefaultLayout><ActionManagement/></DefaultLayout>}/>,
	<Route path='/wildlifeIds/contact' element={<DefaultLayout><ContactList/></DefaultLayout>}/>,
];
export default WildlifeIdRoutes;
