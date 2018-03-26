import Vue from 'vue'
import Router from 'vue-router'
import navConf from '../nav.config.json'
import articleConf from '../article.config.json'

Vue.use(Router)

//组件routes
let routes = []

Object.keys(navConf).forEach((header) => {
    routes = routes.concat(navConf[header])
})

const addComponent = (router) => {
    router.forEach((route) => {
        if (route.items) {
            addComponent(route.items)
            routes = routes.concat(route.items)
        } else {
            if (route.type === 'pages') {
                route.component = r => require.ensure([], () =>
                    r(require(`../pages/${route.name}.vue`)))
                return
            }
            route.component = r => require.ensure([], () =>
                r(require(`../docs/${route.name}.md`)))
        }
    })
}

addComponent(routes)

//文章routes
let articleChildren = [];

Object.keys(articleConf).forEach((header) => {
    articleChildren = articleChildren.concat(articleConf[header])
})

const addArticleComponent = (router) => {
    router.forEach((route) => {
        if (route.items) {
            addArticleComponent(route.items)
            articleChildren = articleChildren.concat(route.items)
        } else {
            // route.component = r => require.ensure([], () =>
            //     r(require(`../article/${route.name}.vue`)))

            route.component = r => require.ensure([], () =>
                r(require(`../article/${route.name}.md`)))

            // route.component = function(r){
            //   require.ensure([], () =>
            //     r(require(`../article/${route.name}.md`))
            //   )
            // }
        }
    })
}

addArticleComponent(articleChildren)

let articleChild = [];

articleChildren.map(child => {
    if(child.items) {
        articleChild = articleChild.concat(child.items)
    }
})

const articleRoutes = {
    path: '/article',
    name: 'article',
    component: resolve => require(['../pages/article.vue'],resolve),
    children: articleChild
}

routes.push(articleRoutes);

export default new Router({
     routes: routes
})
