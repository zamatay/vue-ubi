import Main from "../pages/Main";
import {createRouter, createWebHistory} from "vue-router";
import Pages from "../pages/Pages";
import About from "../pages/About";
import Page from "../pages/Page";
import PagesStore from "../pages/PagesStore";
import PagesComposition from "../pages/PagesComposition";

const routes = [
    {
        path: '/',
        component: Main,

    },
    {
        path: '/pages',
        component: Pages,

    },
    {
        path: '/about',
        component: About,

    },
    {
        path: '/page/:id',
        component: Page,

    },
    {
        path: '/store',
        component: PagesStore,

    },
    {
        path: '/composition',
        component: PagesComposition,

    }
]

export default createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL)
})

