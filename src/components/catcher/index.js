import React, { Component } from 'react';

import { object } from 'prop-types';
import Styles from './styles.scss';


export default class Catcher extends Component {
    static propTypes = {
        children: object.isRequired
    }

    state = {
        error: ''
    }

    componentDidCatch (error, stack) {
        this.setState(() => ({
            error: true
        }));
    }

    render () {
        const { error } = this.state;

        if (error) {
            return (
                <section className = { Styles.catcher }>
                    <span>A mysterious 👽 &nbsp;error 📛 &nbsp;occured.</span>
                    <p>
                        Our space 🛰 &nbsp;engineers strike team 👩🏼‍🚀 👨🏼‍🚀
                        &nbsp;is already working 🚀 &nbsp;in order to fix that
                        for you!
                    </p>
                </section>
            );
        } else {
            return this.props.children;
        }
    }
}
