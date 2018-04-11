import React from 'react';
import { createPortal } from 'react-dom';

import Styles from './styles.scss';


const portal = document.getElementById('spinner');

const Spinner = ({ isspinner }) =>
    createPortal(
        isspinner
            ? <div className = { Styles.spinner } />
            : null,
        portal
    );

// const Spinner = () => <div className = { Styles.spinner } />;

export default Spinner;
