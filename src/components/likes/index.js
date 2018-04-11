import React, { Component } from 'react';

import Styles from './styles.scss';
import { string, func, arrayOf, shape } from 'prop-types';


export default class Like extends Component {
    static contextTypes = {
        myFirstName: string.isRequired,
        myLastName:  string.isRequired
    }

    static propTypes = {
        id:       string.isRequired,
        likePost: func.isRequired,
        likes:    arrayOf(
            shape({
                firstName: string.isRequered,
                lastName:  string.isRequired
            })
        )
    }

    static defaultProps = {
        likes: []
    }

    state = {
        showLikes: false
    }

    _showLikes = () => {
        this.setState(() => ({
            showLikes: true
        }));
    }

    _hideLikes = () => {
        this.setState(() => ({
            showLikes: false
        }));
    }

    _getLikedByMe = () => {
        const { firstName: myFirstName, lastName: myLastName } = this.context;

        return this.props.likes.some(({firstName, lastName}) =>
            `${myFirstName} ${myLastName}` === `${firstName} ${lastName}`
        );
    }

    _getTotalLikes = () => {
        const { likes } = this.props;
        const {
            firstName: myFirstName,
            lastName: myLastName
        } = this.context;

        const likedByMe = this._getLikedByMe();

        return likes.length === 1 && likedByMe
            ? `${myFirstName} ${myLastName}`
            : likes.length === 2 && likedByMe
                ? `You and ${likes.length - 1} other`
                : likedByMe
                    ? `You and ${likes.length - 1} others`
                    : likes.length;
    }

    _getLikesList = () => {
        const { likes } = this.props;
        const { showLikes } = this.state;

        return likes.length && showLikes ? (
            <ul>
                {
                    likes.map((like) => (
                        <li key = { like.id } >{ `${like.firstName} ${like.lastName}` }</li>
                    ))
                }
            </ul>
        ): null;
    }

    _likePost = () => {
        const { id, likePost } = this.props;

        likePost(id);
    }

    render () {
        const likedByMe = this._getLikedByMe();
        const likeStyles = likedByMe
            ? `${Styles.icon} ${Styles.liked}`
            : Styles.icon;

        const likesList = this._getLikesList();
        const totalLikes = this._getTotalLikes();

        return (

            <section className = { Styles.like }>
                <span className = { likeStyles } onClick = { this._likePost }>
                    Like
                </span>
                <div>
                    {likesList}
                    <span
                        onMouseEnter = { this._showLikes }
                        onMouseLeave = { this._hideLikes }>
                        { totalLikes }
                    </span>
                </div>
            </section>
        );
    }
}
