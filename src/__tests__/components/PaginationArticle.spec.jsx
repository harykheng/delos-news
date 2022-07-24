import { shallow } from 'enzyme';
import PaginationArticle from '../../components/PaginationArticle';

const default_props = {
    page: 1, 
    onClickPagination : jest.fn()
}

describe('PaginationArticle Test', () => {
    it('Should render PaginationArticle', () => {
        const wrapper = shallow(<PaginationArticle {...default_props}/>);

        expect(wrapper.find('PageItem').length).toBe(3);
    });

    it('should render click pagination', () => {
        const wrapper = shallow(<PaginationArticle {...default_props}/>);

        wrapper.find('PageItem').at(0).props().onClick(default_props.page - 1);
        expect(default_props.onClickPagination).toBeDefined();
    });
})