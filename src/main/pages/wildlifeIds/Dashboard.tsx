import React from 'react';
import {Link} from "react-router-dom";

const Dashboard: React.FC = () => {
  return (
    <>
      <h2>Wildlife IDs Dashboard</h2>
      <Link to={'/wildlifeIds/list'}>List Existing IDs</Link><br/>
      <Link to={'/wildlifeIds/generate'}>Generate New IDs</Link>
    </>
  )
};

export default Dashboard;
