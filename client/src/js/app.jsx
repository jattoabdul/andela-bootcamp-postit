import React from 'react';
import { render } from 'react-dom';
import "materialize-css";
import '../style/index.scss';

import ComponentA from './ComponentA';
// import ComponentB from './ComponentB';

render(<ComponentA />, document.getElementById('app'));
