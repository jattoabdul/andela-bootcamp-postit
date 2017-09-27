import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../../styles/index.scss';

class MainNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <nav className="blue-grey darken-4">
          <div className="nav-wrapper">
          <div className="left-align">
					  <i onClick={this.props.toggleSideNav} id="main-navic" className="icon ion-navicon x3 waves-effect waves-light"></i>
				  </div>
            <Link to="/dashboard" className="brand-logo center">
              POSTiT
              <i className="icon ion-speakerphone left x2"></i>
              <sub><small className="hide-on-small-only">you dont have to shout, just POSTiT</small></sub>
            </Link>
            {/* <ul className="right">
              <li>
                <a href="" className="waves-effect waves-light">
                  <i className="icon ion-android-more-vertical"></i>
                </a>
              </li>
            </ul> */}
          </div>
        </nav>
    );
  }
}

export default MainNav;
