import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../../../styles/index.scss';

/**
 * Display MainNav
 * @class MainNav
 * @extends {React.Component}
 * @param {any} props
 */
class MainNav extends React.Component {
  /**
   * Creates an instance of MainNav
   * @param {any} props
   * @memberof MainNav
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      navOpen: true
    };
  }

  /**
   * @param {void} null
   * @return {void} null
   */
  componentDidMount() {
    $('.dropdown-button').dropdown();
  }

  /**
   * Render Method
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
          <div className="right-align">
            <i
              id="mainavic-option"
              role="button"
              tabIndex={-1}
              data-activates="dropdown1"
              className="dropdown-button icon ion-android-more-vertical x3 waves-effect waves-light"
            />
            <ul
              id="dropdown1"
              className="dropdown-content"
            >
              <li>
                <a
                  onClick={() => this.props.handleLogout()}
                  role="button"
                  tabIndex={-1}
                  className="channels"
                >
                  <i className="icon ion-android-exit" />
                  logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

MainNav.propTypes = {
  toggleSideNav: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired
};

export default MainNav;
