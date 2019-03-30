/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableNativeFeedback
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Header from './components/Header';

import ConMenu from 'react-native-con-menu';

const data = [
    {
        id: 1,
        name: 'Marek Takac'
    },
    {
        id: 2,
        name: 'Keram Cakat'
    },
    {
        id: 3,
        name: 'Lorem Ipsum'
    },
    {
        id: 4,
        name: 'Sit amet'
    },
    {
        id: 5,
        name: 'Dolor'
    },
    {
        id: 6,
        name: 'Dip Iam'
    },
    {
        id: 7,
        name: 'Elis'
    },
    {
        id: 8,
        name: 'Consecetur'
    }
];

const menuItems = [
    {
        label: 'Marek Takac',
        onPress: () => console.log('test')
    },
    {
        label: 'Keram Cakat',
        onPress: () => console.log('test')
    },
    {
        label: 'Lorem Ipsum',
        onPress: () => console.log('test')
    }
];

const ToggleComponent = props => {
    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <Icon name="rocket" size={30} color="#900" />
        </TouchableNativeFeedback>
    );
};

type Props = {};
export default class App extends Component<Props> {
    renderListItem = ({ item }) => {
        return (
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple('#ddd')}
                onPress={() => console.log('Pressed!')}
            >
                <View
                    style={{
                        padding: 20,
                        backgroundColor: '#eee',
                        borderBottomWidth: 3,
                        borderBottomColor: 'white'
                    }}
                >
                    <Text>{item.name}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <Header title="My first header" />

                <View style={{ flex: 1 }}>
                    <FlatList
                        data={data}
                        renderItem={this.renderListItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>

                <View style={{ flex: 1, position: 'relative' }}>
                    <ConMenu
                        items={menuItems}
                        position={{ top: 10, right: 20 }}
                        menuStyle={{ width: 200 }}
                        ToggleComponent={ToggleComponent}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
});
