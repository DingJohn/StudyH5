import VueRouter from 'vue-router'

export default new VueRouter({
    routes: [
        {
            path: '/foo',
            component: 'Foo'
        },
        {
            path: '/bar',
            component: 'Bar'
        }
    ]
})