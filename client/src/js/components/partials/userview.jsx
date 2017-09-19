import React from "react";
import '../../../styles/index.scss';

class UserView extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
        <div className="white right col s1" id="usersScroll">
              <ul>
                {
                  this.props.activeMessageReaders !== [] ?
                  this.props.activeMessageReaders.map(user => 
                    <li key={user.id}>
                      <a>
                        <img src={`https://robohash.org/${user.username}`}
                          alt={user.username}/>
                      </a>
                    </li>) :
                    <li>
                      <a>
                        <img src="https://robohash.org/jatto"
                          alt="jatto"/>
                      </a>
                    </li>
                }
                
              </ul>
              <span className="bottomSearch waves-effect waves-teal">
                <i className="icon ion-ios-search teal-text x25"></i>
              </span>
            </div>
    );
  }
}

export default UserView;

// {`https://robohash.org/${this.props.username}`}
