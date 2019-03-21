import React from 'react';
import { TouchableNativeFeedback, Text } from 'react-native';
import { shallow } from 'enzyme';
import ConMenu from '../ConMenu';

describe('<ConMenu />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ConMenu items={[]} />);
    });

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('renders items correctly', () => {
        const items = [
            {
                label: 'Menu item',
                onPress: () => {}
            }
        ];
        wrapper.setProps({ items });
        expect(wrapper).toMatchSnapshot();
    });

    it('renders <ToggleComponent /> correctly', () => {
        const ToggleComponent = props => (
            <TouchableNativeFeedback onPress={props.onPress}>
                <Text>Press me!</Text>
            </TouchableNativeFeedback>
        );

        wrapper.setProps({ ToggleComponent });
        expect(wrapper).toMatchSnapshot();
    });
});
