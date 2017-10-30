import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUserGroups, createGroup } from '../../actions/groupAction';
import '../../../styles/index.scss';

/**
 * @typedef {object} event
 */

/**
 * Display CreateGroupBoard
 * @class CreateGroupBoard
 * @extends {React.Component}
 * @param {any} props
 */
class CreateGroupBoard extends React.Component {
  /**
   * Creates an instance of CreateGroupBoard
   * @param {any} props
   * @memberof CreateGroupBoard
   * @return {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      name: '',
      desc: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onCreateGroup = this.onCreateGroup.bind(this);
  }

  /**
   * onChange Method
   * @param {event} event
   * @return {void} 
   */
  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  /**
   * onCreateGroup Method
   * @param {event} event
   * @return {void}
   */
  onCreateGroup(event) {
    event.preventDefault();
    const { name, desc } = this.state;
    if (name === '') {
      // eslint-disable-next-line
      Materialize.toast('name cannot be empty', 2000);
    }
    if (desc === '') {
      // eslint-disable-next-line
      Materialize.toast('desc cannot be empty', 2000);
    }
    // making calls to the create group API endpoint
    this.props.createGroup(name, desc).then((item) => {
      if (item) {
        this.props.fetchUserGroups();
        // redirect
        // eslint-disable-next-line
        this.props.history.push(`/dashboard/${item.id}/addusertogroup`);
      } else {
        // eslint-disable-next-line
        Materialize.toast('Group Already Exists', 2000);
      }
    });
  }

  /**
   * Render Method
   * @return {dom} DomElement
   */
  render() {
    return (
      <div>
        <br />
        <div id="chatArea" className="white-text row padTop">
          <div className="container centerContainerForForms">
            <div className="card-panel formPanel">
              <form onSubmit={this.onCreateGroup} className="centerForm">
                <div className="input-field col s12">
                  <input
                    type="text"
                    name="name"
                    id="group_name-create"
                    value={this.state.name}
                    onChange={this.onChange}
                    pattern="(?=^.{6,20}$).*$"
                    title="6 to 20 characters required"
                    required
                  />
                  <label htmlFor="group_name-create">Group Name</label>
                </div>
                <div className="input-field col s12">
                  <textarea
                    name="desc"
                    value={this.state.desc}
                    onChange={this.onChange}
                    id="group_desc-create"
                    className="materialize-textarea"
                    pattern="(?=^.{0,150}$).*$"
                    title="maximum of 150 characters allowed"
                    required
                  />
                  <label htmlFor="group_desc-create">Group Description</label>
                </div>
                <div className="col s12">
                  <p className="center">
                    <button
                      className="btn-large waves-effect waves-light"
                      type="submit"
                    >
                      Create Group
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateGroupBoard.propTypes = {
  createGroup: PropTypes.func,
  fetchUserGroups: PropTypes.func
};

const mapDispatchToProps = {
  createGroup,
  fetchUserGroups
};

export default connect(null, mapDispatchToProps)(withRouter(CreateGroupBoard));
