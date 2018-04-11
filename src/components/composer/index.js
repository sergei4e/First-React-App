import React, { Component } from 'react';
import { string, func } from 'prop-types';

import Styles from './styles.scss';
import { getUniqueID, getRandomColor } from '../../helpers';


export default class Composer extends Component {
    static contextTypes = {
        avatar:      string.isRequired,
        myFirstName: string.isRequired
    };

    static propTypes = {
        createPost: func.isRequired
    };

    state = {
        comment:           '',
        avatarBorderColor: 'red'
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { comment } = this.state;

        if (comment.trim()) {
            this.props.createPost(comment);
            this.setState({
                comment: ''
            });
        }
    }

    handleChange = (event) => {
        this.setState({
            comment: event.target.value
        });

        /*
        const { comment } = this.state;
        if (comment.trim().length < 250) {
            this.setState({
                comment: event.target.value
            });
            */
    }

    handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            this.handleSubmit(event);
        }
    }

    handleNoCopyCut = (event) => {
        event.preventDefault();
    }

    handleKeyPress = () => {
        this.setState({
            avatarBorderColor: getRandomColor()
        });
    }

    render () {
        const { avatar, myFirstName } = this.context;
        const { comment, avatarBorderColor } = this.state;

        return (
            <section className = { Styles.composer }>
                <img
                    alt = 'homer'
                    src = { avatar }
                    style = { { borderColor: avatarBorderColor } }
                />
                <form
                    onKeyDown = { this.handleKeyDown }
                    onKeyPress = { this.handleKeyPress }
                    onSubmit = { this.handleSubmit } >
                    <textarea
                        placeholder = { `${myFirstName}, напиши постик сюда, плз` }
                        value = { comment }
                        onChange = { this.handleChange }
                        onCopy = { this.handleNoCopyCut }
                        onCut = { this.handleNoCopyCut }
                    />
                    <input type = 'submit' value = 'Submit' />
                </form>
            </section>
        );
    }
}
