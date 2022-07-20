import Home from './Home';
import Article from './Article';

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/article",
    exact: true,
    component: Article
  },
]

export default routes;