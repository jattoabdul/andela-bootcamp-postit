import React from "react";
// import { connect } from "react-redux";
// import Auth from "./../containers/";
// import registerUser from "../../actions/registerUser";
// import api from "../helpers/api";
import { SideMenu, MainNav } from "./../partials/";
import "./../../stylesheet/App.css"; // Home.scss
// import "./../../stylesheet/Dashboard.css"; // Dashboard.scss

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: []
    };
  }

  render() {
    return (
        <div id="dashContainer" className="teal">
            <div id="appContainer" className="row no-marginbtm">
                <SideMenu />
                <div id="appBoard" className="col s10 m9 l10 no-padding">
                    <MainNav />
                    <br/>
                    <div id="chatArea" className="white-text">
                        <div className="card-panel welcome teal-text">
                            <h2 className="center-align">Welcome Abdulqahhar</h2>
                            <h4 className="left-align center">
                                You don&rsquo;t have to shout. <br/>
                                <span className="right-align flow-text">
                                    Just POSTiT!!!
                                </span>
                            </h4>
                            <div className="row">
                            <br/>
                            <div className="col m8 row">
                                <form>
                                    <div className="input-field search col s12">
                                    <i className="icon ion-ios-search prefix right"></i>
                                        <input type="search"
                                            id="searchArea"
                                            placeholder="search"
                                            className="teal white-text"/>
                                    </div>
                                </form>
                            </div>
                            <div className="col m4">
                                <p>
                                    <span className="flow-text or">or </span> &nbsp;
                                    <button className="btn createGroup waves-effect"
                                        href="/dashboard/create-group">
                                        Create Group
                                    </button>
                                </p>
                            </div>
                            <br/><br/><br/><br/>
                            <div className="aboutBox row">
                                <div className="col s12">
                                    <h5 className="left-align">About Us</h5>
                                    <p>
                                        We are a Lorem ipsum dolor sit amet,consectetur
                                        adipisicing elit. Nam, excepturi eaque velit
                                        asperiores, quia veritatis nemo culpa nesciunt
                                        perspiciatis quasi repellat soluta voluptates
                                        ipsa aut dolorum accusantium qui magnam eum.
                                    </p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Dashboard;
