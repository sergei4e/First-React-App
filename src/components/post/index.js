import React, { Component } from 'react';
import moment from 'moment';
import { string, func, number, array } from 'prop-types';

import Like from '../likes';

import Styles from './styles.scss';


export default class Post extends Component {
    static propTypes = {
        avatar:     string.isRequired,
        comment:    string.isRequired,
        created:    number.isRequired,
        deletePost: func.isRequired,
        FirstName:  string.isRequired,
        id:         string.isRequired,
        LastName:   string.isRequired,
        likePost:   func.isRequired,
        likes:      array.isRequired


    }

    static contextTypes = {
        api:         string.isRequired,
        token:       string.isRequired,
        myFirstName: string.isRequired,
        myLastName:  string.isRequired
    }

    /*
    shouldComponentUpdate () {
        throw new Error('errot');
    }

    componentWillUnmount () {
        console.log('==============> componentWillunmount');
    }
    */

    shouldComponentUpdate () {
        return true;
    }

    _deletePost = () => {
        const { id, deletePost } = this.props;

        deletePost(id);

    }

    render () {
        const { avatar, created, comment, id, LastName, FirstName, likePost, likes } = this.props;
        const { myLastName, myFirstName } = this.context;
        // console.log(likes);

        return (
            <section className = { Styles.post }>
                { LastName === myLastName && FirstName === myFirstName
                    ? <span className = { Styles.cross } onClick = { this._deletePost } />
                    : null }
                <img alt = 'homer' src = { avatar } />
                <a>{ FirstName } { LastName }</a>
                <time>{ moment(created*1000).format('MMMM D h:em:ss a') } </time>
                <p>{ comment }</p>
                <Like id = { id } likePost = { likePost } likes = { likes } />
            </section>
        );
    }
}
