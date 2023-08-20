import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import AutoComplete from './AutoComplete';

const root = document.getElementById('react-root');
createRoot(root).render(<AutoComplete/>);