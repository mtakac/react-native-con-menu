import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import ConMenu from 'react-native-con-menu';

const menuItems = [
    {
        label: 'Měření',
        onPress: () => console.log('Measurements')
    },
    {
        label: 'Mléčna síla',
        onPress: () => console.log('Milking performance')
    },
    {
        label: 'Chodivost',
        onPress: () => console.log('Walk Quality')
    },
    {
        label: 'Končetiny',
        onPress: () => console.log('Extremities')
    },
    {
        label: 'Shrnutí',
        onPress: () => console.log('Total')
    }
];

export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{this.props.title}</Text>
                <ConMenu
                    items={menuItems}
                    position={{ top: 15, right: 10 }}
                    menuStyle={{ width: 200, borderWidth: 1, borderColor: 'white', elevation: 10 }}
                    itemStyle={{
                        backgroundColor: 'steelblue',
                        padding: 50,
                        borderBottomColor: 'white',
                        borderBottomWidth: 3
                    }}
                    itemPressedColor="blue"
                    toggleText="Open menu"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        padding: 24,
        backgroundColor: '#277DE4',
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        overflow: 'visible'
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});
