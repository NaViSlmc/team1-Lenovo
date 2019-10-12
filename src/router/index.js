import Vue from 'vue';
import VueRouter from 'vue-router';

import Logined from '../components/common/Login.vue'

// ---------------------教师端----------------------
import Thome from '../components/Teachers/Home.vue'
import MyMajor from '../components/Teachers/MyMajor.vue' // 我教的专业
import MyTeachCourses from '../components/Teachers/MyTeachCourses.vue' // 我教的课程
import MyExamination from '../components/Teachers/MyExamination.vue' // 考试管理
import MyStudents from '../components/Teachers/MyStudents.vue' // 学员管理
import MyCourse from '../components/Teachers/MyCourse.vue' // 课程管理
import MyContribution from '../components/Teachers/MyContribution.vue' // 我的贡献
import MyData from '../components/Teachers/MyData.vue' // 个人资料
import CreateExamPaper from '../components/Teachers/CreateExamPaper.vue' // 创建试卷
import CreateExam from '../components/Teachers/CreateExam.vue' // 创建考试

// ---------------------学生端----------------------
import Shome from '../components/Students/Home.vue'
import MyMajorStudent from '../components/Students/MyMajorStudent.vue' //我的专业
import MyGrow from '../components/Students/MyGrow.vue'  // 我的成长
import MyJoin from '../components/Students/MyJoin.vue'// 我的参加
import MyExam from '../components/Students/MyExam.vue'// 我的考试
import MyDataStudent from '../components/Students/MyDataStudent.vue'// 个人资料
import MyClass from '../components/Students/MyClass.vue'// 个人资料
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/logined'
  },
  {
    path: '/logined',
    component: Logined
  },
  {
    path: '/teacher', // 教师端主页面
    component: Thome,
    children: [
      {
        path: 'MyMajor', // 我教的专业
        component: MyMajor,
        name: 'MyMajor',
      },
      {
        path: 'MyTeachCourses', // 我教的课程页面
        component: MyTeachCourses,
        name: 'MyTeachCourses',
      },
      {
        path: 'MyExamination', // 考试管理
        component: MyExamination,
        name: 'MyExamination',
      },
      {
        path: 'MyStudents', // 学员管理
        component: MyStudents,
        name: 'MyStudents',
      },
      {
        path: 'MyCourse', // 课程管理
        component: MyCourse,
        name: 'MyCourse',
      },
      {
        path: 'MyContribution', // 我的贡献
        component: MyContribution,
        name: 'MyContribution',
      },
      {
        path: 'MyData', // 个人资料
        component: MyData,
        name: 'MyData',
      },
      {
        path: 'CreateExamPaper', // 创建试卷
        component: CreateExamPaper,
        name: 'CreateExamPaper',
      },
      {
        path: 'CreateExam', // 创建考试
        component: CreateExam,
        name: 'CreateExam',
      },
    ]
  },
  {
    path: '/student', // 学生端主页面
    component: Shome,
    children:[
      {
        // 我的专业
        path: 'MyMajorStudent', //匹配路径
        component: MyMajorStudent,//组件
        name: 'MyMajorStudent',//名字
      },
      {
        // 我的课程
        path: 'MyClass', //匹配路径
        component: MyClass,//组件
        name: 'MyClass',//名字
      },
      {
        // 我的成长
        path: 'MyGrow', 
        component: MyGrow,
        name: 'MyGrow',
      },
      {
        // 我的参加
        path: 'MyJoin', 
        component: MyJoin,
        name: 'MyJoin',
      },
      {
        // 我的考试
        path: 'MyExam', 
        component: MyExam,
        name: 'MyExam',
      },
      {
        // 个人资料
        path: 'MyDataStudent', 
        component: MyDataStudent,
        name: 'MyDataStudent',
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;