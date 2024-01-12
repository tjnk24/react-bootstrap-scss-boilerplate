import './global.scss';
import React from 'react';
import {createRoot} from 'react-dom/client';

import App from '__components/app';

createRoot(document.getElementById('root')).render(<App/>);
