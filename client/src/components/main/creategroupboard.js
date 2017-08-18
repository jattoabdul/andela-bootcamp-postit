import React from "react";
// import withRouter from "react-router-dom";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
import Api from "../../utils/api";
import { SideMenu, MainNav } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/CreateGroupBoard.css"; // CreateGroupBoard.scss

/**
 * Create Group Component Class that extends React.Component
 * @class CreateGroupBoard
 * @param {object} props
 * @returns {object} returns an object with methods
 */
class CreateGroupBoard extends React.Component {
  /**
   * Constructor function
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.onCreateGroup = this.onCreateGroup.bind(this);
    this.state = {
      error: ""
    };
  }

    /**
     * OnCreateGroup Method
     * method to search for users
     * @param {event} e
     * @returns {object} returns a group object
     */
  onCreateGroup(e) {
    e.preventDefault();
    if (this.name.value === "") {
      console.log("name cannot be empty");
    }
    if (this.desc.value === "") {
      console.log("desc cannot be empty");
    }
    console.log(`${this.name.value} --- ${this.desc.value}
        ---- ${this.selectedUsers} array (potential group members) `);
    // checking if user is logged in
    if (sessionStorage.getItem("user") === null) {
      window.location = "/login";
    }
    const groupCreateParams = `name=${this.name.value}&desc=${this.desc.value}`;
    // making calls to the create group API endpoint
    Api(groupCreateParams, "/api/groups/", "POST").then(
        (createGroupResponse) => {
          console.log(createGroupResponse);
          const groupId = createGroupResponse.group.id;
        //   window.location = `/dashboard/${groupId}/addusertogroup`;
          this.props.history.push(`/dashboard/${groupId}/addusertogroup`);
        }
    );
  }

    /**
     * Render Method
     * @returns {ReactElement} Creategroup page markup
     */
  render() {
    return (
        <div id="dashContainer" className="teal">
            <div id="appContainer" className="row no-marginbtm">
            <SideMenu />
            <div id="appBoard" className="col s10 m9 l10 no-padding">
                <MainNav />
                <br />
            <div id="chatArea" className="white-text row padTop">
            <div className="container centerContainerForForms">
                <div className="card-panel formPanel">
                    <form className="centerForm">
                        <div className="input-field col s12">
                        <input type="text" id="group_name-create"
                        ref={ (input) => { this.name = input; } } required/>
                        <label htmlFor="group_name-create">Group Name</label>
                        </div>
                        <div className="input-field col s12">
                        <textarea id="group_desc-create"
                        className="materialize-textarea"
                        ref={ (input) => { this.desc = input; } }>
                        </textarea>
                        <label htmlFor="group_desc-create">
                            Group Description
                        </label>
                        </div>
                        <div className="col s12">
                        <p className="center">
                            <button
                                className="btn-large waves-effect waves-light"
                                onClick={this.onCreateGroup}>
                                Create Group
                            </button>
                        </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            </div>
            </div>
        </div>
    );
  }
}

export default CreateGroupBoard;
