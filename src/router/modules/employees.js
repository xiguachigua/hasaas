import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [{
    name: 'employees',
    path: '',
    component: () => import('@/views/employees'),
    meta: { title: '员工', icon: 'people' }
  }]
}
