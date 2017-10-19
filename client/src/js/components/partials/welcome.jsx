import React from 'react';

/**
 * @return {dom} DomElement
 */
const Welcome = () => (
  <div className="col s12 m6 indexSideOne hide-on-small-only">
    <h3 className="center-align">
      <i className="icon ion-speakerphone" /> POSTiT
    </h3>
    <br />
    <p className="flow-text center-align">
      You don&rsquo;t need to shout,
      <br /> Just POSTiT
    </p>
    <br />
    <h5>
      <span>Quickstart</span>
    </h5>
    <ul>
      <li>
        <a href="/#/register">Create an Account</a>
      </li>
      <li>Create a Group Board</li>
      <li>Add Members to Board</li>
      <li>Just PostIt</li>
    </ul>
  </div>
);

export default Welcome;
