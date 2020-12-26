import React from 'react';
import logo from './logo.png';

import style from './style.scss';

const App = () => (
  <div className={style.app}>
    <img src={logo} alt="logo" />
    Hello boilerplate!
    <div>Nested div</div>
    <button type="button">test</button>
  </div>
);

export default App;
