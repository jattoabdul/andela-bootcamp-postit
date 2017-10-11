import React from 'react';
import ReactTooltip from 'react-tooltip';
import '../../../styles/index.scss';

/**
 * @class UserView
 */
class UserView extends React.Component {
  /**
   * constructor function
   * @param {*} props 
   */
  constructor(props) {
    super(props);
    this.state = {
      scroll: true
    };
  }

  /**
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
        <span className="bottomSearch waves-effect waves-teal">
          <i className="icon ion-ios-search teal-text x25" />
        </span>
      </div>
    );
  }
}

export default UserView;
