import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import '../../../styles/index.scss';

/**
 * Display SideMenu
 * @class SideMenu
 * @extends {React.Component}
 * @param {any} props
 */
class SideMenu extends React.Component {
  /**
   * Creates an instance of SideMenu
   * @param {any} props
   * @memberof SideMenu
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      userGroups: null,
      currentGroup: null,
      username: props.username || '',
      fullName: props.fullName || '',
      activeClassList: false,
      activeClassAnchor: false
    };
  }

  /**
   * ComponentWillReceiveProps Life Cycle Method
   * @param {object} nextProps
   * @return {void}
   */
  componentWillReceiveProps(nextProps) {
    const { username, fullName, userGroups, currentGroup } = nextProps;
    this.setState({
      userGroups: !isEmpty(userGroups) ? userGroups : null,
      currentGroup: !isEmpty(currentGroup) ? currentGroup : null,
      username: username ? username : '',
      fullName: fullName ? fullName : ''
    });
  }

  /**
   * openNextMessageBoard Method
   * @param {object} userGroup
   * @return {void}
   */
  openNextMessageBoard(userGroup) {
    const { currentGroup } = this.state;
    // get the crrentGroup Id from the location and strip out the url
    const path = this.props.location.pathname;
    const currGroupId = currentGroup && currentGroup.id;
    const isloadedMessages = !!path.match('/dashboard/message');
    if (!isloadedMessages) {
      this.props.handleOpenMessageBoard(userGroup);
    } else if (isloadedMessages && currGroupId !== userGroup.id) {
      this.props.handleOpenMessageBoard(userGroup);
    }
  }

  /**
   * Render Method
   * @return {dom} DomElement
   */
  render() {
    const {
      username,
      fullName,
      currentGroup
    } = this.state;
    return (
      <div
        id="roomsView"
        className={`col s2 m3 l2 blue-grey darken-4 white-text ${this.props
          .sideNavStatus
          ? ''
          : 'hidden'}`}
      >
        <div className="right-align">
          <i
            onClick={this.props.toggleSideNav}
            id="side-back-navic"
            role="button"
            tabIndex={-1}
            className="icon ion-ios-undo-outline x3 waves-effect waves-light"
          />
        </div>
        <img
          className="profilePic"
          src={`https://robohash.org/${username}`}
          alt="Profile"
        />
        <p className="flow-text center profileName">
          {fullName}
          <small>
            <br />
            <a href="" className="username">
              @{username}
            </a>
          </small>
        </p>
        <br />
        <h4 className="sideheading">
          Groups <i className="icon ion-ios-people" />
          <Link to="/dashboard/create-group">
            <i
              className="icon ion-plus-circled channels right"
              data-tip
              data-for="gCreate"
            />
            <ReactTooltip
              id="gCreate"
              place="right"
              type="info"
              effect="float"
            >
              Create New Group
            </ReactTooltip>
          </Link>
        </h4>
        <ul>
          {this.props.userGroups !== null
            ? this.props.userGroups.map(userGroup => (
              <li
                className={
                  currentGroup && userGroup.id === currentGroup.id
                    ? 'channels activeChannel'
                    : 'channels'
                }
                key={userGroup.id}
              >
                <a
                  className={
                    currentGroup && userGroup.id === currentGroup.id
                      ? 'white-text'
                      : 'wheat-text'
                  }
                  role="button"
                  tabIndex={-1}
                  onClick={() => this.openNextMessageBoard(userGroup)}
                >
                  {userGroup.name}
                </a>
              </li>
            ))
            : this.state.userGroups}
        </ul>
        <div className="buttomNavs container">
          <a
            onClick={() => this.props.handleLogout()}
            role="button"
            tabIndex={-1}
            className={`right channels ${this.props
              .sideNavStatus
              ? ''
              : 'hide'}`}
          >
            <i className="icon ion-android-exit" />
          </a>
        </div>
      </div>
    );
  }
}

SideMenu.propTypes = {
  handleLogout: PropTypes.func,
  userGroups: PropTypes.arrayOf(PropTypes.object),
  handleOpenMessageBoard: PropTypes.func,
  toggleSideNav: PropTypes.func,
  sideNavStatus: PropTypes.bool,
  username: PropTypes.string,
  fullName: PropTypes.string,
  currentGroup: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  location: PropTypes.objectOf(PropTypes.string).isRequired
};

SideMenu.defaultProps = {
  handleLogout: () => {},
  userGroups: [],
  handleOpenMessageBoard: () => {},
  toggleSideNav: () => {},
  sideNavStatus: '',
  username: '',
  fullName: '',
  currentGroup: {}
};

export default withRouter(SideMenu);
