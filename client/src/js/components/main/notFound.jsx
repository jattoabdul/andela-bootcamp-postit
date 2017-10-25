import React from 'react';
import notFoundError from './../../../assets/img/404error.gif';
import '../../../styles/index.scss';

/**
 * Display NotFound
 * @param {any} props
 * @return {dom} DomeElement 
 */
const NotFound = ({ history, handlePageNotFound }) => {
  /**
   * @return {void} void
   */
  const goHome = () => {
    history.push('/');
  };

  return (
    <div id="indexContainer" className="teal lighten-5">
      <div id="mainContainer" className="row">
        <div className="col s12 m6 indexSideOne hide-on-small-only">
          <h3 className="center-align">
            <i className="icon ion-speakerphone" /> POSTiT
          </h3>
          <br />
          <p className="flow-text center-align">
            Page Not Found
          </p>
          <br />
          <img
            className="notFoundImage"
            src={notFoundError}
            alt="page not found"
          />
        </div>
        <div className="col s12 m6 indexSideTwo flexCentered">
          <h3 className="alt-logo center-align">
            <i className="icon ion-speakerphone" /> POSTiT
          </h3>
          <div className="home-mobile">
            <p className="flow-text">Lost?... Go Home</p>
            <button
              className="btn cyan waves-effect waves-light"
              onClick={goHome}
            >
              Go Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
