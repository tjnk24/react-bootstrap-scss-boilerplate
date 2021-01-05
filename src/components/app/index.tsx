import React, { FC } from 'react';
import { Button } from 'react-bootstrap';
import logo from './logo.png';

import style from './style.scss';

const App: FC = () => (
  <div>
    <div className={style.app}>
      <img src={logo} alt="logo" />
      Hello boilerplate!
      <div>Nested div</div>
      <Button className={style['margin-button']}>test</Button>
    </div>
  </div>
);

export default App;
