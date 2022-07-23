import Home from './Home';
import Article from './Article';
import MyArticle from './MyArticle';

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
  {
    path: "/my-article",
    exact: true,
    component: MyArticle
  },
]

export default routes;