import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchUserGroups,createGroup } from '../../actions/groupAction';
import '../../../styles/index.scss';

class CreateGroupBoard extends React.Component {
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

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // OnCreateGroup Method
  onCreateGroup(e) {
    e.preventDefault();
    let { name, desc } = this.state;
    console.log('creategroup param', name, desc)
    if (name === '') {
      console.log('name cannot be empty');
    }
    if (desc === '') {
      console.log('desc cannot be empty');
    }
    // making calls to the create group API endpoint
    this.props.createGroup(name, desc).then((item) => {
      this.props.fetchUserGroups();
      //redirect
      this.props.history.push(`/dashboard/${item.id}/addusertogroup`);
    })
  }
  render() {
    return (
      <div>
        <br />
        <div id="chatArea" className="white-text row padTop">
          <div className="container centerContainerForForms">
            <div className="card-panel formPanel">
              <form
                onSubmit={this.onCreateGroup}
                className="centerForm">
                <div className="input-field col s12">
                  <input
                  type="text"
                  name="name"
                  id="group_name-create"
                  value={this.state.name}
                  onChange={this.onChange}
                  pattern="(?=^.{6,20}$).*$"
                  required />
                  <label htmlFor="group_name-create">Group Name</label>
                </div>
                <div className="input-field col s12">
                  <textarea
                    name="desc"
                    value={this.state.desc}
                    onChange={this.onChange}
                    id="group_desc-create"
                    className="materialize-textarea"
                    pattern="(?=^.{0,150}$).*$">
                  </textarea>
                  <label htmlFor="group_desc-create">
                    Group Description
                  </label>
                </div>
                <div className="col s12">
                  <p className="center">
                    <button
                      className="btn-large waves-effect waves-light"
                      type="submit">
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
}

const mapDispatchToProps = {
  createGroup,
  fetchUserGroups
}

// function mapStateToProps({ authData, groupData }){
//   return {
//       authData,
//       groupData
//   }
// }

export default connect(null, mapDispatchToProps)(withRouter(CreateGroupBoard));
