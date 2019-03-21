import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

import withDelayedUnmout from './withDelayedUnmount';

const propTypes = {
    isMounted: PropTypes.bool,
    duration: PropTypes.number.isRequired,

    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number
    ])
};

const defaultProps = {
    isMounted: false,
    style: null
};

class AnimatedView extends Component {
    state = { opacity: new Animated.Value(0) }

    componentDidMount() {
        const { duration } = this.props;
        const { opacity } = this.state;

        Animated.timing(opacity, { toValue: 1, duration }).start();
    }

    componentDidUpdate(prevProps) {
        const { isMounted, duration } = this.props;
        const { opacity } = this.state;

        if (prevProps.isMounted && !isMounted) {
            Animated.timing(opacity, { toValue: 0, duration }).start();
        }
    }

    render() {
        const { style, children } = this.props;
        let { opacity } = this.state;

      return <Animated.View style={{ ...style, opacity: opacity }}>{children}</Animated.View>;
    }
}

AnimatedView.propTypes = propTypes;
AnimatedView.defaultProps = defaultProps;

export default withDelayedUnmout(AnimatedView);
