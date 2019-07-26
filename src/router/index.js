import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV);

Vue.use(Router);

export default new Router({
  base: '/',
  linkActiveClass: 'z-active',
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: _import('Index'),
      redirect: '/zhsz/home',
      children: [
        {
          path: '/zhsz',
          name: 'zhsz',
          component: _import('home/Index'),
          meta: {
            title: '综合素质'
          },
          children: [
            {
              path: '/zhsz/home',
              name: 'Home',
              component: _import('home/Home'),
              meta: {
                title: '首页'
              },
            },
            {
              path: '/zhsz/task',
              name: 'Task',
              component: _import('task/Task'),
              meta: {
                title: '任务'
              },
            },
            {
              path: '/zhsz/pjrecord',
              name: 'pjRecord',
              component: _import('pjRecord/Index'),
              meta: {
                title: '评价记录'
              }
            }
          ]
        },
        {
          path: '/studenthome',
          name: 'StudentHome',
          component: _import('studentHome/StudentHome'),
          meta: {
            title: '学生主页'
          }
        },
        {
          path: '/classdt',
          name: 'classdt',
          component: _import('classDT/ClassDT'),
          meta: {
            title: '班级动态'
          },
        },
        {
          path: '/pjrecord',
          name: 'pjRecord',
          component: _import('pjRecord/Index'),
          meta: {
            title: '评价记录'
          }
        },
        {
          path: '/studentlist',
          name: 'studentlist',
          component: _import('studentList/StudentList'),
          meta: {
            title: '学生列表'
          }
        },
        {
          path: '/pjstudent',
          name: 'pjstudent',
          component: _import('pjStudent/PjStudent'),
          meta: {
            title: '评价学生'
          },
        },
        {
          path: '/pjstudentjlk',
          name: 'pjstudentjlk',
          component: _import('pjStudent/PjStudentjlk'),
          meta: {
            title: '评价学生'
          },
        },
        {
          path: '/pjclass',
          name: 'pjclass',
          component: _import('pjClass/PjClass'),
          meta: {
            title: '评价班级'
          },
        },
        {
          path: '/addstudent',
          name: 'addstudent',
          component: _import('pjClass/AddStudent'),
          meta: {
            title: '添加学生'
          },
        },
      ]
    }
  ]
})
