import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TouchableNativeFeedback,
    Modal,
    TouchableOpacity
} from 'react-native';

import AnimatedView from './AnimatedView';

const DEFAULT_ANIMATION_DURATION = 250;
const DEFAULT_MENU_WIDTH = 200;
const DEFAULT_ITEM_COLOR = '#EEEEEE';
const DEFAULT_ITEM_PADDING = 20;
const DEFAULT_ITEM_PRESSED_COLOR = '#DDDDDD';
const DEFAULT_TOGGLE_TEXT = 'Menu';

const propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            onPress: PropTypes.func
        })
    ).isRequired,

    animationDuration: PropTypes.number,
    itemPressedColor: PropTypes.string,
    position: PropTypes.shape({ top: PropTypes.number, left: PropTypes.number }),
    menuStyle: PropTypes.shape({ width: PropTypes.number.isRequired }),
    itemStyle: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    toggleText: PropTypes.string,
    ToggleComponent: PropTypes.func
};

const defaultProps = {
    animationDuration: DEFAULT_ANIMATION_DURATION,
    itemPressedColor: DEFAULT_ITEM_PRESSED_COLOR,
    position: { top: 0, right: 0 },
    menuStyle: { width: DEFAULT_MENU_WIDTH },
    itemStyle: {},
    toggleText: DEFAULT_TOGGLE_TEXT,
    ToggleComponent: null
};

class ConMenu extends Component {
    timeOut = null;
    buttonView = createRef();

    state = {
        isMounted: false,
        isModalOpen: false,
        top: 0,
        right: 0
    };

    componentDidUpdate(prevProps, prevState) {
        const { animationDuration } = this.props;
        const { isMounted } = this.state;

        if (prevState.isMounted && !isMounted) {
            this.timeOut = setTimeout(
                () => this.setState({ isModalOpen: false }),
                animationDuration
            );
        }

        if (!prevState.isMounted && isMounted) {
            this.setState({ isModalOpen: true });
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeOut);
    }

    toggle = () => {
        this.setState(state => ({ ...state, isMounted: !state.isMounted }));
    };

    measureButton = () => {
        const { menuStyle } = this.props;

        this.buttonView.current.measure((x, y, width, height, pageX, pageY) => {
            this.setState({ top: pageY + height, left: pageX - menuStyle.width + width });
        });
    };

    renderToggleComponent = () => {
        const { ToggleComponent, toggleText } = this.props;

        if (ToggleComponent) {
            return <ToggleComponent onPress={this.toggle} />;
        }

        return <Button title={toggleText} onPress={this.toggle} />;
    };

    render() {
        const {
            items,
            animationDuration,
            itemPressedColor,
            position,
            menuStyle,
            itemStyle
        } = this.props;

        const { isModalOpen, isMounted, top, left } = this.state;

        return (
            <View style={{ ...styles.container, ...position }}>
                <View onLayout={this.measureButton} ref={this.buttonView}>
                    {this.renderToggleComponent()}
                </View>

                <Modal visible={isModalOpen} animationType="none" transparent>
                    <TouchableOpacity activeOpacity={1} onPressOut={this.toggle}>
                        <AnimatedView
                            style={styles.animatedView}
                            duration={animationDuration}
                            isMounted={isMounted}
                        >
                            <View style={{ ...menuStyle, ...styles.menu, top, left }}>
                                {items.map(({ label, onPress }) => (
                                    <TouchableNativeFeedback
                                        key={label}
                                        background={TouchableNativeFeedback.Ripple(
                                            itemPressedColor
                                        )}
                                        onPress={onPress}
                                    >
                                        <View style={{ ...styles.item, ...itemStyle }}>
                                            <Text>{label}</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                ))}
                            </View>
                        </AnimatedView>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute'
    },

    animatedView: {
        width: '100%',
        height: '100%'
    },

    menu: {
        position: 'absolute'
    },

    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: DEFAULT_ITEM_PADDING,
        backgroundColor: DEFAULT_ITEM_COLOR
    }
});

ConMenu.propTypes = propTypes;
ConMenu.defaultProps = defaultProps;

export default ConMenu;
