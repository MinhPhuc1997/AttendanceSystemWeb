// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  // report: {
  //   path: '/report',
  //   component: () => import('@/pages/list/ReportDetail')
  // },
  root: {
    path: '/',
    name: '首页',
    redirect: '/login',
    component: view.tabs
  },
  dashboard: {
    name: 'Dashboard',
    component: view.blank
  },
  workplace: {
    name: '工作台',
    component: () => import('@/pages/dashboard/workplace')
  },
  FPQuery: {
    name: '指纹考勤查询',
    component: () => import('@/pages/list/FPQuery/FPQuery.vue')
  },
  analysis: {
    name: '分析页',
    component: () => import('@/pages/dashboard/analysis')
  },
  EditData: {
    name: '修改数据',
    icon: 'form',
    component: view.page
  },
  repairs: {
    path: 'basic',
    name: '补考勤',
    component: () => import('@/pages/form/basic')
  },
  person: {
    path: 'person',
    name: '同步人员ERP->JieLink',
    component: () => import('@/pages/sync/person/Person.vue')
  },
  personERP: {
    path: 'personERP',
    name: '同步人员JieLink->ERP',
    component: () => import('@/pages/sync/personERP/PersonERP.vue')
  },
  sync: {
    name: '同步数据',
    icon: 'sync',
    component: view.page
  },

  lockMon: {
    path: 'lock-mon',
    name: '月考勤封账维护',
    component: () => import('@/pages/form/step')
  },
  QueryRepair: {
    path: 'QueryRepair',
    name: '补考勤查询',
    component: () => import('@/pages/form/advance')
  },
  AttendanceData: {
    name: '考勤数据',
    icon: 'table',
    component: view.page
  },
  QueryData: {
    path: 'QueryData',
    name: '人脸考勤查询',
    component: () => import('@/pages/list/QueryList')
  },


  repair: {
    path: 'repair',
    name: '搜索列表',
    component: () => import('@/pages/list/advance')
  },
  repairs1: {
    path: 'repairs1',
    name: '补考勤直接上表',
    component: () => import('@/pages/form/QueryList')
  },

  details: {
    name: '详情页',
    icon: 'profile',
    component: view.blank
  },
  basicDetails: {
    path: 'basic',
    name: '基础详情页',
    component: () => import('@/pages/detail/BasicDetail')
  },
  advanceDetails: {
    path: 'advance',
    name: '高级详情页',
    component: () => import('@/pages/detail/AdvancedDetail')
  },
  result: {
    name: '结果页',
    icon: 'check-circle-o',
    component: view.page
  },
  success: {
    name: '成功',
    component: () => import('@/pages/result/Success')
  },
  error: {
    name: '失败',
    component: () => import('@/pages/result/Error')
  },
  exception: {
    name: '异常页',
    icon: 'warning',
    component: view.blank
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },
  components: {
    name: '小组件',
    icon: 'appstore-o',
    component: view.page
  },
  taskCard: {
    name: '任务卡片',
    component: () => import('@/pages/components/TaskCard')
  },
  palette: {
    name: '颜色复选框',
    component: () => import('@/pages/components/Palette')
  }
}
export default routerMap

