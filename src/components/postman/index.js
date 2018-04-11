import React, { Component } from 'react';
import { string } from 'prop-types';

import Styles from './styles.scss';


export default class Postman extends Component {
    static contextTypes = {
        avatar:      string.isRequired,
        myFirstName: string.isRequired,
        myLastName:  string.isRequired
    }

    render () {
        const { avatar, myFirstName, myLastName } = this.context;

        return (
            <section className = { Styles.postman }>
                <img alt = 'homer' src = { avatar } />
                <p>Привет, {myFirstName} {myLastName}!</p>
                <p>Чатик рад снова тебя видеть</p>
            </section>
        );
    }
}
