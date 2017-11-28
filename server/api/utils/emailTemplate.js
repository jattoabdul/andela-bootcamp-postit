export const emailTemplate = {
  /**
   *
   * @param  {string} email
   * @param  {string} hash
   *
   * @return {string} template
   */
  resetPassword(email, hash) {
    const template =
    `<div style="margin: -0.5em;
    padding-top: 0.1em;
    font-family: 'Futura', sans-serif;
    height: 100vh;
    background: #e0f2f1;">
      <div style="background: #2a9d8f;
      margin: -0.8em 0.2em;
      padding: 0em 1em;
      text-align: center;
      font-size: 2em;
      color: white;">
        <p style="padding: 0.25em 10em;">POSTiT</p>
      </div>
      <div style="padding: 1px 10em;">
        <h1>Hi ${email}!,</h1>
        <p style="font-size: 1.4em;">You recently requested
        to reset your password for your POSTiT account.
        Click the button below to reset it.</p>
        <a href="https://jatto-postit-app-staging.herokuapp.com/#/updatepassword/${hash}" 
        style="color: white;
        text-decoration: none;
        text-align: center;
        margin: auto;
        display: block;
        background: #0097A7;
        width: 15em;
        padding: 1em;
        border-radius: 3px;
        border: ridge #EEEEEE 1px;
        box-shadow: 0px 0px 3px grey;" 
        onmouseover = "this.style.borderWidth = '2px'"
        onmouseout  = "this.style.borderWidth = '1px'">Reset your password</a>
        <p style="font-size: 1em;
        color: grey;">If you did not request a password reset,
        please ignore this email or reply to let us know.
        The password reset is only valid for the next 1 hour.</p>
        <p style="font-size: 1.25em;">Thanks, <br> POSTiT Dev Team</p>
        <hr>
        <p>If you are having trouble clicking the password reset button,
        copy and paste the url below into your web browser.</p>
        <a href="https://jatto-postit-app-staging.herokuapp.com/#/updatepassword/${hash}">
        https://jatto-postit-app-staging.herokuapp.com/#/updatepassword/${hash}
        </a>
      </div>
      <div style="left: 0;
      padding-top: 0.1em;
      font-family: 'Futura', sans-serif;
      background: #e0f2f1;">
        <div style="position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        background: azure;
        color: #607D8B;">
          <p>&copy; 2017 | POSTiT | All Rights reserved.</p>
        </div>
    </div>`;
    return template;
  },
  /**
   *
   * @param  {string} priority
   * @param  {string} messageText
   *
   * @return {string} template
   */
  chatMessage(priority, messageText) {
    const template =
    `<div style="margin: -0.5em;
    padding-top: 0.1em;
    font-family: 'Futura', sans-serif;
    height: 100vh;
    background: #e0f2f1;">
      <div style="background: #2a9d8f;
      margin: -0.8em 0.2em;
      padding: 0em 1em;
      text-align: center;
      font-size: 2em;
      color: white;">
        <p style="padding: 0.25em 10em;">POSTiT</p>
      </div>
      <div style="padding: 1px 10em;">
        <h1>Hello,</h1>
        <p style="font-size: 1.4em;">
          You recently recieved an ${priority} message on POSTiT
        </p>
        <blockquote cite="" style="border-left: 2px solid green;
        padding: 0.1em 1.5em;
        background: aliceblue;">
          <p style="    font-size: 1em;
          font-style: italic;
          font-family: -webkit-body;">${messageText}</p>
        </blockquote>
        <a href="https://jatto-postit-app-staging.herokuapp.com" 
        style="color: white;
        text-decoration: none;
        text-align: center;
        margin: auto;
        display: block;
        background: #0097A7;
        width: 15em;
        padding: 1em;
        border-radius: 3px;
        border: ridge #EEEEEE 1px;
        box-shadow: 0px 0px 3px grey;" 
        onmouseover = "this.style.borderWidth = '2px'"
        onmouseout  = "this.style.borderWidth = '1px'">
          Click to view messages
        </a>
        <p style="font-size: 1em;
        color: grey;">
        PS:
        We also love hearing from you and helping you with any issue you have.
        Please reply this email if you want to ask question or just say hi</p>
        <p style="font-size: 1.25em;">Thanks, <br> POSTiT Dev Team</p>
        <hr>
        <p>If you are having trouble clicking the view message button,
        copy and paste the url below into your web browser.</p>
        <a href="https://jatto-postit-app-staging.herokuapp.com">
          https://jatto-postit-app-staging.herokuapp.com
        </a>
      </div>
      <div style="left: 0;
      padding-top: 0.1em;
      font-family: 'Futura', sans-serif;
      background: #e0f2f1;">
        <div style="position: absolute;
        bottom: 0;
        text-align: center;
        width: 100%;
        background: azure;
        color: #607D8B;">
          <p>&copy; 2017 | POSTiT | All Rights reserved.</p>
        </div>
    </div>`;

    return template;
  }
};
