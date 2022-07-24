import { shallow } from 'enzyme';
import DropdownPeriod from '../../components/DropdownPeriod';
import period from '../../constant/period';

const default_props = {
    data: period, 
    onChange: jest.fn()
}

describe('DropdownPeriod Test', () => {
    it('Should render DropdownPeriod', () => {
        const wrapper = shallow(<DropdownPeriod {...default_props}/>);

        expect(wrapper.find('DropdownButton').length).toBe(1);
    });

    it('should render click dropdown', () => {
        const wrapper = shallow(<DropdownPeriod {...default_props}/>);

        wrapper.find('DropdownItem').at(0).props().onClick({value: 1, label: '1'});
        expect(default_props.onChange).toBeDefined();
    });
})