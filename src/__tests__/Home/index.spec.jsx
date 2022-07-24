import { shallow } from 'enzyme';
import Home from '../../routes/Home';

import { setupServer } from 'msw/node';
import { DefaultRequestBody, rest} from 'msw';

const server = setupServer(
    rest.get<DefaultRequestBody, String>(
        'https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=L1tDqZOTxrJQEW9tGqa1CPIkGJAJVdpx',
        (req, res, ctx) => {
            return res(
                ctx.delay(100),
                ctx.json(['test'])
            )
        }
    )
);

beforeAll(() => server.listen());
beforeAll(() => server.close());
afterEach(() => server.resetHandlers());

describe('Home Test', () => {
      
    it('Should render Home', () => {
        const wrapper = shallow(<Home/>);

        expect(wrapper.find('.delos-home').length).toBe(1);
    });

});