import React from 'react';
import {Route} from 'react-router';
import Dashboard from '../pages/wildlifeIds/Dashboard';
import List from '../pages/wildlifeIds/List';
import Generate from '../pages/wildlifeIds/Generate';
import DefaultLayout from "../layouts/DefaultLayout";
import Detail from "../pages/wildlifeIds/Detail";

const WildlifeIdRoutes = [
	<Route path="/wildlifeIds" element={<DefaultLayout showNavigation={true}><Dashboard/></DefaultLayout>}/>,
	<Route path="/wildlifeIds/list" element={<DefaultLayout><List/></DefaultLayout>}/>,
	<Route path="/wildlifeIds/generate" element={<DefaultLayout><Generate/></DefaultLayout>}/>,
	<Route path="/wildlifeIds/:id" element={<DefaultLayout><Detail/></DefaultLayout>}/>
];
export default WildlifeIdRoutes;
