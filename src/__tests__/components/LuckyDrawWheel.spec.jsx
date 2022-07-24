import { shallow } from 'enzyme';
import React, { useRef } from 'react';
import LuckyDrawWheel from '../../components/LuckyDrawWheel';

const default_props = {
    onHandleResult: jest.fn(), 
    prizes :[
        { id: 1, background: '#00D7FF', fonts: [{ text: '50.000 coins', top: "45px" }], value: 50000 },
        { id: 2, background: '#b8c5f2', fonts: [{ text: '20.000 coins', top: "45px" }], value: 20000 },
        { id: 3, background: '#e9e8fe', fonts: [{ text: '10.000 coinss', top: "45px" }], value: 10000 },
        { id: 4, background: '#b8c5f2', fonts: [{ text: 'Roll Again', top: "45px" }], value: 0 },
        { id: 5, background: '#e9e8fe', fonts: [{ text: 'Try Again', top: "45px" }], value: 0 },
        { id: 6, background: '#b8c5f2', fonts: [{ text: '10.000 coins', top: "45px" }], value: 10000 },
        { id: 7, background: '#e9e8fe', fonts: [{ text: '20.000 coins', top: "45px" }], value: 20000 },
    ]
}

jest.mock('react', () => {
    const originReact = jest.requireActual('react');
    const mUseRef = jest.fn();
    return {
      ...originReact,
      useRef: mUseRef,
    };
});

describe('LuckyDrawWheel Test when have lucky ticket', () => {

    beforeEach(() => localStorage.setItem('luckyTicket', 3));

    it('Should render LuckyDrawWheel', () => {
        const wrapper = shallow(<LuckyDrawWheel {...default_props}/>);

        expect(wrapper.find('.lucky-wheel').length).toBe(1);
    });

    it('should render click lucky draw', () => {
        const mRef = { current: {
            play: jest.fn(),
            stop: jest.fn()
        }};

        useRef.mockReturnValueOnce(mRef);
        
        const wrapper = shallow(<LuckyDrawWheel {...default_props}/>);

        wrapper.find('.lucky-wheel').props().onStart();
        expect(useRef.mockReturnValueOnce(mRef)).toBeCalled();
    });

    it('should render finish lucky draw', () => {
        const wrapper = shallow(<LuckyDrawWheel {...default_props}/>);

        wrapper.find('.lucky-wheel').props().onEnd();
        expect(default_props.onHandleResult).toBeDefined();
    });

})

describe('LuckyDrawWheel Test when dont have lucky ticket', () => {

    beforeEach(() => localStorage.setItem('luckyTicket', 0));

    it('should render click lucky draw', () => {
        const wrapper = shallow(<LuckyDrawWheel {...default_props}/>);

        wrapper.find('.lucky-wheel').props().onStart();
        // expect(default_props.onClickPagination).toBeDefined();
    });
})