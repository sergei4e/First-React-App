// Core
import { EventEmitter } from 'events';

// Instruments
import dispatcher from '../dispatcher';

export default new class PostsStore extends EventEmitter {
    constructor() {
        super();

        this.state = {
            posts: []
        };

        dispatcher.register((action) => {
            switch (action.type) {
                case 'FETCH_POSTS':
                    this.fetchPosts(action.payload);
                    break;

                default:
                    return false;
            }
        });
    }

    subscribe(callback) {
        this.on('change', callback);
    }

    unsubscribe(callback) {
        this.removeListener('change', callback);
    }

    update() {
        this.emit('change');
    }

    getInitialState() {
        return this.state;
    }

    getCurrentPosts() {
        return this.state.posts;
    }

    fetchPosts(posts) {
        this.state.posts = posts;
        this.update();
    }
}();
