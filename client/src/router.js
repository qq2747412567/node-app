import Vue from 'vue';
import Router from 'vue-router';
import Register from "./views/Register";
import Notfind from './views/404'
import Login from "./views/FileList";
import Home from "./views/Home"
import form from "./views/form"

import Index from './views/index';
import FoundList from "./views/FoundList"
import mydeclaration from "./views/mydeclaration"
import InfoShow from "./views/infoShow"
import suggestion from "./views/suggestion";
import Mpresentation from "./views/Mpresentation";
import Epresentation from "./views/Epresentation";

import Tindex from "./views/Tindex";
import Audit from "./views/Audit";
import TInfoShow from "./views/TinfoShow"
import MAudit from "./views/MAudit";
import EAudit from "./views/EAudit";
//import Dialogfound from "./components/DialogFound"

Vue.use(Router)


const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes:[
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component:Index,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/infoshow', name: 'infoshow', component: InfoShow },
        {path: '/FoundList', name: 'FoundList', component:FoundList},
        //{path: '/mydeclaration', name: 'mydeclaration', component:mydeclaration},
        {path: '/suggestion', name: 'suggestion', component:suggestion},
        {path: '/Mpresentation', name: 'Mpresentation', component:Mpresentation},
        {path: '/Epresentation', name: 'Epresentation', component:Epresentation},
        //{path: '/form', name: 'form', component:form},
      ]
    },
    {
      path: '/Tindex',
      name: 'Tindex',
      component:Tindex,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/Tinfoshow', name: 'Tinfoshow', component: TInfoShow },
        {path: '/Audit', name: 'Audit', component:Audit},
        {path: '/MAudit', name: 'MAudit', component:MAudit},
        {path: '/EAudit', name: 'EAudit', component:EAudit},
        //{path: '/Dialogfound', name: 'Dialogfound', component:Dialogfound},

      ]
    },

    {
      path: '/register',
      name: 'register',
      component:Register
    },
    {
      path: '/login',
      name: 'login',
      component:Login
    },

    {
      path: '*',
      name: '/404',
      component:Notfind
    }
    ]
});

//路由守卫

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login" || to.path == "/register") {
    next();
  } else {
    isLogin ? next(): next('/login');
    }
});


export default router
