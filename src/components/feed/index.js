import React from 'react';
import {func, string} from 'prop-types';
import io from 'socket.io-client';
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

import Composer from '../composer';
import Post from '../post';
import Catcher from '../catcher';
import Counter from '../counter';
import Spinner from '../spinner';
import Postman from '../postman';


import Styles from './styles.scss';
import PostmanStyles from '../postman/styles.scss';
import withState from '../enchancer';


@withState
export default class Feed extends React.Component {
    static contextTypes = {
        avatar:      string.isRequired,
        myFirstName: string.isRequired,
        myLastName:  string.isRequired
    };

    _handleComposerAppear = (composer) => {
        fromTo(
            composer,
            1,
            { y: -200, x: 500, opacity: 0, rotationY: 360 },
            { y: 0, x: 0, opacity: 1, rotationY: 0 }
        );
    }

    _handleCounterAppear = (counter) => {
        fromTo(
            counter,
            1,
            { y: -1000, x: -300, opacity: 0, rotationY: 360 },
            { y: 0, x: 0, opacity: 1, rotationY: 0 }
        );
    }

    _handlePostmanAppear = (postman) => {
        fromTo(
            postman,
            3,
            { x: 500, opacity: 0 },
            { x:          0,
              opacity:    1,
              onComplete: () => { this.props._hidePostman() }
            }
        );

    }

    _handlePostmanDisappear = (postman) => {
        fromTo(
            postman,
            3, // длительность анимации в секундах
            { x: 0, opacity: 1 },
            { x: 500, opacity: 0 }
        );
    }

    render () {
        // console.log('------> render');
        const { avatar, myFirstName, myLastName } = this.context;
        // const postsData = this.state.posts;
        const { posts: postsData, isspinner, ispostman, _createPost, _deletePost, _likePost } = this.props;

        const posts = postsData.map((post) => (
            <CSSTransition
                classNames = { {
                    enter:       Styles.postInStart,
                    enterActive: Styles.postInEnd,
                    exit:        Styles.postOutStart,
                    exitActive:  Styles.postOutEnd
                } }
                key = { post.id }
                timeout = { 700 } >
                <Catcher>
                    <Post
                        avatar = { post.avatar }
                        comment = { post.comment }
                        created = { post.created }
                        deletePost = { _deletePost }
                        FirstName = { post.firstName }
                        id = { post.id }
                        LastName = { post.lastName }
                        likePost = { _likePost }
                        likes = { post.likes }
                    />
                </Catcher>
            </CSSTransition>
        ));

        return (
            <section className = { Styles.feed }>
                <Transition
                    appear
                    in = { ispostman }
                    timeout = { 3000 }
                    onEnter = { this._handlePostmanAppear }
                    onExit = { this._handlePostmanDisappear }
                >
                    <Postman />
                </Transition>

                <Spinner isspinner = { isspinner } />
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._handleComposerAppear }
                >
                    <Composer
                        avatar = { avatar }
                        createPost = { _createPost }
                        myFirstName = { myFirstName }
                        myLastName = { myLastName }
                    />
                </Transition>
                <Transition
                    appear
                    in
                    timeout = { 1000 }
                    onEnter = { this._handleCounterAppear }
                >
                    <Counter posts = { posts } />
                </Transition>
                <TransitionGroup>
                    { posts }
                </TransitionGroup>
            </section>
        );
    }
}

// export default withState(Feed);