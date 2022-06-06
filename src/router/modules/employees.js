import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      name: 'employees',
      path: '',
      component: () => import('@/views/employees'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      name: 'dateil',
      path: 'dateil/:id',
      hidden: true,
      component: () => import('@/views/employees/dateil'),
      meta: { title: '员工详情列表', icon: 'people' }
    }
  ]
}
