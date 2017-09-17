import React from "react";

const Welcome = () =>
<div className="col s12 m6 indexSideOne">
    <h3 className="center-align">
        <i className="icon ion-speakerphone"></i> POSTiT
    </h3>
    <br/>
    <p className="flow-text center-align">
        You don&rsquo;t need to shout,
        <br/> Just POSTiT
    </p>
    <br/>
    <h5>
        <span>Quickstart</span>
    </h5>
    <ul>
        <li><a href="/#/register">Create an Account</a></li>
        <li><a href="/#/message">Create a Message Board</a></li>
        <li><a href="/#/user/add">Add Members to Board</a></li>
        <li><a href="/#/dashboard">Just PostIt</a></li>
    </ul>
</div>;

export default Welcome;
