import React from 'react';
import { shallow } from 'enzyme';
import AnimatedView from '../AnimatedView';

describe('<AnimatedView />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AnimatedView duration={500} />);
    });

    it('renders correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it('mounts correctly', () => {
        wrapper.setProps({ isMounted: true });
        expect(wrapper).toMatchSnapshot();
    });
});
