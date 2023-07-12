import TabsView from '@/layouts/tabs/TabsView'
//import BlankView from '@/layouts/BlankView'
import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      meta: {
        disableIfLoggedIn: true
      },
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      children: [
        {
          path: 'setting',
          name: '系统管理',
          meta: {
            icon: 'form'
          },
          component: PageView,
          children: [
            {
              path: 'advance',
              name: '用户名单',
              component: () => import('@/pages/form/advance'),
            },
          ]
        },
        {
          path: 'list',
          name: '考勤表',
          meta: {
            icon: 'table'
          },
          component: PageView,
          children: [
            {
              path: 'query',
              name: '查询考勤',
              meta: {
                authority: 'queryForm',
              },
              component: () => import('@/pages/list/QueryList'),
            },
            {
                    path: 'basic',
                    name: '基础设置',
                    component: () => import('@/pages/form/basic'),
              },
               {
              path: 'repair',
              name: '补卡',
              component: () => import('../pages/form/step'),
            }

          ]
        },
        // {
        //   path: 'form',
        //   name: '管理系统',
        //   meta: {
        //     icon: 'form',
        //     page: {
        //       cacheAble: false
        //     }
        //   },
        //   component: PageView,
        //   children: [
        //     {
        //       path: 'basic',
        //       name: '基础设置',
        //       component: () => import('@/pages/form/basic'),
        //     },
        //     {
        //       path: 'step',
        //       name: '用户账号',
        //       component: () => import('@/pages/form/step'),
        //     },
        //     {
        //       path: 'advance',
        //       name: '权限查询',
        //       component: () => import('@/pages/form/advance'),
        //     }
        //   ]
        // },



      ]
    },
  ]
}

export default options
