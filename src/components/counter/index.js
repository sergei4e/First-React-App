import React, { Component } from 'react';

import Styles from './styles.scss';
import { array } from 'prop-types';


const Counter = (props) => <section className = { Styles.counter }>Posts count: { props.posts.length }</section>;

Counter.propTypes = { posts: array.isRequired };

export default Counter;
