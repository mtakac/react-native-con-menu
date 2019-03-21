import React, { Component } from 'react';

const withDelayedUnmount = WrappedComponent => (
    class extends Component {

        timeOut = null;
        state = { shouldRender: this.props.isMounted };

        componentDidUpdate(prevProps) {
            const { isMounted, duration } = this.props;

            if (prevProps.isMounted && !isMounted) {
                this.timeOut = setTimeout(() => this.setState({ shouldRender: false }), duration);
            }

            if (!prevProps.isMounted && isMounted) {
                this.setState({ shouldRender: true });
            }
        }

      componentWillUnmount() {
            clearTimeout(this.timeOut);
      }

      render() {
            const { shouldRender } = this.state;

            return shouldRender ? <WrappedComponent {...this.props} /> : null;
        }
    }
);

export default withDelayedUnmount;
