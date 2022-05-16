import React from 'react';
import {Route} from 'react-router';
import Dashboard from '../pages/wildlifeIds/Dashboard';
import List from '../pages/wildlifeIds/List';
import Generate from '../pages/wildlifeIds/Generate';
import DefaultLayout from "../layouts/DefaultLayout";

const WildlifeIdRoutes = [
	<Route path="/wildlifeIds" element={<DefaultLayout showNavigation={false}><Dashboard/></DefaultLayout>}/>,
	<Route path="/wildlifeIds/list" element={<DefaultLayout><List/></DefaultLayout>}/>,
	<Route path="/wildlifeIds/generate" element={<DefaultLayout><Generate/></DefaultLayout>}/>
];
export default WildlifeIdRoutes;
