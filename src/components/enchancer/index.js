import {string} from "prop-types";
import io from "socket.io-client";
import React from "react";


const withState = (Injectable) => {
    class Enchancer extends React.Component {
        static contextTypes = {
            api:         string.isRequired,
            token:       string.isRequired,
            groupId:     string.isRequired,
            avatar:      string.isRequired,
            myFirstName: string.isRequired,
            myLastName:  string.isRequired
        }

        state = {
            posts:     [],
            isspinner: false,
            ispostman: true
        }

        componentDidMount () {
            console.log('------> componentDidMount');

            const { groupId } = this.context;

            const socket = io('https://lab.lectrum.io', {
                path: '/react/ws'
            });

            socket.on('connect', () => {
                // хендлим логику конекта
                console.log('Connect Socket!', socket.id);
            });

            socket.on('disconnect', () => {
                // хендлим логику конекта
                console.log('Disconnect Socket!', socket.id);
            });

            socket.emit('join', groupId);

            socket.on('join_error', (data) => {
                // хендлим логику конекта
                console.log(JSON.parse(data).message);
            });

            socket.on('create', (data) => {
                const post = JSON.parse(data);

                this.setState(({ posts }) => ({
                    posts: [post, ...posts]
                }));
            });

            socket.on('remove', (postId) => {
                this.setState(({ posts }) => ({
                    posts:     posts.filter((post) => post.id !== postId),
                    isspinner: false
                }));
            });

            this._fetchPosts();
        }

        _createPost = (comment) => {
            const { api, token } = this.context;

            this.setState(() => ({ isspinner: true }));

            fetch(api, {
                method:  'POST',
                headers: {
                    'Content-Type':  'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({ comment })
            })

                .then((response) => {
                    if (response.status !== 200) {
                        throw new Error('Server send not 200 status');
                    }

                    // return response.json();
                })

                .then(() => {
                    this.setState(() => ({ isspinner: false }));
                })

                .catch((error) => {
                    console.log(error.message);
                });

        }

        _fetchPosts = async () => {
            const { api, token } = this.context;

            try {
                this.setState(() => ({ isspinner: true }));

                const response = await fetch(api, {
                    method:  'GET',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
                });

                if (response.status !== 200) {
                    throw new Error('Fetch post failed');
                }
                const { data, message, meta } = await response.json();

                console.log(meta);
                console.log(message);

                this.setState(({ posts }) => ({
                    posts:     [...data, ...posts],
                    isspinner: false
                }));
            } catch ({ message }) {
                console.log(message);
            }
        }

        _deletePost = async (id) => {
            const { api, token } = this.context;

            try {

                this.setState(() => ({ isspinner: true }));

                const response = await fetch(`${api}/${id}`, {
                    method:  'DELETE',
                    headers: { 'Authorization': token }
                });

                if (response.status !== 204) {
                    throw new Error('delete post failed');
                }
            } catch ({ message }) {
                console.log(message);
            }
        }

        _likePost = async (id) => {
            const { api, token } = this.context;

            try {
                const response = await fetch(`${api}/${id}`, {
                    method:  'PUT',
                    headers: { 'Authorization': token, 'Content-Type': 'application/json' }
                });

                const { data, message, meta } = await response.json();

                console.log(meta);
                console.log(message);

                // this.setState((arg) => {
                //    debugger
                // });

                // this.setState(({ posts }) => ({
                //     posts: posts.map(({ post }) => post.id === id ? data : post)
                // }));

                this.setState(({ posts }) => ({
                    posts: posts.map((post) => post.id === id ? data : post)
                }));

            } catch ({ message }) {
                console.log(message);
            }
        }

        _hidePostman = () => {
            setTimeout(() => {
                this.setState({ ispostman: false });
            }, 5000);
        }

        render () {
            return (
                <Injectable
                    _createPost = { this._createPost }
                    _deletePost = { this._deletePost }
                    _likePost = { this._likePost }
                    _hidePostman = { this._hidePostman }
                    { ...this.state }
                />
            );
        }
    }

    return Enchancer;
};

export default withState;
