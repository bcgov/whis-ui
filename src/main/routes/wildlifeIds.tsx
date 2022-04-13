import React from 'react';
import {Route} from 'react-router';
import Dashboard from '../pages/wildlifeIds/Dashboard';
import List from '../pages/wildlifeIds/List';
import Generate from '../pages/wildlifeIds/Generate';

const WildlifeIdRoutes = [
	<Route path="/wildlifeIds" element={<Dashboard />} />,
	<Route path="/wildlifeIds/list" element={<List />} />,
	<Route path="/wildlifeIds/generate" element={<Generate />} />
];
export default WildlifeIdRoutes;
