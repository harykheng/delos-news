import Home from './Home';
import Article from './Article';
import MyArticle from './MyArticle';
import LuckyDraw from './LuckyDraw';

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
  {
    path: "/lucky-draw",
    exact: true,
    component: LuckyDraw
  },
]

export default routes;