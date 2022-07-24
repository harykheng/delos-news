import { shallow } from 'enzyme';
import ModalDetail from '../../components/ModalDetail';

const default_props = {
    show: true, 
    onClose: jest.fn(), 
    data: {
        title: 'title',
        imgUrl: 'src',
        byLine: 'byHary',
        publishDate: '20220712',
        articleUrl: 'www.google.com',
        abstract: 'ini abstract',
        uri: '231321'
    }, 
    onHandleClickPurchase: jest.fn(), 
    toast: true, 
    setToast: jest.fn(), 
    userCoins: 100000
}

describe('ModalDetail Test', () => {
    it('Should render ModalDetail', () => {
        const wrapper = shallow(<ModalDetail {...default_props}/>);

        expect(wrapper.find('Modal').length).toBe(1);
    });

    it('should render when img null', () => {
        const customProps = {
            ...default_props,
            data: {
                ...default_props.data,
                imgUrl: undefined
            }
        }

        const wrapper = shallow(<ModalDetail {...customProps} />);

        expect(wrapper.find('Modal').length).toBe(1);
    });

    it('should render when click button purchase', () => {
        const wrapper = shallow(<ModalDetail {...default_props} />);

        wrapper.find('button').props().onClick();
        expect(default_props.onHandleClickPurchase).toBeDefined();
    });

    it('should render when click button close toast', () => {
        const wrapper = shallow(<ModalDetail {...default_props} />);

        wrapper.find('Toast').props().onClose();
        expect(default_props.setToast).toBeDefined();
    });
})
