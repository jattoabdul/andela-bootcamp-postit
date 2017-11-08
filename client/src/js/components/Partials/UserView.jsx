import React from 'react';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Pagination } from '../Partials';
import '../../../styles/index.scss';

/**
 * Compute classNames for and element
 * @param {*} val
 * @return {object} classNames
 */
const computeClass = val => classNames({
  link_disabled: val,
  channels: true
});


/**
 * Display UserView
 * @class UserView
 * @extends {React.Component}
 * @param {any} props
 */
class UserView extends React.Component {
  /**
   * Creates an instance of UserView
   * @param {any} props
   * @memberof UserView
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      scroll: true,
      searchQuery: ''
    };
    this.onSearchingUserInGroup = this.onSearchingUserInGroup.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  /**
   * componentDidMount Life Cycle Method
   * @param {void} null
   * @return {void} null
   */
  componentDidMount() {
    $('.modal').modal();
  }

  /**
   * onSearchUserInGroup Method
   * 
   * @param {object} event
   * 
   * @return {void}
   */
  onSearchingUserInGroup(event) {
    event.preventDefault();
    const id = this.props.currentGroup.id;
    const searchText = this.selectedUser.value;
    const page = 1;
    this.props.onSearchUserInGroup(id, searchText, page);
    this.setState({
      searchQuery: searchText
    });
  }

  /**
   * HandlePageClick Method
   * 
   * @param {object} page
   * 
   * @return {void}
   */
  handlePageClick(page) {
    const selectedPage = Math.ceil(page.selected * 2);
    const id = this.props.currentGroup.id;
    const searchText = this.state.searchQuery;
    this.props.onSearchUserInGroup(id, searchText, selectedPage);
  }

  /**
   * Render Method
   * @return {dom} DomElement
   */
  render() {
    return (
      <div className="white right col s1" id="usersScroll">
        <ul>
          {this.props.activeMessageReaders !== [] ? (
            this.props.activeMessageReaders.map(user => (
              <li key={user.id}>
                <div data-tip data-for={`gUser${user.id}`}>
                  <a>
                    <img
                      src={`https://robohash.org/${user.username}`}
                      alt={user.username}
                    />
                  </a>
                  <ReactTooltip
                    id={`gUser${user.id}`}
                    place="left"
                    type="info"
                    effect="float"
                  >
                    {`${user.username} - ${user.fullName}`}
                  </ReactTooltip>
                </div>
                <span
                  className="remove-user"
                  data-tip
                  data-for={`rmUser${user.id}`}
                >
                  <i
                    onClick={() => {
                      this.props.removeGroupMember(user.id);
                    }}
                    role="button"
                    tabIndex={-1}
                    className="icon ion-close-round rmUserIcon x1"
                  />
                </span>
                <ReactTooltip
                  id={`rmUser${user.id}`}
                  place="left"
                  type="warning"
                  effect="solid"
                >
                  {`Remove ${user.username} from group`}
                </ReactTooltip>
              </li>
            ))
          ) : (
            <li>
              <a>
                <img src="https://robohash.org/jatto" alt="jatto" />
              </a>
            </li>
          )}
        </ul>
        <span className="bottomSearch">
          <a
            data-tip
            data-for="addUserInGroup"
            className="modal-trigger"
            href="#modal1"
          >
            <i className="icon ion-person-add teal-text x25" />
          </a>
          <ReactTooltip
            id="addUserInGroup"
            place="left"
            type="info"
            effect="float"
          >
            Add a user to current group
          </ReactTooltip>
        </span>

        <div id="modal1" className="modal">
          <div className="modal-content">
            <h4 className="center teal-text">Add User to Group</h4>
            <form className="row">
              <div className="center col s12 m6 l6 input-field">
                <input
                  type="search"
                  id="add_user"
                  className="validate"
                  ref={(input) => {
                    this.selectedUser = input;
                  }}
                  onKeyUp={this.onSearchingUserInGroup}
                  placeholder="type username"
                />
                <label htmlFor="add_user">Add User</label>
              </div>
              <div className="col s12 m12 l12">
                <ul>
                  {this.props.selectedUsers.length >= 1 ?
                    this.props.selectedUsers.map(selectedUser => (<li
                      key={selectedUser.id}
                    >
                      <a
                        className={`${this.props.isSelected.includes(selectedUser.id) ? 'link_disabled' : ''} ${computeClass(
                          selectedUser.groups.map(group =>
                            group.id).includes(this.props.currentGroup.id))}`}
                        role="button"
                        tabIndex={-1}
                        onClick={
                          () => this.props.onAddUserToGroup(selectedUser.id)
                        }
                      >
                      @{selectedUser.username}
                      </a>
                      { selectedUser.groups.map(
                        group => group.id).includes(this.props.currentGroup.id) &&
                        <span
                          className="new badge"
                          data-badge-caption="Member"
                        />
                      }
                    </li>))
                    : <li />
                  }
                </ul>
                <Pagination
                  pageCount={this.props.totalPageCount}
                  handlePageClick={this.handlePageClick}
                />
              </div>
            </form>
          </div>
        </div>

      </div>
    );
  }
}

UserView.propTypes = {
  onAddUserToGroup: PropTypes.func.isRequired,
  totalPageCount: PropTypes.number,
  isSelected: PropTypes.PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]).isRequired,
  selectedUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeMessageReaders: PropTypes.arrayOf(PropTypes.object),
  removeGroupMember: PropTypes.func.isRequired,
  onSearchUserInGroup: PropTypes.func.isRequired,
  currentGroup: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ])
};

UserView.defaultProps = {
  currentGroup: {},
  activeMessageReaders: [],
  totalPageCount: 0
};


export default UserView;
