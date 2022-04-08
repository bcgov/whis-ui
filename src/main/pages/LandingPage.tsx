import React from 'react';
import {connect} from 'react-redux';

interface ILandingPage {
  bestName: string;
}

const LandingPage: React.FC<ILandingPage> = (props) => {
  const {bestName} = props;

  return (
    <div>
      <h1>Welcome to WHIS, {bestName}</h1>
      <p>Use the navigation links on the left to access site functions.</p>
    </div>
  )

};

const mapStateToProps = (state) => {
  const mappedProps = {
    bestName: state.Auth.bestName,
  };

  return mappedProps;
}


export default connect(mapStateToProps, null)(LandingPage);
