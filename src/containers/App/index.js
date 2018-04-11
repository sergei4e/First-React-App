// Core
import React from 'react';
import { string } from 'prop-types';

// Instruments
import Styles from './styles';
import avatar from '../../theme/assets/homer.png';

import Feed from '../../components/feed';
import Catcher from '../../components/catcher';


const options = {
    avatar,
    api:         'https://lab.lectrum.io/react/api/1fwfsc9M9A',
    token:       '9vgjmkm1sn',
    groupId:     '1fwfsc9M9A',
    myFirstName: 'Сергей',
    myLastName:  'Черненко'
};


export default class App extends React.Component {

    static childContextTypes = {
        avatar:      string.isRequired,
        api:         string.isRequired,
        groupId:     string.isRequired,
        myFirstName: string.isRequired,
        myLastName:  string.isRequired,
        token:       string.isRequired
    };

    getChildContext () {
        return options;
    }

    render () {
        return (
            <section className = { Styles.app }>
                <Catcher>
                    <Feed />
                </Catcher>
            </section>
        );
    }
}
