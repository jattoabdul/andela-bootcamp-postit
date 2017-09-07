import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class FlashMessage extends React.Component {
    constructor(props){
      super(props)
      this.onClick = this.onClick.bind(this); 
    }

    onClick() {
      this.props.deleteFlashMessage(this.props.message.id);
    }

    render() {
        const { id, type, text } = this.props.message;
      return (
        <div className="row" id="alert_box">
          <div className="col s12 m12">
            <div className={ classNames('card darken-1', {
                  'teal': type === 'success',
                  'red': type === 'error'
            })} >
              <div className="row">
                <div className="col s12 m10">
                  <div className="card-content white-text">
                    <p>{text}</p>
                </div>
              </div>
              <div className="col s12 m2">
              <i onClick={this.onClick}
                className="icon ion-ios-close icon-style" 
                aria-hidden="true"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
}
}

FlashMessage.PropTypes = {
    message: PropTypes.object.isRequired,
    deleteFlashMessage: PropTypes.func.isRequired    
  }


export default FlashMessage;