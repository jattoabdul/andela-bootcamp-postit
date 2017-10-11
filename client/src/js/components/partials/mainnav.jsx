import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../../styles/index.scss';

/**
 * @class MainNav
 */
class MainNav extends React.Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      navOpen: true
    };
  }

  /**
   *
   * @return {dom} DomElement
   */
  render() {
    return (
      <nav className="blue-grey darken-4">
        <div className="nav-wrapper">
          <div className="left-align">
            <i
              onClick={this.props.toggleSideNav}
              id="main-navic"
              role="button"
              tabIndex={-1}
              className="icon ion-navicon x3 waves-effect waves-light"
            />
          </div>
          <Link to="/dashboard" className="brand-logo center">
            POSTiT
            <i className="icon ion-speakerphone left x2" />
            <sub>
              <small className="hide-on-small-only">
                you dont have to shout, just POSTiT
              </small>
            </sub>
          </Link>
        </div>
      </nav>
    );
  }
}

MainNav.propTypes = {
  toggleSideNav: PropTypes.func.isRequired
};

export default MainNav;
