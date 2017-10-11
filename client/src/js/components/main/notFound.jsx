import React from 'react';
import '../../../styles/index.scss';

/**
 * 
 * @param {*} props
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
    <div className="center">
      <h2>Page Not Found</h2>
      <button onClick={goHome}>Go Home</button>
    </div>
  );
};

export default NotFound;
